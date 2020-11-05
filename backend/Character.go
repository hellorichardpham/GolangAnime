package main

//Character struct for anime character results
type Character struct {
	MalID       int          `json:"mal_id"`
	URL         string       `json:"url"`
	ImageURL    string       `json:"image_url"`
	Name        string       `json:"name"`
	Role        string       `json:"role"`
	VoiceActors []VoiceActor `json:"voice_actors"`
}
