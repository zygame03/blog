package service

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"my_web/backend/internal/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserService struct {
	DB *gorm.DB
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{DB: db}
}

type Profile struct {
	models.Model
	Avatar    string `json:"avatar"`
	Name      string `json:"name"`
	Signature string `json:"signature"`
}

func (u *UserService) authenticate(username, password string) (int, error) {
	var user models.User

	fmt.Println(username, password)
	result := u.DB.Where("username = ?", username).First(&user)
	if result.Error != nil {
		log.Println("没有找到用户")
		return 0, result.Error
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
		log.Println("密码不正确")
		return user.ID, errors.New("invalid password")
	}

	return user.ID, nil
}

func (u *UserService) Register(username, password string) (int, error) {
	var user models.User

	result := u.DB.Where("username = ?", username).First(&user)
	if result.Error == nil {
		return 0, errors.New("用户名已存在")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return 0, err
	}

	user = models.User{
		Username: username,
		Password: string(hashedPassword),
	}

	err = user.Create(u.DB)
	if err != nil {
		return 0, result.Error
	}

	return user.ID, nil
}

func (u *UserService) Login(username, password string) (int, error) {
	return u.authenticate(username, password)
}

func (u *UserService) GetUser() (models.User, error) {
	var user models.User

	result := u.DB.First(&user, 1)
	if result.Error != nil {
		return user, result.Error
	}

	return user, nil
}

func (u *UserService) GetProfile() (Profile, error) {
	var profile Profile

	result := u.DB.Model(&models.User{}).
		Select("id, created_at, updated_at, avatar, name, signature").
		First(&profile)
	if result.Error != nil {
		return profile, result.Error
	}

	return profile, nil
}

func (u *UserService) GetSkills() (string, error) {
	var skills string

	result := u.DB.Model(&models.User{}).
		Select("skills").
		First(&skills)
	if result.Error != nil {
		return "", result.Error
	}

	return skills, nil
}

func (u *UserService) GetHobbies() (string, error) {
	var hobbies string

	result := u.DB.Model(&models.User{}).
		Select("hobbies").
		First(&hobbies)
	if result.Error != nil {
		return "", result.Error
	}

	return hobbies, nil
}

func (u *UserService) GetTimeline() (string, error) {
	var timeline sql.NullString

	result := u.DB.Model(&models.User{}).
		Select("timeline").
		First(&timeline)
	if result.Error != nil {
		return "", result.Error
	}

	if !timeline.Valid {
		return "", nil
	}

	return timeline.String, nil
}

func (u *UserService) GetFutureGoals() (string, error) {
	var futureGoals sql.NullString

	result := u.DB.Model(&models.User{}).
		Select("future_goals").
		First(&futureGoals)
	if result.Error != nil {
		return "", result.Error
	}

	if !futureGoals.Valid {
		return "", nil
	}

	return futureGoals.String, nil
}

func (u *UserService) GetIntro() (string, error) {
	var intro sql.NullString

	result := u.DB.Model(&models.User{}).
		Select("Intro").
		First(&intro)
	if result.Error != nil {
		return "", result.Error
	}

	if !intro.Valid {
		return "", nil
	}

	return intro.String, nil
}
