package handler

import (
	"my_web/backend/internal/models"

	"github.com/gin-gonic/gin"
)

type User struct{}

func (*User) GetProfile(c *gin.Context) {
	db := GetDB(c)

	Profile, _ := models.GetProfile(db)

	c.JSON(200, Profile)
}
