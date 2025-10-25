package models

type User struct {
	Model
	Avatar      string `json:"avatar"`
	Name        string `json:"name"`
	Signature   string `json:"signature"`
	Github      string `json:"github"`
	Bilibili    string `json:"bilibili"`
	Skills      string `json:"skills"`
	Hobbies     string `json:"hobbies"`
	Timeline    string `json:"timeline"`
	FutureGoals string `json:"futureGoals"`
}
