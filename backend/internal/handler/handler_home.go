package handler

import (
	"my_web/backend/internal/models"

	"github.com/gin-gonic/gin"
)

func Home(c *gin.Context) {
	db := GetDB(c)

	author, _ := models.GetProfile(db)
	hotArticles, _ := models.GetArticlesByPopular(db, 10)

	c.JSON(200, gin.H{
		"profile":     author,
		"hotArticles": hotArticles,
	})
}
