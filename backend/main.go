package main

import (
	"my_web/backend/databases"
	"my_web/backend/routers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	databases.ConnectDatabase()

	article := router.Group("api/article")
	{
		article.GET("", routers.GetArticleList)
		article.GET("/hotArticles", routers.GetHotArticles)
		article.GET("/:id", routers.GetArticleDetail)
	}

	profile := router.Group("api/profile")
	{
		profile.GET("", routers.Profile)
	}

	router.Run(":8080")
}
