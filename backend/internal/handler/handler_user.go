package handler

import (
	"my_web/backend/internal/global"
	"my_web/backend/internal/service"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type LoginReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func AdminLogin(c *gin.Context) {
	var req LoginReq
	err := c.ShouldBindJSON(&req)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	db := GetDB(c)
	service := service.NewAdminService(db)
	user, err := service.Authenticate(req.Username, req.Password)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodES256, jwt.MapClaims{
		"username": user.Username,
		"exp":      time.Now().Add(24 * time.Hour).Unix(),
	})
	tokenString, _ := token.SignedString([]byte("your_secret_key"))

	ReturnSuccess(c, tokenString)
}
