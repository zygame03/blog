package routers

import (
	"strconv"

	"my_web/backend/databases"
	"my_web/backend/models"

	"github.com/gin-gonic/gin"
)

func GetArticleList(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "10"))

	db := databases.DB
	articles, total, _ := models.GetArticles(db, page, pageSize)

	c.JSON(200, gin.H{
		"data":     articles,
		"total":    total,
		"page":     page,
		"pageSize": pageSize,
	})
}

func GetHotArticles(c *gin.Context) {
	db := databases.DB

	articles, _ := models.GetArticlesByPopular(db, 10)

	c.JSON(200, articles)
}

func GetArticleTimeLine(c *gin.Context) {
	db := databases.DB

	articles, _, _ := models.GetArticlesByTime(db)

	c.JSON(200, articles)
}

func GetArticleDetail(c *gin.Context) {
	db := databases.DB
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(404, nil)
		return
	}

	article, _ := models.GetArticleByID(db, id)

	c.JSON(200, article)
}
