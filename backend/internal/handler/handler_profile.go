package handler

import (
	"my_web/backend/internal/global"
	"my_web/backend/internal/models"

	"github.com/gin-gonic/gin"
)

type User struct{}

func (*User) GetUser(c *gin.Context) {
	db := GetDB(c)

	data, err := models.GetUser(db)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}

func (*User) GetProfile(c *gin.Context) {
	db := GetDB(c)

	data, err := models.GetProfile(db)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}

func (*User) GetSkills(c *gin.Context) {
	db := GetDB(c)

	data, err := models.GetSkills(db)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}

func (*User) GetHobbies(c *gin.Context) {
	db := GetDB(c)

	data, err := models.GetHobbies(db)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}
