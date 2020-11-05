package main

import (
	"encoding/json"
	"fmt"
)

//Person struct for Person results
type Person struct {
	MalID           int    `json:"mal_id"`
	URL             string `json:"url"`
	Name            string `json:"name"`
	ImageURL        string `json:"image_url"`
	Language        string `json:"language"`
	MemberFavorites int    `json:"member_favorites"`
}

func getPerson(body []byte) (*Person, error) {
	var s = new(Person)
	err := json.Unmarshal(body, &s)
	if err != nil {
		fmt.Println("whoops:", err)
	}
	return s, err
}
