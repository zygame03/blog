package service

import (
	"errors"
	"my_web/backend/internal/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AdminService struct {
	DB *gorm.DB
}

func NewAdminService(db *gorm.DB) *AdminService {
	return &AdminService{DB: db}
}

func (s *AdminService) Authenticate(username, password string) (models.AdminUser, error) {
	var user models.AdminUser
	result := s.DB.Where("username = ?", username).First(&user)
	if result.Error != nil {
		return models.AdminUser{}, result.Error
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
		return user, errors.New("invalid password")
	}

	return user, nil
}
