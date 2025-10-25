package handler

import (
	"my_web/backend/internal/global"
	"my_web/backend/internal/service"

	"github.com/gin-gonic/gin"
)

type User struct{}

func (*User) GetUser(c *gin.Context) {
	db := GetDB(c)
	s := service.NewUserService(db)

	data, err := s.GetUser()
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}

func (*User) GetProfile(c *gin.Context) {
	db := GetDB(c)
	s := service.NewUserService(db)

	data, err := s.GetProfile()
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}

func (*User) GetIntro(c *gin.Context) {

}

func (*User) GetSkills(c *gin.Context) {
	db := GetDB(c)
	s := service.NewUserService(db)

	data, err := s.GetSkills()
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}

func (*User) GetHobbies(c *gin.Context) {
	db := GetDB(c)
	s := service.NewUserService(db)

	data, err := s.GetHobbies()
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}

func (*User) GetTimeline(c *gin.Context) {
	db := GetDB(c)
	s := service.NewUserService(db)

	data, err := s.GetTimeline()
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}

func (*User) GetFutureGoals(c *gin.Context) {
	db := GetDB(c)
	s := service.NewUserService(db)

	data, err := s.GetFutureGoals()
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}
