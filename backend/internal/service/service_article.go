package service

import (
	"my_web/backend/internal/models"
	"time"

	"gorm.io/gorm"
)

type ArticleService struct {
	DB *gorm.DB
}

func NewArticleService(db *gorm.DB) *ArticleService {
	return &ArticleService{DB: db}
}

type ArticleVO struct {
	ID         int       `json:"id"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
	Title      string    `json:"title"`
	AuthorName string    `json:"authorName"` // 作者
	Views      uint      `json:"views"`      // 浏览数
	Tags       string    `json:"tags"`       // 标签（逗号分隔形式）
	Cover      string    `json:"cover"`      // 封面
}

// 分页查找
func (s *ArticleService) GetArticlesByPage(page, pageSize int) ([]models.Article, int64, error) {
	var articles []models.Article
	var total int64

	result := s.DB.Model(models.Article{}).
		Where("is_delete = false AND status = 0").
		Count(&total)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	result = s.DB.Offset((page - 1) * pageSize).
		Limit(pageSize).
		Find(&articles)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	return articles, total, nil
}

// 获取热门文章，目前只基于view数，后续增加其他项综合判断
func (s *ArticleService) GetArticlesByPopular(limit int) ([]ArticleVO, error) {
	var articles []ArticleVO

	result := s.DB.Model(&models.Article{}).
		Where("is_delete = false AND status = 0").
		Order("views DESC").
		Select("id, created_at, updated_at, title, author_name, views, tags, cover").
		Limit(10).
		Find(&articles)
	if result.Error != nil {
		return nil, result.Error
	}

	return articles, nil
}

// 通过ID获取文章，获取后增加views
func (s *ArticleService) GetArticleByID(id int) (models.Article, error) {
	var article models.Article

	result := s.DB.First(&article, id)
	if result.Error != nil {
		return article, result.Error
	}

	// todo 增加对已删除或已隐藏文章的判断

	result = s.DB.Model(&models.Article{}).
		Where("id = ?", id).
		UpdateColumn("views", gorm.Expr("views + ?", 1))
	if result.Error != nil {
		return article, result.Error
	}

	return article, nil
}

// Todo 按tags找文章
func (s *ArticleService) GetArticlesByTag(limit int) ([]models.Article, error) {
	return nil, nil
}
