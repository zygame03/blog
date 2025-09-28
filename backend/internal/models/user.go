package models

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"

	"gorm.io/gorm"
)

type Links struct {
	Github   string `json:"github"`
	Bilibili string `json:"bilibili"`
}

func (l Links) Value() (driver.Value, error) {
	return json.Marshal(l)
}

func (l *Links) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("Links: Scan source is not []byte")
	}
	return json.Unmarshal(bytes, l)
}

type Profile struct {
	ID        uint   `gorm:"primaryKey"`
	Avatar    string `json:"avatar"`
	Name      string `json:"name"`
	Signature string `json:"signature"`
	Links     Links  `json:"links" gorm:"type:json"`
	Notice    string `json:"notice"`
}

func GetProfile(db *gorm.DB) (Profile, error) {
	var profile Profile
	db.Find(&profile)
	return profile, nil
}
