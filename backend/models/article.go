package models

import (
	"time"

	"gorm.io/gorm"
)

const (
	Public = iota
	Private
	Protect
)

type Article struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	Title      string    `json:"title"`
	Desc       string    `json:"desc" gorm:"text"`
	Content    string    `json:"content" gorm:"text"`
	AuthorName string    `json:"authorName"`
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`
	Views      uint      `json:"views"`
	// Tags       []string  `json:"tags" gorm:"type:json"`
	Cover  string `json:"cover"`
	Status uint   `json:"status"`
}

func GetArticles(db *gorm.DB, page, pageSize int) ([]Article, int64, error) {
	var articles []Article
	var total int64

	db.Model(&Article{}).Count(&total)
	db.Offset((page - 1) * pageSize).Limit(pageSize).Find(&articles)

	return articles, total, nil
}

func GetArticlesByPopular(db *gorm.DB, number int) ([]Article, error) {
	var articles []Article
	db.Order("views").Limit(number).Find(&articles)
	return articles, nil
}

func GetArticleByID(db *gorm.DB, ID int) (Article, error) {
	var article Article
	db.Where("id = ?", ID).First(&article)
	return article, nil
}

func GetArticlesByTime(db *gorm.DB) ([]Article, int64, error) {
	var total int64
	var articles []Article

	db.Model(&Article{}).Count(&total)
	db.Order("created_at").Find(&articles)

	return articles, total, nil
}
