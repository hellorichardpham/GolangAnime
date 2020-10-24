package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"

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

func getAnimeSearch(body []byte) (*AnimeSearch, error) {
	var s = new(AnimeSearch)
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

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the homepage!")
	fmt.Println("Endpoint Hit: homepage")
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

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/search", returnAnimeSearch)
	myRouter.HandleFunc("/anime/{id}", returnSingleAnime)

	log.Fatal(http.ListenAndServe(":10000", myRouter))
}

func main() {
	fmt.Println("Rest API v2.0 - Mux Routers")
	handleRequests()
}
