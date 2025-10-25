package service

import (
	"database/sql"
	"my_web/backend/internal/models"

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

func (s *UserService) GetHobbies() (string, error) {
	var hobbies string

	result := s.DB.Model(&models.User{}).
		Select("hobbies").
		First(&hobbies)
	if result.Error != nil {
		return "", result.Error
	}

	return hobbies, nil
}

func (s *UserService) GetTimeline() (string, error) {
	var timeline sql.NullString

	result := s.DB.Model(&models.User{}).
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

func (s *UserService) GetFutureGoals() (string, error) {
	var futureGoals sql.NullString

	result := s.DB.Model(&models.User{}).
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
