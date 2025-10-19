package handler

import (
	"my_web/backend/internal/global"
	"my_web/backend/internal/models"
	"my_web/backend/internal/service"
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
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	size, _ := strconv.Atoi(c.DefaultQuery("pageSize", "10"))

	db := GetDB(c)
	service := service.NewArticleService(db)
	data, total, err := service.GetArticlesByPage(page, size)
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
	service := service.NewArticleService(db)

	data, err := service.GetArticlesByPopular(10)
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
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	db := GetDB(c)
	service := service.NewArticleService(db)
	data, err := service.GetArticleByID(id)
	if err != nil {
		ReturnResponse(c, global.ErrDBOp, err)
		return
	}

	ReturnSuccess(c, data)
}
