package main

//VoiceActor struct for Voice Actor results
type VoiceActor struct {
	MalID    int    `json:"mal_id"`
	URL      string `json:"url"`
	Name     string `json:"name"`
	ImageURL string `json:"image_url"`
	Language string `json:"language"`
}
