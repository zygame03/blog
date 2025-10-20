package service

import (
	"errors"
	"fmt"
	"log"
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

	fmt.Println(username, password)
	result := s.DB.Where("username = ?", username).First(&user)
	if result.Error != nil {
		log.Println("没有找到用户")
		return models.AdminUser{}, result.Error
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
		log.Println("密码不正确")
		return user, errors.New("invalid password")
	}

	return user, nil
}
