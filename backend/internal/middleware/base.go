package middleware

import (
	"my_web/backend/config"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func WithGormDB(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Set(config.DATABASE, db)
		ctx.Next()
	}
}
