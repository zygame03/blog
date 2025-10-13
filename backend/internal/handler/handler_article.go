package handler

import (
	"my_web/backend/internal/global"
	"my_web/backend/internal/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Article struct{}

func (*Article) GetArticles(c *gin.Context) {
	db := GetDB(c)

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	size, _ := strconv.Atoi(c.DefaultQuery("pageSize", "10"))

	data, total, err := models.GetArticlesByPage(db, page, size)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, PageResult[models.Article]{
		Page:  page,
		Size:  size,
		Total: int(total),
		Data:  data,
	})
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
