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

	result := db.Model(Article{}).Count(&total)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	result = db.Offset((page - 1) * pageSize).Limit(pageSize).Find(&articles)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	return articles, total, nil
}

// 获取热门文章，目前只基于view数，后续增加其他项综合判断
func GetArticlesByPopular(db *gorm.DB, limit int) ([]ArticleVO, error) {
	db = db.Model(Article{})
	var articles []ArticleVO

	result := db.Order("views DESC").
		Select("id, created_at, updated_at, title, author_name, views, tags, cover").
		Limit(10).
		Find(&articles)

	if result.Error != nil {
		return nil, result.Error
	}

	return articles, nil
}

// 通过ID获取文章，获取后增加views
func GetArticleByID(db *gorm.DB, ID int) (Article, error) {
	var article Article

	result := db.First(&article, ID)
	if result.Error != nil {
		return article, result.Error
	}

	result = db.Model(&article).
		UpdateColumn("views", gorm.Expr("views + ?", 1))
	if result.Error != nil {
		return article, result.Error
	}

	return article, nil
}

// 按时间排序获取前n篇文章
func GetArticlesByTime(db *gorm.DB, limit int) ([]Article, int64, error) {
	var total int64
	var articles []Article

	db.Model(&Article{}).Count(&total)
	db.Order("created_at").Limit(limit).Find(&articles)

	return articles, total, nil
}

// Todo！
func GetArticlesByTag(db *gorm.DB, limit int) ([]Article, error) {
	return nil, nil
}
