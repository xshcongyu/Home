# 丛鱼的家

一个可以直接部署到 GitHub Pages 的静态个人网站，包含：

- 固定顶部导航与移动端菜单
- 首页与个人简介
- 浏览器端文档转换工具
- AI 写作模式化特征分析
- 可搜索、筛选和切换视图的网页导航
- 三个学期的彩色课表与完整课程信息
- 深色/浅色主题

## 本地查看

网站没有构建步骤。可以直接打开 `index.html`，也可以在项目目录运行任意静态文件服务器。

例如：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000/`。

## 部署到 GitHub Pages

1. 在 GitHub 创建一个新仓库。
2. 将本文件夹中的所有文件上传到仓库根目录。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment** 中选择 **Deploy from a branch**。
5. 选择 `main` 分支和 `/ (root)` 目录并保存。
6. 等待 GitHub 给出公开网址。

网站使用 `#/about`、`#/tools` 等 Hash 路由，因此不需要配置服务器重写规则。

## 修改网站内容

主要内容都保存在：

```text
content/site-data.js
```

其中包括：

- `profile`：个人简介
- `categories`：网页分类
- `bookmarks`：常用网页
- `periods`：上课节次与时间
- `semesters`：学期、课程和上课安排

修改并提交这个文件后，GitHub Pages 会自动更新网站。

## 工具能力边界

### 文档转换

目前支持：

- TXT
- Markdown
- HTML
- JSON
- CSV

所有读取和转换默认在浏览器本地完成。当前版本不提供 Word、Excel、PPT 和 PDF 之间的高保真任意互转。

### AI 写作特征分析

该工具检查句长均匀度、重复表达、连接词密度与模板化表达。结果只是“模式化特征指数”，不能证明文章由 AI 或人类创作。

## 文件结构

```text
.
├── index.html
├── styles.css
├── app.js
├── content/
│   └── site-data.js
├── .nojekyll
└── README.md
```
