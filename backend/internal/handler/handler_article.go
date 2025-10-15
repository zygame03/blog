package handler

import (
	"fmt"
	"my_web/backend/internal/global"
	"my_web/backend/internal/models"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type Article struct{}

type ArticleReq struct {
	ID         int       `json:"id"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	Title      string    `json:"title"`               // 标题
	Desc       string    `json:"desc" gorm:"text"`    // 描述
	Content    string    `json:"content" gorm:"text"` // 正文
	AuthorName string    `json:"authorName"`          // 作者
	Views      uint      `json:"views"`               // 浏览数
	Tags       string    `json:"tags"`                // 标签（逗号分隔形式）
	Cover      string    `json:"cover"`               // 封面
	Status     uint      `json:"status"`              // 状态
}

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

func (*Article) SaveOrUpdateArticle(c *gin.Context) {
	db := GetDB(c)
	var data ArticleReq

	err := c.ShouldBindJSON(data)
	if err != nil {
		ReturnResponse(c, global.FailResult, err)
	}

	article := models.Article{
		Model:      models.Model{ID: data.ID},
		Title:      data.Title,
		Desc:       data.Desc,
		Content:    data.Content,
		AuthorName: data.AuthorName,
		Views:      data.Views,
		Tags:       data.Tags,
		Cover:      data.Cover,
		Status:     data.Status,
	}

	err = models.SaveOrUpdateArticle(db, &article)
	if err != nil {
		ReturnResponse(c, global.FailResult, err)
		return
	}

	ReturnSuccess(c, article)
}

func (*Article) DeleteArticle(c *gin.Context) {
	id, _ := strconv.Atoi(c.DefaultQuery("id", "0"))

	fmt.Println(id, "111")
	db := GetDB(c)

	err := models.DeleteArticle(db, id)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, nil)
}
