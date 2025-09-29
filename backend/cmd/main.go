package main

import (
	"log"
	"my_web/backend/internal/global"
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

	conf, err := global.ReadConfig(global.CONFIG_PATH)
	if err != nil {
		log.Fatalf("加载配置失败: %v", err)
	}

	db := global.InitDatabase(&conf.Database)

	r.Use(middleware.WithGormDB(db))

	routers.RegisterHandlers(r)

	r.Run(":8080")
}
