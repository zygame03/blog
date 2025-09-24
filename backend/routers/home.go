package routers

import (
	"my_web/backend/databases"
	"my_web/backend/models"

	"github.com/gin-gonic/gin"
)

func Home(c *gin.Context) {
	db := databases.DB

	author, _ := models.GetProfile(db)
	hotArticles, _ := models.GetArticlesByPopular(db, 10)

	c.JSON(200, gin.H{
		"profile":     author,
		"hotArticles": hotArticles,
	})
}
