window.SITE_DATA = {
  profile: {
    name: "丛鱼",
    title: "这里是丛鱼的家",
    intro: "这里收纳我的学习轨迹、常用工具、网页书签与学期课表。它既是一张个人名片，也是一间可以不断整理、慢慢长大的数字房间。",
    tags: ["经济学", "学习整理", "效率工具", "个人知识库"],
    values: [
      { title: "保持好奇", text: "把暂时不懂的问题留下来，逐个查证、理解和归档。" },
      { title: "认真整理", text: "让散落的网页、课程和文档各自回到合适的位置。" },
      { title: "重视来源", text: "保存内容的同时，也记录它来自哪里、何时更新。" },
      { title: "持续迭代", text: "网站不追求一次完成，而是跟着学习与生活一起变化。" }
    ]
  },

  categories: [
    "资源库", "高校", "网站", "官网", "AI", "工具", "学术前沿",
    "代理", "剪辑", "图片视频", "其他", "游戏", "安装", "书签栏"
  ],

  bookmarks: [
    { title: "学丞-晓艳课堂", url: "https://www.ixuecheng.cn/", category: "资源库", description: "课程学习与在线课堂平台。", tag: "课程" },
    { title: "东北财经大学远程访问系统", url: "https://vpn.dufe.edu.cn/", category: "资源库", description: "从校外访问东北财经大学校内资源。", tag: "校园" },
    { title: "GitHub", url: "https://github.com/", category: "资源库", description: "代码、开源项目与技术资料库。", tag: "开发" },
    { title: "Supabase", url: "https://supabase.com/", category: "资源库", description: "数据库、认证、存储与后端开发平台。", tag: "后端" },

    { title: "东北财经大学远程访问系统", url: "https://vpn.dufe.edu.cn/", category: "高校", description: "东北财经大学校外资源访问入口。", tag: "东财" },
    { title: "中国社会科学院大学", url: "https://www.ucass.edu.cn/", category: "高校", description: "中国社会科学院大学官方网站。", tag: "高校" },

    { title: "Workflow Designer", url: "https://taich.tech/#/designer", category: "网站", description: "太初提供的可视化工作流设计页面。", tag: "工作流" },
    { title: "Xuezhen Tao", url: "https://xuezhentao.weebly.com/", category: "网站", description: "Xuezhen Tao 的个人学术主页。", tag: "主页" },
    { title: "数据思维和营销数据分析", url: "https://sufe-mkt-analysis.online/", category: "网站", description: "营销数据分析与数据思维学习网站。", tag: "数据分析" },

    { title: "FFmpeg", url: "https://ffmpeg.org/", category: "官网", description: "开源音视频处理工具与官方文档。", tag: "音视频" },
    { title: "Strawberry Perl for Windows", url: "https://strawberryperl.com/", category: "官网", description: "适用于 Windows 的 Perl 开发环境。", tag: "开发环境" },
    { title: "Getting MiKTeX", url: "https://miktex.org/download", category: "官网", description: "MiKTeX 官方下载与安装入口。", tag: "LaTeX" },
    { title: "鱼C工作室｜Python教学｜编程学习", url: "https://fishc.com.cn/", category: "官网", description: "Python 与编程课程学习社区。", tag: "编程" },
    { title: "Zotero", url: "https://www.zotero.org/", category: "官网", description: "文献收集、管理、引用与协作工具。", tag: "文献" },
    { title: "Local", url: "https://localwp.com/", category: "官网", description: "本地 WordPress 开发与测试工具。", tag: "WordPress" },
    { title: "Node.js", url: "https://nodejs.org/", category: "官网", description: "Node.js JavaScript 运行环境官方网站。", tag: "开发" },

    { title: "OpenAI API", url: "https://platform.openai.com/", category: "AI", description: "OpenAI API 控制台与开发入口。", tag: "API" },
    { title: "Stitch - Design with AI", url: "https://stitch.withgoogle.com/", category: "AI", description: "使用 AI 生成和迭代界面设计。", tag: "设计" },
    { title: "Claude Code overview", url: "https://code.claude.com/docs/en/overview", category: "AI", description: "Claude Code 官方概览与使用文档。", tag: "编程" },
    { title: "DeepSeek 开放平台 API", url: "https://platform.deepseek.com/", category: "AI", description: "DeepSeek API 开放平台与开发控制台。", tag: "API" },
    { title: "Perplexity（信息搜集）", url: "https://www.perplexity.ai/", category: "AI", description: "带有来源引用的 AI 信息检索工具。", tag: "搜索" },
    { title: "DeepSeek - 探索未至之境", url: "https://www.deepseek.com/", category: "AI", description: "DeepSeek 官方网站与产品入口。", tag: "推理" },
    { title: "Google Gemini", url: "https://gemini.google.com/", category: "AI", description: "Google 的多模态人工智能助手。", tag: "多模态" },
    { title: "Claude", url: "https://claude.ai/", category: "AI", description: "Anthropic 提供的通用人工智能助手。", tag: "对话" },
    { title: "ChatGPT", url: "https://chatgpt.com/", category: "AI", description: "OpenAI 提供的通用人工智能助手。", tag: "对话" },

    { title: "Notion for Enterprise", url: "https://www.notion.com/enterprise", category: "工具", description: "面向组织的 Notion 企业协作方案。", tag: "协作" },
    { title: "Smallpdf PDF转JPG", url: "https://smallpdf.com/cn/pdf-to-jpg", category: "工具", description: "将 PDF 页面在线转换为 JPG 图片。", tag: "格式转换" },
    { title: "PDF Guru PDF转JPG", url: "https://pdfguru.com/app/zh/pdf-to-jpg", category: "工具", description: "PDF Guru 提供的 PDF 转 JPG 工具。", tag: "格式转换" },
    { title: "iLovePDF PDF转JPG", url: "https://www.ilovepdf.com/zh-cn/pdf_to_jpg", category: "工具", description: "转换 PDF 页面或提取其中的图片。", tag: "PDF" },
    { title: "Perplexity（信息搜集）", url: "https://www.perplexity.ai/", category: "工具", description: "带有来源引用的 AI 信息检索工具。", tag: "搜索" },
    { title: "Project Graph", url: "https://graphif.dev/", category: "工具", description: "无限画布节点图与知识结构绘制工具。", tag: "图表" },
    { title: "秀米 XIUMI", url: "https://xiumi.us/", category: "工具", description: "图文排版、H5 与新媒体内容制作工具。", tag: "排版" },

    { title: "Summer Institute | NBER", url: "https://www.nber.org/summer-institute", category: "学术前沿", description: "NBER 夏季研究会议、日程与学术资料。", tag: "经济学" },

    { title: "CordCloud - 高速网络服务", url: "https://cordc.xyz/", category: "代理", description: "CordCloud 网络服务入口。", tag: "网络" },

    { title: "AI Vocals and Text To Speech | Uberduck", url: "https://www.uberduck.ai/", category: "剪辑", description: "AI 配音、合成歌声与文本转语音工具。", tag: "配音" },

    { title: "Storyset", url: "https://storyset.com/", category: "图片视频", description: "可定制和下载的插画素材库。", tag: "插画" },
    { title: "unDraw", url: "https://undraw.co/illustrations", category: "图片视频", description: "开源、可换色的 SVG 插画素材。", tag: "插画" },
    { title: "Flaticon", url: "https://www.flaticon.com/", category: "图片视频", description: "图标、贴纸与矢量素材库。", tag: "图标" },
    { title: "iconfont（阿里巴巴矢量图标库）", url: "https://www.iconfont.cn/", category: "图片视频", description: "阿里巴巴矢量图标与项目管理平台。", tag: "图标" },
    { title: "Pixabay", url: "https://pixabay.com/", category: "图片视频", description: "免版税图片、插画、音频与视频素材。", tag: "素材" },
    { title: "Pexels", url: "https://www.pexels.com/", category: "图片视频", description: "免费图片与视频素材库。", tag: "素材" },
    { title: "Unsplash", url: "https://unsplash.com/", category: "图片视频", description: "高质量摄影图片素材网站。", tag: "摄影" },

    { title: "APKMirror", url: "https://www.apkmirror.com/", category: "安装", description: "Android APK 应用下载与版本归档网站。", tag: "Android" }
  ],

  periods: [
    { n: 1, time: "08:00–08:45", group: "morning" },
    { n: 2, time: "08:50–09:35", group: "morning" },
    { n: 3, time: "09:55–10:40", group: "morning" },
    { n: 4, time: "10:45–11:30", group: "morning" },
    { n: 5, time: "13:00–13:45", group: "afternoon" },
    { n: 6, time: "13:50–14:35", group: "afternoon" },
    { n: 7, time: "14:40–15:25", group: "afternoon" },
    { n: 8, time: "18:15–19:00", group: "evening" },
    { n: 9, time: "19:05–19:50", group: "evening" },
    { n: 10, time: "19:55–20:40", group: "evening" }
  ],

  semesters: [
    {
      id: "2025-2026-1",
      name: "2025—2026 学年第一学期",
      program: "2025级经济学专业（拔尖学生培养基地班）",
      credits: 25,
      courses: [
        { id: "11071043-03", code: "11071043", name: "文学欣赏", section: "03", credits: 3, property: "必修", category: "通识必修", exam: "—", teacher: "张洪波", method: "正常", status: "置入", tone: 0,
          meetings: [{ weeks: "5–18周", day: 3, start: 1, end: 2, campus: "校本部", building: "之远楼", room: "(5#)304" }] },
        { id: "11160072-10", code: "11160072", name: "军事理论", section: "10", credits: 2, property: "必修", category: "通识必修", exam: "—", teacher: "徐永杰", method: "正常", status: "置入", tone: 1,
          meetings: [{ weeks: "5–16周", day: 2, start: 8, end: 10, campus: "校本部", building: "之远楼", room: "(5#)205" }] },
        { id: "11160093-04", code: "11160093", name: "马克思主义基本原理", section: "04", credits: 3, property: "必修", category: "通识必修", exam: "—", teacher: "陈宁", method: "正常", status: "置入", tone: 2,
          meetings: [
            { weeks: "5–18周", day: 2, start: 5, end: 7, campus: "校本部", building: "之远楼", room: "(5#)103" },
            { weeks: "5–8周", day: 5, start: 5, end: 7, campus: "校本部", building: "之远楼", room: "(5#)103" }
          ] },
        { id: "11160113-08", code: "11160113", name: "中国近现代史纲要", section: "08", credits: 3, property: "必修", category: "通识必修", exam: "—", teacher: "卜毅然", method: "正常", status: "置入", tone: 3,
          meetings: [
            { weeks: "5–18周", day: 1, start: 8, end: 10, campus: "校本部", building: "之远楼", room: "(5#)105" },
            { weeks: "10–13周", day: 3, start: 8, end: 10, campus: "校本部", building: "之远楼", room: "(5#)105" }
          ] },
        { id: "11161040-11", code: "11161040", name: "形势与政策1", section: "11", credits: 0, property: "必修", category: "通识必修", exam: "—", teacher: "丁萧", method: "正常", status: "置入", tone: 4,
          meetings: [{ weeks: "5–8周", day: 1, start: 1, end: 2, campus: "校本部", building: "之远楼", room: "(5#)102" }] },
        { id: "11161233-13", code: "11161233", name: "思想道德与法治", section: "13", credits: 3, property: "必修", category: "通识必修", exam: "—", teacher: "娄慧、杨金桥", method: "正常", status: "置入", tone: 5,
          meetings: [
            { weeks: "6–8周、17周", day: 2, start: 1, end: 2, campus: "校本部", building: "之远楼", room: "6–8周：(5#)204；17周：(5#)205" },
            { weeks: "5–18周", day: 5, start: 1, end: 2, campus: "校本部", building: "之远楼", room: "(5#)204" }
          ] },
        { id: "19620323-01", code: "19620323", name: "英语听说1", section: "01", credits: 3, property: "必修", category: "通识必修", exam: "—", teacher: "John O Leary", method: "正常", status: "置入", tone: 6,
          meetings: [{ weeks: "5–18周", day: 4, start: 5, end: 7, campus: "校本部", building: "之远楼", room: "(5#)1010" }] },
        { id: "11260141-05", code: "11260141", name: "大学生职业生涯规划", section: "05", credits: 1, property: "必修", category: "通识必修", exam: "—", teacher: "陆菲", method: "正常", status: "置入", tone: 7,
          meetings: [{ weeks: "10–18周", day: 5, start: 3, end: 4, campus: "校本部", building: "之远楼", room: "(5#)302" }] },
        { id: "19620384-01", code: "19620384", name: "数学分析1", section: "01", credits: 4, property: "必修", category: "通识必修", exam: "—", teacher: "凤天宏", method: "正常", status: "置入", tone: 8,
          meetings: [
            { weeks: "6–18周", day: 1, start: 5, end: 6, campus: "校本部", building: "之远楼", room: "(5#)304" },
            { weeks: "5–18周", day: 4, start: 3, end: 4, campus: "校本部", building: "之远楼", room: "(5#)304" },
            { weeks: "第10周", day: 6, start: 2, end: 3, campus: "校本部", building: "之远楼", room: "(5#)304" }
          ] },
        { id: "79620452-01", code: "79620452", name: "高等代数（上）", section: "01", credits: 2, property: "任选", category: "通识选修", exam: "—", teacher: "常远", method: "正常", status: "置入", tone: 9,
          meetings: [
            { weeks: "5–8、10–13周", day: 3, start: 5, end: 6, campus: "校本部", building: "之远楼", room: "(5#)412" },
            { weeks: "第14周", day: 4, start: 8, end: 9, campus: "校本部", building: "之远楼", room: "(5#)309" },
            { weeks: "5–8、10–14周", day: 5, start: 8, end: 9, campus: "校本部", building: "之远楼", room: "(5#)309" }
          ] },
        { id: "11180891-18", code: "11180891", name: "体育课（男）", section: "18", credits: 1, property: "必修", category: "通识必修", exam: "考试", teacher: "王冕", method: "正常", status: "选中", tone: 10,
          meetings: [{ weeks: "5–18周", day: 1, start: 3, end: 4, campus: "校本部", building: "体育部", room: "田径场5" }] }
      ]
    },

    {
      id: "2025-2026-2",
      name: "2025—2026 学年第二学期",
      program: "2025级经济学专业（拔尖学生培养基地班）",
      credits: 32,
      courses: [
        { id: "11260242-14", code: "11260242", name: "大学生心理健康教育", section: "14", credits: 2, property: "必修", category: "通识必修", exam: "考试", teacher: "王凯铭", method: "正常", status: "置入", tone: 0,
          meetings: [{ weeks: "1–18周", day: 2, start: 8, end: 9, campus: "校本部", building: "之远楼", room: "(5#)E101" }] },
        { id: "19620333-01", code: "19620333", name: "英语听说2", section: "01", credits: 3, property: "必修", category: "通识必修", exam: "考试", teacher: "John O Leary", method: "正常", status: "置入", tone: 1,
          meetings: [{ weeks: "1–18周", day: 5, start: 5, end: 7, campus: "校本部", building: "之远楼", room: "(5#)1010" }] },
        { id: "19620404-01", code: "19620404", name: "数学分析2", section: "01", credits: 4, property: "必修", category: "通识必修", exam: "考试", teacher: "凤天宏", method: "正常", status: "置入", tone: 2,
          meetings: [
            { weeks: "1–2、4–13、15–18周", day: 1, start: 1, end: 2, campus: "校本部", building: "之远楼", room: "(5#)1010" },
            { weeks: "第14周", day: 2, start: 3, end: 4, campus: "校本部", building: "之远楼", room: "(5#)1010" },
            { weeks: "1–18周", day: 3, start: 5, end: 6, campus: "校本部", building: "之远楼", room: "(5#)1010" },
            { weeks: "第3周", day: 4, start: 3, end: 4, campus: "校本部", building: "之远楼", room: "(5#)1010" }
          ] },
        { id: "29620083-01", code: "29620083", name: "政治经济学", section: "01", credits: 3, property: "必修", category: "学科必修", exam: "考试", teacher: "郑尚植", method: "正常", status: "置入", tone: 3,
          meetings: [{ weeks: "1–18周", day: 4, start: 5, end: 7, campus: "校本部", building: "之远楼", room: "(5#)1014" }] },
        { id: "11060132-14", code: "11060132", name: "法学概论", section: "14", credits: 2, property: "必修", category: "通识必修", exam: "考试", teacher: "薛茜", method: "正常", status: "置入", tone: 4,
          meetings: [{ weeks: "1–18周", day: 2, start: 1, end: 2, campus: "校本部", building: "之远楼", room: "(5#)203" }] },
        { id: "29620094-01", code: "29620094", name: "微观经济学", section: "01", credits: 4, property: "必修", category: "学科必修", exam: "考试", teacher: "李雪增、蒋媛媛", method: "正常", status: "置入", tone: 5,
          meetings: [
            { weeks: "1–18周", day: 1, start: 3, end: 4, campus: "校本部", building: "之远楼", room: "(5#)310" },
            { weeks: "1–18周", day: 5, start: 3, end: 4, campus: "校本部", building: "之远楼", room: "(5#)310" }
          ] },
        { id: "31130073-01", code: "31130073", name: "会计学", section: "01", credits: 3, property: "必修", category: "专业必修", exam: "考试", teacher: "肖亮", method: "正常", status: "置入", tone: 6,
          meetings: [{ weeks: "1–18周", day: 4, start: 8, end: 10, campus: "校本部", building: "之远楼", room: "(5#)108" }] },
        { id: "11071122-01", code: "11071122", name: "应用写作", section: "01", credits: 2, property: "必修", category: "通识必修", exam: "考试", teacher: "张洪波", method: "正常", status: "置入", tone: 7,
          meetings: [{ weeks: "1–18周单周", day: 5, start: 1, end: 2, campus: "校本部", building: "之远楼", room: "(5#)304" }] },
        { id: "11161050-12", code: "11161050", name: "形势与政策2", section: "12", credits: 0, property: "必修", category: "通识必修", exam: "考试", teacher: "闫鸿鹏", method: "正常", status: "置入", tone: 8,
          meetings: [{ weeks: "5–8周", day: 4, start: 3, end: 4, campus: "校本部", building: "之远楼", room: "(5#)W201" }] },
        { id: "11161141-19", code: "11161141", name: "劳动教育", section: "19", credits: 1, property: "必修", category: "通识必修", exam: "考试", teacher: "李建中", method: "正常", status: "置入", tone: 9,
          meetings: [{ weeks: "1–18周", day: 3, start: 3, end: 4, campus: "校本部", building: "之远楼", room: "(5#)303" }] },
        { id: "11161223-16", code: "11161223", name: "习近平新时代中国特色社会主义思想概论", section: "16", credits: 3, property: "必修", category: "通识必修", exam: "考试", teacher: "王坤平", method: "正常", status: "置入", tone: 10,
          meetings: [{ weeks: "1–18周", day: 4, start: 1, end: 2, campus: "校本部", building: "之远楼", room: "(5#)108" }] },
        { id: "79020023-01", code: "79020023", name: "概率论与数理统计", section: "01", credits: 3, property: "任选", category: "通识选修", exam: "考试", teacher: "齐博瑞", method: "正常", status: "选中", tone: 11,
          meetings: [{ weeks: "1–18周", day: 1, start: 5, end: 7, campus: "校本部", building: "之远楼", room: "(5#)1010" }] },
        { id: "79620462-01", code: "79620462", name: "高等代数（下）", section: "01", credits: 2, property: "任选", category: "通识选修", exam: "考试", teacher: "常远", method: "正常", status: "选中", tone: 12,
          meetings: [{ weeks: "1–18周", day: 3, start: 8, end: 9, campus: "校本部", building: "之远楼", room: "(5#)907" }] }
      ]
    },

    {
      id: "2026-2027-1",
      name: "2026—2027 学年第一学期",
      program: "2025级经济学专业（拔尖学生培养基地班）",
      credits: 25,
      courses: [
        { id: "11121622-26", code: "11121622", name: "SYB创新创业基础", section: "26", credits: 2, property: "必修", category: "通识必修", exam: "考试", teacher: "苗莉", method: "正常", status: "置入", tone: 0,
          meetings: [{ weeks: "1–18周单周", day: 4, start: 1, end: 2, campus: "校本部", building: "笃行楼", room: "301" }] },
        { id: "11160043-07", code: "11160043", name: "毛泽东思想和中国特色社会主义理论体系概论", section: "07", credits: 3, property: "必修", category: "通识必修", exam: "考试", teacher: "于颖", method: "正常", status: "置入", tone: 1,
          meetings: [{ weeks: "1–18周", day: 1, start: 5, end: 7, campus: "校本部", building: "之远楼", room: "(5#)108" }] },
        { id: "11161060-17", code: "11161060", name: "形势与政策3", section: "17", credits: 0, property: "必修", category: "通识必修", exam: "考试", teacher: "马军", method: "正常", status: "置入", tone: 2,
          meetings: [{ weeks: "1–4周", day: 3, start: 1, end: 2, campus: "校本部", building: "之远楼", room: "(5#)W101" }] },
        { id: "11260251-01", code: "11260251", name: "国家安全教育", section: "01", credits: 1, property: "必修", category: "通识必修", exam: "考试", teacher: "徐永杰", method: "正常", status: "置入", tone: 3,
          meetings: [{ weeks: "10–15周", day: 7, start: 8, end: 10, campus: "校本部", building: "网络教学平台", room: "超星学习通线上自学" }] },
        { id: "29620013-01", code: "29620013", name: "宏观经济学", section: "01", credits: 3, property: "必修", category: "学科必修", exam: "考试", teacher: "赵雷", method: "正常", status: "置入", tone: 4,
          meetings: [{ weeks: "1–18周", day: 2, start: 5, end: 7, campus: "校本部", building: "之远楼", room: "(5#)406" }] },
        { id: "29620063-01", code: "29620063", name: "统计学", section: "01", credits: 3, property: "必修", category: "学科必修", exam: "考试", teacher: "王雪妮", method: "正常", status: "置入", tone: 5,
          meetings: [{ weeks: "1–18周", day: 4, start: 5, end: 7, campus: "校本部", building: "之远楼", room: "(5#)814" }] },
        { id: "39620033-01", code: "39620033", name: "管理学", section: "01", credits: 3, property: "必修", category: "专业必修", exam: "考试", teacher: "郑文全", method: "正常", status: "置入", tone: 6,
          meetings: [{ weeks: "1–18周", day: 2, start: 2, end: 4, campus: "校本部", building: "之远楼", room: "(5#)1014" }] },
        { id: "39620054-01", code: "39620054", name: "计量经济学", section: "01", credits: 4, property: "必修", category: "专业必修", exam: "考试", teacher: "宋依纯", method: "正常", status: "置入", tone: 7,
          meetings: [
            { weeks: "1–18周", day: 1, start: 1, end: 2, campus: "校本部", building: "之远楼", room: "(5#)1015" },
            { weeks: "1–18周", day: 4, start: 3, end: 4, campus: "校本部", building: "之远楼", room: "(5#)1015" }
          ] },
        { id: "39620353-01", code: "39620353", name: "学术英语1", section: "01", credits: 3, property: "必修", category: "专业必修", exam: "考试", teacher: "刘小鹏", method: "正常", status: "置入", tone: 8,
          meetings: [{ weeks: "1–18周", day: 3, start: 8, end: 10, campus: "校本部", building: "之远楼", room: "(5#)1010" }] },
        { id: "39620393-01", code: "39620393", name: "数学分析3", section: "01", credits: 3, property: "必修", category: "专业必修", exam: "考试", teacher: "凤天宏", method: "正常", status: "置入", tone: 9,
          meetings: [{ weeks: "1–18周", day: 3, start: 5, end: 7, campus: "校本部", building: "之远楼", room: "(5#)1014" }] }
      ]
    }
  ]
};
