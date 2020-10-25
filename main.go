package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"

	"github.com/gorilla/mux"
)

type AnimeSearchResult struct {
	MalId    int    `json:"mal_id"`
	Url      string `json:"url"`
	ImageUrl string `json:"image_url"`
	Title    string `json:"title"`
}

type AnimeSearch struct {
	Results []AnimeSearchResult `json:"results"`
}

type Anime struct {
	MalId        int     `json:"mal_id"`
	Url          string  `json:"url"`
	ImageUrl     string  `json:"image_url"`
	Title        string  `json:"title"`
	TitleEnglish string  `json:"title_english"`
	Score        float64 `json:"score"`
	ScoredBy     int     `json:"scored_by"`
	Rank         int     `json:"rank"`
	Popularity   int     `json:"popularity"`
}

type CharacterSearch struct {
	Characters []Character `json:"characters"`
}

type Character struct {
	MalID       int          `json:"mal_id"`
	URL         string       `json:"url"`
	ImageURL    string       `json:"image_url"`
	Name        string       `json:"name"`
	Role        string       `json:"role"`
	VoiceActors []VoiceActor `json:"voice_actors"`

	// VoiceActors []VoiceActor `json:"voice_actors"`
}

type VoiceActor struct {
	MalID    int    `json:"mal_id"`
	URL      string `json:"url"`
	Name     string `json:"name"`
	ImageURL string `json:"image_url"`
	Language string `json:"language"`
}

func getAnimeSearch(body []byte) (*AnimeSearch, error) {
	var s = new(AnimeSearch)
	err := json.Unmarshal(body, &s)
	if err != nil {
		fmt.Println("whoops:", err)
	}
	return s, err
}

func getCharacterSearch(body []byte) (*CharacterSearch, error) {
	var s = new(CharacterSearch)
	err := json.Unmarshal(body, &s)
	if err != nil {
		fmt.Println("whoops:", err)
	}
	return s, err
}

func getAnime(body []byte) (*Anime, error) {
	var s = new(Anime)
	err := json.Unmarshal(body, &s)
	if err != nil {
		fmt.Println("whoops:", err)
	}
	return s, err
}

func returnAnimeSearch(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: returnAnimeSearch")
	title := r.URL.Query().Get("title")
	limit := r.URL.Query().Get("limit")
	apiSearchURL := "https://api.jikan.moe/v3/search/anime?limit=" + limit + "&"
	params := url.Values{}
	params.Add("q", title)
	output := params.Encode()
	fmt.Println("url request: " + apiSearchURL + output)
	resp, err := http.Get(apiSearchURL + output)

	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err.Error())
	}

	animeSearch, err := getAnimeSearch([]byte(body))
	if err != nil {
		panic(err.Error())
	}
	fmt.Println(animeSearch.Results[0].MalId)
	fmt.Println("body: ", string(body))
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(animeSearch)
}

func returnSingleAnime(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	malID := vars["id"]

	apiAnimeURL := "https://api.jikan.moe/v3/anime/" + malID
	fmt.Println("apiAnimeURL: " + apiAnimeURL)
	resp, err := http.Get(apiAnimeURL)

	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("Response status: ", resp.Status)

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err.Error())
	}

	animeSingle, err := getAnime([]byte(body))
	if err != nil {
		panic(err.Error())
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(animeSingle)
}

func returnMainCharacters(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	malID := vars["id"]

	apiCharacterStaffURL := "https://api.jikan.moe/v3/anime/" + malID + "/characters_staff"
	fmt.Println("apiCharacterStaffURL: " + apiCharacterStaffURL)
	resp, err := http.Get(apiCharacterStaffURL)

	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("Response status: ", resp.Status)

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err.Error())
	}

	characterSearch, err := getCharacterSearch([]byte(body))
	if err != nil {
		panic(err.Error())
	}

	var tempCharacters []Character
	for _, c := range characterSearch.Characters {
		if c.Role == "Main" {
			var tempCharacter = new(Character)
			tempCharacter.MalID = c.MalID
			tempCharacter.URL = c.URL
			tempCharacter.ImageURL = c.ImageURL
			tempCharacter.Name = c.Name
			tempCharacter.Role = c.Role
			tempCharacter.VoiceActors = c.VoiceActors
			for i := range tempCharacter.VoiceActors {
				// tempCharacter.VoiceActors[i].ImageURL = "HELLO"
				// fmt.Println("Before: " + va.ImageURL)
				tempCharacter.VoiceActors[i].ImageURL = strings.Replace(tempCharacter.VoiceActors[i].ImageURL, "r/42x62/", "", -1)
				// fmt.Println("After: " + va.ImageURL)
			}
			tempCharacters = append(tempCharacters, *tempCharacter)
		}
	}

	fmt.Println("tempCharacters ", tempCharacters)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(tempCharacters)
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/search", returnAnimeSearch)
	myRouter.HandleFunc("/anime/{id}", returnSingleAnime)
	myRouter.HandleFunc("/anime/{id}/mainCharacters", returnMainCharacters)

	log.Fatal(http.ListenAndServe(":10000", myRouter))
}

func main() {
	fmt.Println("Rest API v2.0 - Mux Routers")
	handleRequests()
}
