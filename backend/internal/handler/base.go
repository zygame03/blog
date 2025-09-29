package handler

import (
	"my_web/backend/internal/global"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetDB(c *gin.Context) *gorm.DB {
	return c.MustGet(global.DATABASE).(*gorm.DB)
}
