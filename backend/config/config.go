package config

import (
	"my_web/backend/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ReadConf() {

}

func ConnectDatabase() *gorm.DB {
	dsn := "host=localhost user=postgres password=Zy20031121. dbname=myBlog port=5432 sslmode=disable"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}
	database.AutoMigrate(
		&models.Article{},
		&models.Profile{},
	) // 自动迁移，创建表
	return database
}
