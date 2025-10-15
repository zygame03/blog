package models

import (
	"gorm.io/gorm"
)

const (
	Public = iota
	Private
	Protect
)

type Article struct {
	Model
	Title      string `json:"title"`               // 标题
	Desc       string `json:"desc" gorm:"text"`    // 描述
	Content    string `json:"content" gorm:"text"` // 正文
	AuthorName string `json:"authorName"`          // 作者
	Views      uint   `json:"views"`               // 浏览数
	Tags       string `json:"tags"`                // 标签（逗号分隔形式）
	Cover      string `json:"cover"`               // 封面
	Status     uint   `json:"status"`              // 状态
	IsDelete   bool   `json:"is_delete"`
}

type ArticleVO struct {
	Model
	Title      string `json:"title"`
	AuthorName string `json:"authorName"` // 作者
	Views      uint   `json:"views"`      // 浏览数
	Tags       string `json:"tags"`       // 标签（逗号分隔形式）
	Cover      string `json:"cover"`      // 封面
}

// 获取所有文章
func GetArticlesList(db *gorm.DB) ([]Article, int64, error) {
	db = db.Model(Article{})
	var articles []Article
	var total int64

	result := db.Count(&total)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	result = db.Find(&articles)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	return articles, total, nil
}

// 分页查找
func GetArticlesByPage(db *gorm.DB, page, pageSize int) ([]Article, int64, error) {
	var articles []Article
	var total int64

	result := db.Model(Article{}).
		Where("is_delete = false AND status = 0").
		Count(&total)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	result = db.Offset((page - 1) * pageSize).
		Limit(pageSize).
		Find(&articles)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	return articles, total, nil
}

// 获取热门文章，目前只基于view数，后续增加其他项综合判断
func GetArticlesByPopular(db *gorm.DB, limit int) ([]ArticleVO, error) {
	db = db.Model(&Article{})
	var articles []ArticleVO

	result := db.Where("is_delete = false AND status = 0").
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
func GetArticleByID(db *gorm.DB, id int) (Article, error) {
	var article Article

	result := db.First(&article, id)
	if result.Error != nil {
		return article, result.Error
	}

	// todo 增加对已删除或已隐藏文章的判断

	result = db.Model(&Article{}).
		Where("id = ?", id).
		UpdateColumn("views", gorm.Expr("views + ?", 1))
	if result.Error != nil {
		return article, result.Error
	}

	return article, nil
}

// Todo 按tags找文章
func GetArticlesByTag(db *gorm.DB, limit int) ([]Article, error) {
	return nil, nil
}

// 保存或更新文章
func SaveOrUpdateArticle(db *gorm.DB, article *Article) error {
	var result *gorm.DB

	if article.ID == 0 {
		result = db.Create(&article)
	} else {
		result = db.Model(&Article{}).
			Where("id = ?", article.ID).
			Updates(article)
	}
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func DeleteArticle(db *gorm.DB, id int) error {
	result := db.Model(&Article{}).
		Where("id = ? AND is_delete = false", id).
		UpdateColumn("is_delete", true)
	if result.Error != nil {
		return result.Error
	}

	return nil
}
