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
	Title      string `json:"title"`
	Desc       string `json:"desc" gorm:"text"`
	Content    string `json:"content" gorm:"text"`
	AuthorName string `json:"authorName"`
	Views      uint   `json:"views"`
	Tags       string `json:"tags"`
	Cover      string `json:"cover"`
	Status     uint   `json:"status"`
}

// 获取所有文章
func GetArticlesList(db *gorm.DB) ([]Article, int64, error) {
	var articles []Article
	var total int64

	result := db.Model(&Article{}).Count(&total)
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

	result := db.Model(&Article{}).Count(&total)
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
func GetArticlesByPopular(db *gorm.DB, limit int) ([]Article, error) {
	var articles []Article
	var err error

	if limit == 0 {
		err = db.Order("views DESC").Find(&articles).Error
	} else {
		err = db.Order("views DESC").Limit(limit).Find(&articles).Error
	}

	if err != nil {
		return nil, err
	}

	return articles, nil
}

// 通过ID获取文章，获取后增加views
func GetArticleByID(db *gorm.DB, ID int) (Article, error) {
	var article Article

	err := db.Where("id = ?", ID).First(&article).Error
	if err != nil {
		return article, err
	}

	// 访问文章时增加浏览数
	err = db.Model(&article).
		Where("id = ?", ID).
		UpdateColumn("views", gorm.Expr("views + ?", 1)).
		Error
	if err != nil {
		return article, err
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
