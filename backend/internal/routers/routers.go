package routers

import (
	"my_web/backend/internal/handler"
	"my_web/backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

var (
	articleAPI      handler.Article
	adminArticleAPI handler.AdminArticle
	userAPI         handler.User
)

func RegisterHandlers(r *gin.Engine) {
	registerArticleHandler(r)
	registerUserHandler(r)
	registerAdminHandler(r)
}

func registerArticleHandler(r *gin.Engine) {
	article := r.Group("api/article")
	{
		article.GET("", articleAPI.GetArticles)
		article.GET("/hotArticles", articleAPI.GetHotArticles)
		article.GET("/:id", articleAPI.GetArticleDetail)
		// article.POST("/save", articleAPI.SaveOrUpdateArticle)
		// article.GET("/delete", articleAPI.DeleteArticle)
	}
}

func registerUserHandler(r *gin.Engine) {
	use := r.Group("api/user")
	{
		use.GET("/:id", userAPI.GetUser)
		use.GET("/profile", userAPI.GetProfile)
		use.GET("/hobbies", userAPI.GetHobbies)
		use.GET("/skills", userAPI.GetSkills)
	}
}

func registerAdminHandler(r *gin.Engine) {
	admin := r.Group("/api/admin")
	{
		admin.POST("/login")

		admin.Use(middleware.JWTAuth())
		admin.GET("/articles", adminArticleAPI.AdminGetArticle)
		admin.POST("/articles/save", adminArticleAPI.AdminSaveOrUpdateArticle)
		admin.DELETE("/articles/delete/:id", adminArticleAPI.AdminDeleteArticle)
	}
}
