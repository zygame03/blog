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
	authAPI         handler.Auth
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
	}
}

func registerUserHandler(r *gin.Engine) {
	use := r.Group("api/user")
	{
		// use.GET("/:id", userAPI.GetUser)
		use.GET("/profile", userAPI.GetProfile)
		use.GET("/hobbies", userAPI.GetHobbies)
		use.GET("/skills", userAPI.GetSkills)
		use.GET("/timeline", userAPI.GetTimeline)
		use.GET("/futureGoals", userAPI.GetFutureGoals)
	}
}

func registerAdminHandler(r *gin.Engine) {
	admin := r.Group("/api/admin")
	{
		admin.POST("/login", authAPI.AdminLogin)

		admin.Use(middleware.JWTAuth())
		admin.GET("/article", adminArticleAPI.AdminGetArticle)
		admin.GET("/article/:id", adminArticleAPI.AdminGetArticle)
		admin.POST("/article", adminArticleAPI.AdminSaveOrUpdateArticle)
		admin.DELETE("/article/:id", adminArticleAPI.AdminDeleteArticle)
	}
}
