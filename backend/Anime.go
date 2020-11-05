package main

import (
	"encoding/json"
	"fmt"
)

//Anime struct for anime results
type Anime struct {
	MalID        int     `json:"mal_id"`
	URL          string  `json:"url"`
	ImageURL     string  `json:"image_url"`
	Title        string  `json:"title"`
	TitleEnglish string  `json:"title_english"`
	Score        float64 `json:"score"`
	ScoredBy     int     `json:"scored_by"`
	Rank         int     `json:"rank"`
	Popularity   int     `json:"popularity"`
}

func getAnime(body []byte) (*Anime, error) {
	var s = new(Anime)
	err := json.Unmarshal(body, &s)
	if err != nil {
		fmt.Println("whoops:", err)
	}
	return s, err
}
