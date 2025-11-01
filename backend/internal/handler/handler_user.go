package handler

import (
	"my_web/backend/internal/global"
	"my_web/backend/internal/service"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type User struct{}

type LoginReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (*User) Login(c *gin.Context) {
	var req LoginReq
	err := c.ShouldBindJSON(&req)
	if err != nil {
		ReturnResponse(c, global.ErrRequset, err)
		return
	}

	db := GetDB(c)
	s := service.NewUserService(db)
	user, err := s.Login(req.Username, req.Password)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodES256, jwt.MapClaims{
		"id":  user,
		"exp": time.Now().Add(24 * time.Hour).Unix(),
	})
	tokenString, _ := token.SignedString([]byte("your_secret_key"))

	ReturnSuccess(c, tokenString)
}

func (*User) Register(c *gin.Context) {
	var req LoginReq
	err := c.ShouldBindJSON(&req)
	if err != nil {
		ReturnResponse(c, global.ErrRequset, err)
		return
	}

	db := GetDB(c)
	s := service.NewUserService(db)
	user, err := s.Register(req.Username, req.Password)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
	}

	ReturnSuccess(c, user)
}

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
	db := GetDB(c)
	s := service.NewUserService(db)

	data, err := s.GetIntro()
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, data)
		return
	}

	ReturnSuccess(c, data)
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
