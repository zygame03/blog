package handler

import (
	"my_web/backend/internal/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Article struct{}

func (*Article) GetArticleList(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "10"))

	db := GetDB(c)
	articles, total, _ := models.GetArticles(db, page, pageSize)

	c.JSON(200, gin.H{
		"data":     articles,
		"total":    total,
		"page":     page,
		"pageSize": pageSize,
	})
}

func (*Article) GetHotArticles(c *gin.Context) {
	db := GetDB(c)

	articles, _ := models.GetArticlesByPopular(db, 10)

	c.JSON(200, articles)
}

func (*Article) GetArticleTimeLine(c *gin.Context) {
	db := GetDB(c)

	articles, _, _ := models.GetArticlesByTime(db)

	c.JSON(200, articles)
}

func (*Article) GetArticleDetail(c *gin.Context) {
	db := GetDB(c)
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(404, nil)
		return
	}

	article, _ := models.GetArticleByID(db, id)

	c.JSON(200, article)
}
