package models

type AdminUser struct {
	Model
	Username string `json:"username" gorm:"uniqueIndex"`
	Password string `json:"-"`
}
