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

func returnAnimeSearch(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Query().Get("title")
	limit := r.URL.Query().Get("limit")
	apiSearchURL := "https://api.jikan.moe/v3/search/anime?limit=" + limit + "&"
	params := url.Values{}
	params.Add("q", title)
	output := params.Encode()
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
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(animeSearch)
}

func returnSingleAnime(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	malID := vars["id"]

	apiAnimeURL := "https://api.jikan.moe/v3/anime/" + malID
	resp, err := http.Get(apiAnimeURL)

	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

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
	resp, err := http.Get(apiCharacterStaffURL)

	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

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
				tempCharacter.VoiceActors[i].ImageURL = strings.Replace(tempCharacter.VoiceActors[i].ImageURL, "r/42x62/", "", -1)
			}
			tempCharacters = append(tempCharacters, *tempCharacter)
		}
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(tempCharacters)
}

func returnPerson(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	malID := vars["id"]

	apiPersonURL := "https://api.jikan.moe/v3/person/" + malID
	resp, err := http.Get(apiPersonURL)

	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err.Error())
	}

	person, err := getPerson([]byte(body))
	if err != nil {
		panic(err.Error())
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(person)
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/search", returnAnimeSearch)
	myRouter.HandleFunc("/anime/{id}", returnSingleAnime)
	myRouter.HandleFunc("/anime/{id}/mainCharacters", returnMainCharacters)
	myRouter.HandleFunc("/thisisatest/{id}", returnPerson)

	log.Fatal(http.ListenAndServe(":10000", myRouter))
}

func main() {
	fmt.Println("Starting Seiyuu Starpower Backend Services")
	handleRequests()
}
