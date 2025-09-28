package handler

import (
	"my_web/backend/config"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetDB(c *gin.Context) *gorm.DB {
	return c.MustGet(config.DATABASE).(*gorm.DB)
}
