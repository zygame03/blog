package handler

import (
	"my_web/backend/internal/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Article struct{}

type ArticleTitle struct {
}

func (*Article) GetAllArticles(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "10"))

	db := GetDB(c)
	articles, total, _ := models.GetArticlesList(db)

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

// 获取文章时间线
func (*Article) GetArticleTimeLine(c *gin.Context) {
	db := GetDB(c)

	articles, _, _ := models.GetArticlesByTime(db, 10)

	c.JSON(200, articles)
}

// 获取文章详情（带正文）
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
