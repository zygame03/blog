# 一个简易个人博客系统

## 项目简介

一个功能完整的个人博客系统，采用现代化的技术栈。

## 技术栈

### 前端
- **框架**: React
- **构建工具**: Vite
- **UI 组件库**: Ant Design

### 后端
- **语言**: Go 
- **Web 框架**: Gin
- **ORM**: GORM
- **数据库**: PostgreSQL
- **其他**: JWT

### 开发工具
- **包管理**: npm / go mod
- **版本控制**: Git

## 项目结构

```
myBlog/
├── frontend/                # 前端
│   ├── src/
│   │   ├── components/      # 公共组件
│   │   ├── pages/           # 页面组件
│   │   ├── hooks/           # 自定义 Hooks
│   │   ├── services/        # API 服务
│   │   ├── contexts/        # Context
│   │   └── style/           # 样式
│   ├── package.json
│   └── vite.config.js
├── backend/                 # 后端
│   ├── cmd/                 # 入口
│   ├── internal/            # 内部包
│   │   ├── handler/         # 处理器
│   │   ├── service/         # 业务逻辑
│   │   ├── models/          # 数据模型
│   │   ├── middleware/      # 中间件
│   │   └── routers/         # 路由
│   ├── go.mod
│   └── config.json
└── README.md
```

## 🛠️ 快速开始

### 环境要求

- Node.js 16+
- Go 1.21+
- PostgreSQL 12+

### 安装依赖

#### 前端
```bash
cd frontend
npm install
```

#### 后端
```bash
cd backend
go mod tidy
```

### 配置数据库

1. 创建 PostgreSQL 数据库
2. 修改 `backend/config.json` 中的数据库配置

### 运行项目

**启动后端服务**
```bash
cd backend
go run cmd/main.go
```

**启动前端服务**
```bash
cd frontend
npm run dev
```

访问 http://localhost:5173 

## 进度

| 模块 | 进度 | 状态 |
|------|------|------|
| 主页 | 80% | 进行中 |
| 文章 | 70% | 进行中 |
| 关于 | 60% | 进行中 |
| 链接 | 0% | 未开始 |
| 分类 | 0% | 未开始 |

## Todo列表

### 前台
- [x] 文章展示
- [x] 文章详情
- [ ] 评论
- [ ] 标签分类
- [ ] 国际化

### 后台
- [x] 文章管理
- [ ] 文件上传
- [ ] 网站可视化配置
- [ ] 网站主题自定义

## 部署

> 未开始

## 链接

- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [Gin](https://gin-gonic.com/)
- [GORM](https://gorm.io/)
