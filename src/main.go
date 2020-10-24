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

type Article struct {
	Id      string `json:"Id"`
	Title   string `json:"Title"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
}

var Articles []Article

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the homepage!")
	fmt.Println("Endpoint Hit: homepage")
}

func returnAnimeSearch(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: returnAnimeSearch")
	title := r.URL.Query().Get("title")
	apiSearchUrl := "https://api.jikan.moe/v3/search/anime?limit=10&"
	params := url.Values{}
	params.Add("q", title)
	output := params.Encode()
	fmt.Println("url request: " + apiSearchUrl + output)
	resp, err := http.Get(apiSearchUrl + output)

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
	malId := vars["id"]

	apiAnimeUrl := "https://api.jikan.moe/v3/anime/" + malId
	fmt.Println("apiAnimeUrl: " + apiAnimeUrl)
	resp, err := http.Get(apiAnimeUrl)

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
