package handler

import (
	"my_web/backend/internal/global"
	"my_web/backend/internal/models"
	"my_web/backend/internal/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

type AdminArticle struct{}

func (*AdminArticle) AdminGetArticle(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pagesize, _ := strconv.Atoi(c.DefaultQuery("pagesize", "10"))

	db := GetDB(c)
	service := service.NewAdminArticleService(db)
	data, total, err := service.AdminGetArticlesByPage(page, pagesize)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
	}

	ReturnSuccess(c, PageResult[models.Article]{
		Page:  page,
		Size:  pagesize,
		Data:  data,
		Total: int(total),
	})
}

func (*AdminArticle) AdminSaveOrUpdateArticle(c *gin.Context) {
	var data ArticleReq
	err := c.ShouldBindJSON(&data)
	if err != nil {
		ReturnResponse(c, global.FailResult, err)
	}

	article := models.Article{
		Title:      data.Title,
		Desc:       data.Desc,
		Content:    data.Content,
		AuthorName: data.AuthorName,
		Views:      data.Views,
		Tags:       data.Tags,
		Cover:      data.Cover,
		Status:     data.Status,
	}

	if data.ID > 0 {
		article.ID = data.ID
	}

	db := GetDB(c)
	service := service.NewAdminArticleService(db)

	if data.ID > 0 {
		err = service.AdminSaveOrUpdateArticle(&article)
	} else {
		err = service.AdminSaveOrUpdateArticle(&article)
	}

	if err != nil {
		ReturnResponse(c, global.FailResult, err)
		return
	}

	ReturnSuccess(c, article)
}

func (*AdminArticle) AdminDeleteArticle(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	db := GetDB(c)
	service := service.NewAdminArticleService(db)
	err := service.AdminDeleteArticle(id)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, nil)
}
