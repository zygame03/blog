package handler

import (
	"my_web/backend/internal/global"
	"my_web/backend/internal/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Article struct{}

// 获取文章列表
func (*Article) GetArticles(c *gin.Context) {
	page, err := strconv.Atoi(c.DefaultQuery("page", "1"))
	if err != nil {
		ReturnResponse(c, global.ErrRequset, err)
		return
	}

	size, err := strconv.Atoi(c.DefaultQuery("pageSize", "10"))
	if err != nil {
		ReturnResponse(c, global.ErrRequset, err)
		return
	}

	db := GetDB(c)
	s := service.NewArticleService(db)
	data, total, err := s.GetArticlesByPage(page, size)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, PageResult[service.ArticleVO]{
		Page:  page,
		Size:  size,
		Total: int(total),
		Data:  data,
	})
}

func (*Article) GetHotArticles(c *gin.Context) {
	db := GetDB(c)
	s := service.NewArticleService(db)

	data, err := s.GetArticlesByPopular(10)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}

// 获取文章详情（带正文）
func (*Article) GetArticleDetail(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		ReturnResponse(c, global.ErrRequset, err)
		return
	}

	db := GetDB(c)
	s := service.NewArticleService(db)
	data, err := s.GetArticleByID(id)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}
