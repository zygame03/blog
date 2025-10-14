package models

import (
	"gorm.io/gorm"
)

type User struct {
	Model
	Avatar    string `json:"avatar"`
	Name      string `json:"name"`
	Signature string `json:"signature"`
	Github    string `json:"github"`
	Bilibili  string `json:"bilibili"`
	Skills    string `json:"skills"`
	Hobbies   string `json:"hobbies"`
}

type Profile struct {
	Model
	Avatar    string `json:"avatar"`
	Name      string `json:"name"`
	Signature string `json:"signature"`
}

func GetUser(db *gorm.DB) (User, error) {
	var user User

	result := db.First(&user, 1)
	if result.Error != nil {
		return user, result.Error
	}

	return user, nil
}

func GetProfile(db *gorm.DB) (Profile, error) {
	var profile Profile

	result := db.Model(&User{}).
		Select("id, created_at, updated_at, avatar, name, signature").
		First(&profile)
	if result.Error != nil {
		return profile, result.Error
	}

	return profile, nil
}

func GetSkills(db *gorm.DB) (string, error) {
	var user User

	result := db.Select("skills").
		First(&user)
	if result.Error != nil {
		return "", result.Error
	}

	return user.Skills, nil
}

func GetHobbies(db *gorm.DB) (string, error) {
	var user User

	result := db.Select("hobbies").
		First(&user)
	if result.Error != nil {
		return "", result.Error
	}

	return user.Hobbies, nil
}
