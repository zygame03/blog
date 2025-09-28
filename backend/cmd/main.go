package main

import (
	"my_web/backend/config"
	"my_web/backend/internal/middleware"
	"my_web/backend/internal/routers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	db := config.ConnectDatabase()

	r.Use(middleware.WithGormDB(db))

	routers.RegisterHandlers(r)

	r.Run(":8080")
}
