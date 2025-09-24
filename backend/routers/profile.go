package routers

import (
	"my_web/backend/databases"
	"my_web/backend/models"

	"github.com/gin-gonic/gin"
)

func Profile(c *gin.Context) {
	db := databases.DB

	Profile, _ := models.GetProfile(db)

	c.JSON(200, Profile)
}
