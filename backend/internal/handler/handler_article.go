package handler

import (
	"my_web/backend/internal/global"
	"my_web/backend/internal/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Article struct{}

func (*Article) GetAllArticles(c *gin.Context) {
	db := GetDB(c)

	// page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	// pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "10"))

	data, _, err := models.GetArticlesList(db)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}

func (*Article) GetHotArticles(c *gin.Context) {
	db := GetDB(c)

	data, err := models.GetArticlesByPopular(db, 10)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}

// 获取文章时间线
func (*Article) GetArticleTimeLine(c *gin.Context) {
	db := GetDB(c)

	data, _, _ := models.GetArticlesByTime(db, 10)

	ReturnSuccess(c, data)
}

// 获取文章详情（带正文）
func (*Article) GetArticleDetail(c *gin.Context) {
	db := GetDB(c)

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	data, err := models.GetArticleByID(db, id)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}
