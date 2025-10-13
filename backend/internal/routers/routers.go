package routers

import (
	"my_web/backend/internal/handler"

	"github.com/gin-gonic/gin"
)

var (
	articleAPI handler.Article
	userAPI    handler.User
)

func RegisterHandlers(r *gin.Engine) {
	registerArticleHandler(r)
	registerUserHandler(r)
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
		use.GET("/:id", userAPI.GetUser)
		use.GET("/profile", userAPI.GetProfile)
		use.GET("/hobbies", userAPI.GetHobbies)
		use.GET("/skills", userAPI.GetSkills)
	}
}
