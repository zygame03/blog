package handler

import (
	"my_web/backend/internal/global"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Response[T any] struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    T      `json:"data"`
}

type PageResult[T any] struct {
	Page  int `json:"page"`
	Size  int `json:"size"`
	Total int `json:"total"`
	Data  []T `json:"data"`
}

func ReturnHttpResponse(c *gin.Context, httpcode, code int, msg string, data any) {
	c.JSON(httpcode, Response[any]{
		Code:    code,
		Message: msg,
		Data:    data,
	})
}

func ReturnResponse(c *gin.Context, r global.Result, data any) {
	ReturnHttpResponse(c, http.StatusOK, r.Code(), r.Msg(), data)
}

func ReturnSuccess(c *gin.Context, data any) {
	ReturnResponse(c, global.SuccessResult, data)
}

func GetDB(c *gin.Context) *gorm.DB {
	return c.MustGet(global.DATABASE).(*gorm.DB)
}
