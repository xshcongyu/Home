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
    { title: "GitHub", url: "https://github.com/", category: "资源库", description: "代码、开源项目与技术资料库。", tag: "开发" },
    { title: "Hugging Face", url: "https://huggingface.co/", category: "资源库", description: "模型、数据集与机器学习应用社区。", tag: "模型" },
    { title: "Kaggle", url: "https://www.kaggle.com/", category: "资源库", description: "数据集、Notebook 与数据科学竞赛。", tag: "数据" },
    { title: "Internet Archive", url: "https://archive.org/", category: "资源库", description: "互联网档案、公开图书与历史网页。", tag: "档案" },

    { title: "中国大学 MOOC", url: "https://www.icourse163.org/", category: "高校", description: "中国高校在线课程学习平台。", tag: "课程" },
    { title: "学堂在线", url: "https://www.xuetangx.com/", category: "高校", description: "清华大学发起的中文在线学习平台。", tag: "课程" },

    { title: "哔哩哔哩", url: "https://www.bilibili.com/", category: "网站", description: "视频、知识内容与兴趣社区。", tag: "视频" },
    { title: "知乎", url: "https://www.zhihu.com/", category: "网站", description: "问题讨论、经验分享与专题内容。", tag: "社区" },
    { title: "少数派", url: "https://sspai.com/", category: "网站", description: "数字工具、效率方法与生活方式。", tag: "效率" },
    { title: "豆瓣", url: "https://www.douban.com/", category: "网站", description: "书影音记录与兴趣小组。", tag: "书影音" },
    { title: "V2EX", url: "https://www.v2ex.com/", category: "网站", description: "技术、创造与生活话题社区。", tag: "社区" },

    { title: "中国政府网", url: "https://www.gov.cn/", category: "官网", description: "国务院政策、政务信息与公开文件。", tag: "政务" },
    { title: "中华人民共和国教育部", url: "http://www.moe.gov.cn/", category: "官网", description: "教育政策、统计与公开信息。", tag: "教育" },
    { title: "国家统计局", url: "https://www.stats.gov.cn/", category: "官网", description: "宏观经济与社会统计数据。", tag: "统计" },
    { title: "学信网", url: "https://www.chsi.com.cn/", category: "官网", description: "教育学历查询与高校招生信息。", tag: "教育" },
    { title: "中国人民银行", url: "http://www.pbc.gov.cn/", category: "官网", description: "货币政策、金融统计与公开信息。", tag: "金融" },
    { title: "国家数据", url: "https://data.stats.gov.cn/", category: "官网", description: "国家统计局在线数据查询。", tag: "数据" },

    { title: "ChatGPT", url: "https://chatgpt.com/", category: "AI", description: "OpenAI 提供的通用人工智能助手。", tag: "对话" },
    { title: "Claude", url: "https://claude.ai/", category: "AI", description: "Anthropic 提供的通用人工智能助手。", tag: "对话" },
    { title: "Gemini", url: "https://gemini.google.com/", category: "AI", description: "Google 的多模态人工智能助手。", tag: "多模态" },
    { title: "DeepSeek", url: "https://chat.deepseek.com/", category: "AI", description: "支持推理、写作与代码任务的 AI 助手。", tag: "推理" },
    { title: "Kimi", url: "https://www.kimi.com/", category: "AI", description: "长文本阅读、搜索与通用任务助手。", tag: "阅读" },
    { title: "豆包", url: "https://www.doubao.com/", category: "AI", description: "字节跳动推出的人工智能助手。", tag: "对话" },
    { title: "Perplexity", url: "https://www.perplexity.ai/", category: "AI", description: "提供来源引用的人工智能搜索工具。", tag: "搜索" },
    { title: "NotebookLM", url: "https://notebooklm.google.com/", category: "AI", description: "围绕个人资料进行总结与问答。", tag: "知识库" },
    { title: "Poe", url: "https://poe.com/", category: "AI", description: "聚合多种人工智能模型的对话平台。", tag: "聚合" },

    { title: "Zotero", url: "https://www.zotero.org/", category: "工具", description: "文献收集、管理、引用与协作工具。", tag: "文献" },
    { title: "Overleaf", url: "https://www.overleaf.com/", category: "工具", description: "在线 LaTeX 写作与协作平台。", tag: "写作" },
    { title: "Wolfram Alpha", url: "https://www.wolframalpha.com/", category: "工具", description: "计算知识引擎与数学求解工具。", tag: "计算" },
    { title: "Desmos", url: "https://www.desmos.com/calculator", category: "工具", description: "快速绘制函数与探索数学图形。", tag: "数学" },
    { title: "Excalidraw", url: "https://excalidraw.com/", category: "工具", description: "手绘风格的在线白板与示意图工具。", tag: "绘图" },
    { title: "ProcessOn", url: "https://www.processon.com/", category: "工具", description: "流程图、思维导图与在线协作。", tag: "图表" },
    { title: "Convertio", url: "https://convertio.co/zh/", category: "工具", description: "多种文件格式的在线转换工具。", tag: "转换" },
    { title: "TinyPNG", url: "https://tinypng.com/", category: "工具", description: "压缩 PNG、JPEG 和 WebP 图片。", tag: "压缩" },

    { title: "arXiv", url: "https://arxiv.org/", category: "学术前沿", description: "数学、计算机、经济学等领域的预印本平台。", tag: "论文" },

    { title: "剪映", url: "https://www.capcut.cn/", category: "剪辑", description: "视频剪辑、字幕与创作工具。", tag: "视频" },

    { title: "Unsplash", url: "https://unsplash.com/", category: "图片视频", description: "高质量摄影图片素材网站。", tag: "图片" },
    { title: "Pexels", url: "https://www.pexels.com/zh-cn/", category: "图片视频", description: "免费图片与视频素材库。", tag: "素材" },
    { title: "Pixabay", url: "https://pixabay.com/zh/", category: "图片视频", description: "免版税图片、插画与视频素材。", tag: "素材" },
    { title: "Canva", url: "https://www.canva.cn/", category: "图片视频", description: "在线海报、演示和社交图片设计。", tag: "设计" },
    { title: "Photopea", url: "https://www.photopea.com/", category: "图片视频", description: "浏览器内运行的图片编辑工具。", tag: "编辑" },

    { title: "Wayback Machine", url: "https://web.archive.org/", category: "其他", description: "查询网站过去的历史页面。", tag: "历史" },
    { title: "Ninite", url: "https://ninite.com/", category: "安装", description: "批量下载安装常见 Windows 软件。", tag: "软件" },
    { title: "GitHub Dashboard", url: "https://github.com/dashboard", category: "书签栏", description: "快速回到 GitHub 个人工作台。", tag: "快捷" }
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
