package main

import (
	"encoding/json"
	"fmt"
)

//AnimeSearchResult struct for anime search results
type AnimeSearchResult struct {
	Results []struct {
		MalID    int    `json:"mal_id"`
		URL      string `json:"url"`
		ImageURL string `json:"image_url"`
		Title    string `json:"title"`
	} `json:"results"`
}

//CharacterSearch struct for character search results
type CharacterSearch struct {
	Characters []Character `json:"characters"`
}

func getAnimeSearch(body []byte) (*AnimeSearchResult, error) {
	var s = new(AnimeSearchResult)
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
