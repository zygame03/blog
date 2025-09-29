package middleware

import (
	"my_web/backend/internal/global"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func WithGormDB(db *gorm.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Set(global.DATABASE, db)
		ctx.Next()
	}
}
