(function () {
  "use strict";

  const DATA = window.SITE_DATA;
  const app = document.getElementById("main-content");
  const nav = document.getElementById("main-nav");
  const menuButton = document.getElementById("menu-button");
  const themeButton = document.getElementById("theme-toggle");
  const toast = document.getElementById("toast");
  const courseDialog = document.getElementById("course-dialog");
  const courseDialogContent = document.getElementById("course-dialog-content");
  const DAYS = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
  const DAY_SHORT = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const TONES = [
    { accent: "#1b9a68", bg: "#cdeedc" },
    { accent: "#397ed1", bg: "#d8e9fb" },
    { accent: "#695fd7", bg: "#e3dffc" },
    { accent: "#13a5a3", bg: "#d1efed" },
    { accent: "#dc7a21", bg: "#f9e1bd" },
    { accent: "#c94f65", bg: "#f7d7dd" },
    { accent: "#a45a45", bg: "#ecd3c9" },
    { accent: "#7f779e", bg: "#dfdcec" },
    { accent: "#db4a91", bg: "#f8d3e6" },
    { accent: "#b86a0a", bg: "#f4d7ad" },
    { accent: "#627700", bg: "#dfe7b8" },
    { accent: "#8b6557", bg: "#e7d6cf" },
    { accent: "#5f6269", bg: "#dadbdd" }
  ];

  let toastTimer;
  let navState = { category: "全部", query: "", view: "grid" };
  let ocrLibraryPromise;
  let ocrWorker;
  let ocrWorkerLanguage = "";

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function icon(name) {
    const paths = {
      tools: '<path d="M14.7 6.3a4 4 0 0 0-5-5L7.4 3.6l1.2 2.8-2.2 2.2-2.8-1.2-2.3 2.3a4 4 0 0 0 5 5l6.4 6.4a2.1 2.1 0 0 0 3-3l-6.4-6.4"/>',
      book: '<path d="M4 3.5h11a3 3 0 0 1 3 3V21H7a3 3 0 0 1-3-3V3.5Z"/><path d="M7 17.5h11M8 7h6M8 10h6"/>',
      grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M7 14h3M14 14h3M7 18h3"/>',
      file: '<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/>',
      scan: '<path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M8 12h8M12 8v8"/>',
      image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m5 18 5-5 3 3 2-2 4 4M7 2v4M17 2v4"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.arrow}</svg>`;
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  let motionTimer;

  function bindMotionCollages() {
    clearInterval(motionTimer);
    const messages = ["整理常用网页", "查看本周课程", "处理本地文档", "留下一点秩序"];
    let messageIndex = 0;
    const update = () => {
      const now = new Date();
      const time = new Intl.DateTimeFormat("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }).format(now);
      const date = new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "short" }).format(now);
      document.querySelectorAll("[data-motion-time]").forEach((item) => { item.textContent = time; });
      document.querySelectorAll("[data-motion-date]").forEach((item) => { item.textContent = date; });
      document.querySelectorAll("[data-motion-word]").forEach((item, index) => { item.textContent = messages[(messageIndex + index) % messages.length]; });
      messageIndex = (messageIndex + 1) % messages.length;
    };
    update();
    if (document.querySelector("[data-motion-collage]")) motionTimer = window.setInterval(update, 5000);
  }

  function currentLocation() {
    const raw = location.hash.slice(1) || "/";
    const [path, queryString = ""] = raw.split("?");
    return { path: path || "/", query: new URLSearchParams(queryString) };
  }

  function setActiveNav(path) {
    nav.querySelectorAll("a[data-route]").forEach((link) => {
      const route = link.dataset.route;
      const active = route === "/" ? path === "/" : path === route || path.startsWith(`${route}/`);
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function motionCollage(label, compact = false, status = "静态前端 · 本地运行") {
    return `
      <aside class="motion-collage ${compact ? "is-compact" : ""}" data-motion-collage aria-label="${escapeHTML(label)}">
        <div class="motion-collage-head"><span><i></i> CONGYU DESK</span><b>AUTO 01</b></div>
        <div class="motion-stage">
          <div class="motion-glow" aria-hidden="true"></div>
          <div class="motion-disc motion-disc-large" aria-hidden="true"></div>
          <div class="motion-disc motion-disc-small" aria-hidden="true"></div>
          <svg class="motion-trace" viewBox="0 0 430 300" aria-hidden="true"><path d="M-20 235C76 134 131 272 228 156C302 68 344 103 462 22"/><path d="M12 276C107 184 176 295 275 196C341 130 391 150 450 96"/></svg>
          <section class="motion-panel motion-clock"><span data-motion-date>正在读取日期</span><strong data-motion-time>--:--</strong><small>ASIA / SHANGHAI</small></section>
          <section class="motion-panel motion-library"><small>LIBRARY</small><strong>${DATA.bookmarks.length}</strong><span>常用网页</span></section>
          <section class="motion-panel motion-term"><small>SEMESTER</small><strong>${DATA.semesters.length}</strong><span>学期课表</span></section>
          <section class="motion-panel motion-tools"><small>LOCAL</small><strong>03</strong><span>浏览器工具</span></section>
          <div class="motion-message"><i></i><span data-motion-word>整理常用网页</span></div>
        </div>
        <div class="motion-collage-foot"><span>${escapeHTML(status)}</span><b>无需操作 · 自动播放</b></div>
      </aside>`;
  }

  function pageHero(kicker, title, muted, copy, actions = "", compact = true, aside = "") {
    const content = `
      <div class="hero-copy-column">
        <span class="eyebrow">${escapeHTML(kicker)}</span>
        <h1>${escapeHTML(title)}${muted ? `<span class="muted-line">${escapeHTML(muted)}</span>` : ""}</h1>
        ${copy ? `<p class="hero-copy">${escapeHTML(copy)}</p>` : ""}
        ${actions ? `<div class="hero-actions">${actions}</div>` : ""}
      </div>`;
    return `
      <section class="hero ${compact ? "compact" : ""} ${aside ? "has-widget" : ""}">
        <div class="hero-inner page-shell">
          ${aside ? `<div class="hero-main-grid">${content}${aside}</div>` : content}
        </div>
      </section>`;
  }

  function renderHome() {
    const latest = DATA.semesters[DATA.semesters.length - 1];
    const bookmarkCount = DATA.bookmarks.length;
    const categoryCount = DATA.categories.length;
    const today = new Date().getDay();
    const todayIndex = today === 0 ? 7 : today;
    const weekItems = DAYS.map((day, index) => {
      const dayNumber = index + 1;
      const courses = latest.courses.flatMap((course) =>
        course.meetings.filter((meeting) => meeting.day === dayNumber).map((meeting) => ({ course, meeting }))
      );
      return `
        <div class="week-day ${todayIndex === dayNumber ? "is-today" : ""}">
          <strong>${day}${todayIndex === dayNumber ? " · 今天" : ""}</strong>
          ${courses.length ? courses.slice(0, 3).map(({ course, meeting }) => {
            const tone = TONES[course.tone % TONES.length];
            return `<div class="mini-course" style="color:${tone.accent}">${escapeHTML(course.name)}<br>${meeting.start}–${meeting.end}节</div>`;
          }).join("") : '<span style="color:var(--muted);font-size:9px">暂无课程</span>'}
        </div>`;
    }).join("");

    app.innerHTML = `
      <section class="hero">
        <div class="hero-inner page-shell">
          <div class="hero-main-grid">
            <div class="hero-copy-column">
              <span class="eyebrow">学习 · 工具 · 网页 · 课表</span>
              <h1>这里是<span class="muted-line">丛鱼的家</span></h1>
              <p class="hero-copy">把常用工具、网页书签与每学期的课程放在一个安静、清楚、随时可以抵达的地方。这里既是一张个人主页，也是一间持续整理的数字房间。</p>
              <div class="hero-actions">
                <a class="button primary" href="#/navigation">浏览网页导航 →</a>
                <a class="button" href="#/schedule">查看学期课表</a>
                <a class="button ghost" href="#/about">认识丛鱼 →</a>
              </div>
            </div>
            ${motionCollage("首页动态信息拼贴", false, `${latest.name} · ${latest.courses.length} 门课程`)}
          </div>
          <div class="hero-stats">
            <div class="stat"><strong>${bookmarkCount}</strong><span>常用网页</span><small>分门别类，点击即达</small></div>
            <div class="stat"><strong>${categoryCount}</strong><span>导航分类</span><small>支持筛选与关键词搜索</small></div>
            <div class="stat"><strong>${DATA.semesters.length}</strong><span>学期课表</span><small>课表与课程详情联动</small></div>
            <div class="stat"><strong>3</strong><span>浏览器工具</span><small>文档转换 · 文字提取 · 写作分析</small></div>
          </div>
        </div>
      </section>

      <section class="source-strip">
        <div class="source-strip-inner page-shell">
          <span>站内内容一览</span>
          ${DATA.categories.slice(0, 10).map((category) => `<a class="mini-link" href="#/navigation?category=${encodeURIComponent(category)}">${escapeHTML(category)}</a>`).join("")}
        </div>
      </section>

      <section class="section">
        <div class="page-shell">
          <div class="section-heading">
            <div><span class="section-kicker">快速开始</span><h2>从你现在想做的事进入。</h2><p>顶部导航负责全站跳转，首页入口则把最常用的功能放到眼前。</p></div>
          </div>
          <div class="quick-grid">
            <a class="quick-card" href="#/about"><span class="number">01 · ABOUT</span><span class="icon-tile tone-green">${icon("book")}</span><h3>个人简介</h3><p>认识丛鱼，以及这个个人空间为什么存在。</p><span class="card-link">这里是丛鱼的家 →</span></a>
            <a class="quick-card" href="#/tools"><span class="number">02 · TOOLS</span><span class="icon-tile tone-blue">${icon("tools")}</span><h3>实用工具</h3><p>在浏览器里转换文档、提取图片文字并分析写作特征。</p><span class="card-link">打开工具箱 →</span></a>
            <a class="quick-card" href="#/navigation"><span class="number">03 · LINKS</span><span class="icon-tile tone-violet">${icon("grid")}</span><h3>网页导航</h3><p>按分类整理常用网站，支持搜索、筛选和视图切换。</p><span class="card-link">浏览 ${bookmarkCount} 个网页 →</span></a>
            <a class="quick-card" href="#/schedule"><span class="number">04 · SCHEDULE</span><span class="icon-tile tone-coral">${icon("calendar")}</span><h3>学期课表</h3><p>切换学期查看彩色课表，并展开完整课程信息。</p><span class="card-link">查看 ${DATA.semesters.length} 个学期 →</span></a>
          </div>
        </div>
      </section>

      <section class="section alt">
        <div class="page-shell">
          <div class="section-heading">
            <div><span class="section-kicker">本周视图</span><h2>${escapeHTML(latest.name)}</h2><p>${escapeHTML(latest.program)} · ${latest.credits} 学分。这里展示最新录入学期的简要安排。</p></div>
            <a class="button" href="#/schedule?semester=${encodeURIComponent(latest.id)}">打开完整课表 →</a>
          </div>
          <div class="home-dashboard">
            <div class="panel">
              <div class="panel-header"><h3>一周课程</h3><span>${latest.courses.length} 门课程</span></div>
              <div class="week-preview">${weekItems}</div>
            </div>
            <div class="panel">
              <div class="panel-header"><h3>网站工作方式</h3><span>静态前端</span></div>
              <div class="privacy-list">
                <div class="privacy-item"><b>✓</b><div><strong>顶部导航贯穿全站</strong><span>电脑端固定展示，手机端折叠为清晰菜单。</span></div></div>
                <div class="privacy-item"><b>✓</b><div><strong>内容与页面分离</strong><span>网页与课程保存在独立数据文件，方便以后修改。</span></div></div>
                <div class="privacy-item"><b>✓</b><div><strong>文档默认留在本机</strong><span>转换过程直接在浏览器内完成，不主动上传文件。</span></div></div>
                <div class="privacy-item"><b>✓</b><div><strong>适合 GitHub Pages</strong><span>使用 Hash 路由，无需云服务器处理页面跳转。</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section dark">
        <div class="page-shell cta-grid">
          <div><span class="section-kicker">继续探索</span><h2>把需要的东西，<br>放在随手可及的地方。</h2><p>网页、课程、工具与个人信息都可以继续增长。现在先从最常用的一页开始。</p><div class="button-row"><a class="button primary" href="#/navigation">打开网页导航</a><a class="button" href="#/tools">使用工具</a></div></div>
          <div class="check-card"><strong>当前已经包括</strong><span><i>✓</i>固定且响应式的顶部导航</span><span><i>✓</i>三学期彩色课表与完整详情</span><span><i>✓</i>可筛选、搜索的网页分类</span><span><i>✓</i>三项浏览器端工具</span><span><i>✓</i>适配 GitHub Pages 的静态结构</span></div>
        </div>
      </section>`;
  }

  function renderAbout() {
    const p = DATA.profile;
    app.innerHTML = `
      ${pageHero("关于这个空间", "这里是", "丛鱼的家", "一个用于收纳学习、工具、网页和课表的个人空间。它保持简单，也给未来的内容留出足够的位置。", '<a class="button primary" href="#about-content">开始认识 →</a><a class="button" href="#/navigation">看看常用网页</a>')}
      <section class="section" id="about-content">
        <div class="page-shell about-layout">
          <aside class="portrait-card">
            <div class="portrait-symbol"><img src="./assets/avatar.jpg" alt="丛鱼的头像" /></div>
            <div><span class="section-kicker">Congyu</span><h2>${escapeHTML(p.name)}</h2><p>经济学专业在读。这里记录学习轨迹、常用工具与持续整理中的个人知识空间。</p><div class="profile-chips">${p.tags.map((tag) => `<span class="chip">${escapeHTML(tag)}</span>`).join("")}</div></div>
          </aside>
          <div>
            <article class="prose-block"><span class="section-kicker">自我介绍</span><h2>${escapeHTML(p.title)}</h2><p>${escapeHTML(p.intro)}</p><p>我希望这个网站不只是个人名片，也能真正解决每天会遇到的小问题：快速找到常用网站、检查本学期课程、处理简单文档，或者把值得保留的信息归档起来。</p></article>
            <article class="prose-block"><span class="section-kicker">做事方式</span><h2>让信息清楚地待在它该在的位置。</h2><div class="value-grid">${p.values.map((item, index) => `<div class="value-card"><small>0${index + 1}</small><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></div>`).join("")}</div></article>
            <article class="prose-block"><span class="section-kicker">当前状态</span><h2>网站还会继续生长。</h2><p>目前已经完成个人主页、工具、网页导航和三学期课表。未来可以加入读书记录、课程资料、项目展示、博客文章，或者在需要时接入后台管理。</p><div class="button-row"><a class="button primary" href="#/schedule">查看课表</a><a class="button" href="#/tools">打开工具</a></div></article>
          </div>
        </div>
      </section>`;
  }

  function toolNav(active) {
    return `
      <aside class="tool-sidebar">
        <h3>工具箱</h3>
        <a class="tool-nav-button ${active === "converter" ? "is-active" : ""}" href="#/tools/converter">${icon("file")} 文档转换</a>
        <a class="tool-nav-button ${active === "ocr" ? "is-active" : ""}" href="#/tools/ocr">${icon("image")} 文字提取</a>
        <a class="tool-nav-button ${active === "ai-check" ? "is-active" : ""}" href="#/tools/ai-check">${icon("scan")} AI 写作特征</a>
        <div class="sidebar-note">文档、图片和文本默认在当前浏览器中处理，不会主动上传你的内容。</div>
      </aside>`;
  }

  function renderToolsOverview() {
    app.innerHTML = `
      ${pageHero("浏览器端工具", "处理文档，", "提取图片文字。", "三项工具都优先在本地浏览器中运行：转换常见文本格式、从图片提取文字，以及进行透明、可解释的写作特征分析。")}
      <section class="section">
        <div class="page-shell">
          <div class="section-heading"><div><span class="section-kicker">选择工具</span><h2>现在要处理什么？</h2><p>不需要账号。打开工具、放入内容、查看结果，需要时再下载。</p></div></div>
          <div class="tool-switcher">
            <a class="tool-choice" href="#/tools/converter"><span class="skill-icon tone-blue">${icon("file")}</span><div><h3>文档转换工具</h3><p>在 TXT、Markdown、HTML、JSON 和 CSV 之间转换，文件默认留在本机。</p></div><b>→</b></a>
            <a class="tool-choice" href="#/tools/ocr"><span class="skill-icon tone-green">${icon("image")}</span><div><h3>图片文字提取</h3><p>上传图片，在浏览器中识别简体中文和英文，并复制或下载结果。</p></div><b>→</b></a>
            <a class="tool-choice" href="#/tools/ai-check"><span class="skill-icon tone-coral">${icon("scan")}</span><div><h3>AI 写作特征分析</h3><p>从句长、重复、连接词和模板表达等角度检查文章的模式化程度。</p></div><b>→</b></a>
          </div>
        </div>
      </section>
      <section class="section alt"><div class="page-shell"><div class="section-heading"><div><span class="section-kicker">能力边界</span><h2>清楚说明能做什么。</h2><p>纯前端暂不承诺 Word、PPT、Excel 与 PDF 的高保真任意互转；模糊图片和手写字的识别率有限；写作分析也不是权威的 AI 来源鉴定。</p></div></div></div></section>`;
  }

  function renderConverter() {
    app.innerHTML = `
      ${pageHero("工具 · 文档转换", "转换常见文本格式，", "文件留在本机。", "支持 TXT、Markdown、HTML、JSON 与 CSV。适合文字、表格数据和轻量标记内容，不用于复杂 Office 排版复刻。")}
      <section class="section">
        <div class="page-shell tool-workspace">
          ${toolNav("converter")}
          <div class="workspace-card">
            <div class="workspace-heading"><div><h2>文档转换器</h2><p>上传文件或直接粘贴内容，选择输出格式后下载。</p></div><span class="local-badge">● 本地处理</span></div>
            <div class="converter-layout">
              <div class="input-card">
                <div class="input-card-head"><strong>01 · 输入内容</strong><span id="source-meta">尚未选择文件</span></div>
                <label class="drop-zone" id="drop-zone"><input id="file-input" type="file" accept=".txt,.md,.markdown,.html,.htm,.json,.csv,text/plain,text/markdown,text/html,application/json,text/csv"><span><b>选择文件或拖到这里</b>TXT · MD · HTML · JSON · CSV，单个文件不超过 5 MB</span></label>
                <label class="field-label" for="source-format">输入格式</label>
                <select class="select" id="source-format"><option value="txt">TXT 纯文本</option><option value="md">Markdown</option><option value="html">HTML</option><option value="json">JSON</option><option value="csv">CSV</option></select>
                <label class="field-label" for="source-text">内容</label>
                <textarea class="text-area" id="source-text" placeholder="也可以直接在这里粘贴或输入内容……"></textarea>
              </div>
              <div class="input-card">
                <div class="input-card-head"><strong>02 · 转换结果</strong><span id="output-meta">等待转换</span></div>
                <span class="field-label">输出格式</span>
                <div class="format-grid" id="format-grid">${["txt", "md", "html", "json", "csv"].map((format) => `<button class="format-option ${format === "txt" ? "is-active" : ""}" type="button" data-format="${format}">${format.toUpperCase()}</button>`).join("")}</div>
                <label class="field-label" for="output-text">预览</label>
                <textarea class="text-area" id="output-text" readonly placeholder="转换结果会显示在这里……"></textarea>
                <div class="button-row"><button class="button primary" id="convert-button" type="button">开始转换</button><button class="button" id="download-button" type="button" disabled>下载文件</button><button class="button ghost" id="clear-converter" type="button">清空</button></div>
              </div>
            </div>
            <div class="tool-status"><span id="converter-status">所有转换都在当前浏览器中完成。</span><span>最大 5 MB</span></div>
          </div>
        </div>
      </section>`;
    bindConverter();
  }

  function renderOCR() {
    app.innerHTML = `
      ${pageHero("工具 · 文字提取", "把图片中的文字，", "带回可编辑的页面。", "上传截图、扫描件或照片，在浏览器本地识别简体中文和英文。首次使用需要联网加载 OCR 模型，图片不会上传到服务器。")}
      <section class="section">
        <div class="page-shell tool-workspace">
          ${toolNav("ocr")}
          <div class="workspace-card ocr-workspace">
            <div class="workspace-heading ocr-heading"><div><h2>图片文字提取</h2><p>支持 JPG、PNG、WebP 与 BMP，建议使用清晰、端正、对比明显的印刷文字图片。</p></div><span class="local-badge">● 本地识别</span></div>
            <div class="ocr-layout">
              <div class="input-card ocr-source-card">
                <div class="input-card-head"><strong>01 · 选择图片</strong><span id="ocr-file-meta">尚未选择图片</span></div>
                <label class="ocr-drop-zone" id="ocr-drop-zone">
                  <input id="ocr-file-input" type="file" accept="image/jpeg,image/png,image/webp,image/bmp,.jpg,.jpeg,.png,.webp,.bmp">
                  <span class="ocr-upload-icon">${icon("image")}</span>
                  <span><b>选择图片或拖到这里</b>JPG · PNG · WebP · BMP，单张不超过 15 MB</span>
                </label>
                <div class="ocr-preview" id="ocr-preview"><div><span class="ocr-preview-mark">${icon("image")}</span><strong>图片预览</strong><small>选择图片后会显示在这里</small></div><img id="ocr-preview-image" alt="待识别图片预览"></div>
                <div class="ocr-settings">
                  <label><span class="field-label">识别语言</span><select class="select" id="ocr-language"><option value="chi_sim+eng">简体中文＋英文</option><option value="chi_sim">仅简体中文</option><option value="eng">仅英文</option></select></label>
                  <label class="ocr-enhance"><input id="ocr-enhance" type="checkbox" checked><span><b>增强图片对比度</b><small>适合截图和浅色扫描件</small></span></label>
                </div>
                <div class="button-row"><button class="button primary" id="ocr-start" type="button" disabled>开始提取</button><button class="button ghost" id="ocr-clear" type="button">清空</button></div>
              </div>
              <div class="input-card ocr-result-card">
                <div class="input-card-head"><strong>02 · 提取结果</strong><span id="ocr-result-meta">等待识别</span></div>
                <div class="ocr-progress" id="ocr-progress"><div><span id="ocr-progress-label">准备就绪</span><b id="ocr-progress-value">0%</b></div><div><i id="ocr-progress-bar" style="--progress:0%"></i></div></div>
                <label class="field-label" for="ocr-result">可编辑文字</label>
                <textarea class="text-area large ocr-result" id="ocr-result" placeholder="识别出的文字会显示在这里，你可以直接修改……"></textarea>
                <div class="ocr-summary"><span><b id="ocr-confidence">—</b> 平均置信度</span><span><b id="ocr-char-count">—</b> 字符</span><span><b id="ocr-time">—</b> 用时</span></div>
                <div class="button-row"><button class="button primary" id="ocr-copy" type="button" disabled>复制文字</button><button class="button" id="ocr-download" type="button" disabled>下载 TXT</button></div>
              </div>
            </div>
            <div class="tool-status"><span id="ocr-status">图片只在当前浏览器中处理，不会主动上传。</span><span>首次使用需加载语言模型</span></div>
          </div>
        </div>
      </section>`;
    bindOCR();
  }

  function renderAIChecker() {
    app.innerHTML = `
      ${pageHero("工具 · 写作分析", "看见文字中的", "AI 写作特征。", "从八组可解释指标、文本类型和样本长度综合判断，给出风险区间与段落线索，而不是伪装成确定的 AI 来源证明。")}
      <section class="section">
        <div class="page-shell tool-workspace">
          ${toolNav("ai-check")}
          <div class="workspace-card checker-workspace">
            <div class="workspace-heading checker-heading"><div><h2>AI 写作特征分析器</h2><p>至少输入 200 字，建议 300 字以上。内容只在当前浏览器中计算。</p></div><span class="local-badge">● 本地分析</span></div>
            <div class="checker-toolbar">
              <label for="checker-mode"><span>文本类型</span><select class="select" id="checker-mode"><option value="general">普通文章</option><option value="academic">学术论文</option><option value="official">说明文 / 公文</option></select></label>
              <p><b>为什么要选择类型？</b> 学术与公文天然更正式，使用同一标准容易误判。</p>
            </div>
            <div class="checker-layout checker-layout-v2">
              <div class="input-card checker-input"><div class="input-card-head"><strong>01 · 待分析文章</strong><span id="checker-count">0 字</span></div><textarea class="text-area large" id="checker-text" placeholder="请粘贴需要分析的中文文章。保留自然段和标点，可以得到更完整的判断……"></textarea><div class="button-row"><button class="button primary" id="analyze-button" type="button">开始分析</button><button class="button" id="sample-button" type="button">载入示例</button><button class="button ghost" id="clear-checker" type="button">清空</button></div></div>
              <div class="score-panel score-panel-v2">
                <div class="score-topline"><span>02 · 分析结果</span><b class="confidence-badge is-empty" id="confidence-badge">等待样本</b></div>
                <div class="score-ring" id="score-ring" style="--score:0"><div><strong id="score-value">—</strong><span>AI 写作特征指数</span></div></div>
                <div class="score-caption"><strong id="score-label">等待分析</strong><span id="score-description">结果将显示为风险区间，并说明影响分数的具体原因。</span></div>
                <div class="score-range"><span>估计区间</span><strong id="score-range">—</strong></div>
                <div class="analysis-stats"><div><strong id="stat-chars">—</strong><span>有效字符</span></div><div><strong id="stat-sentences">—</strong><span>句段</span></div><div><strong id="stat-paragraphs">—</strong><span>自然段</span></div></div>
                <p class="disclaimer">指数表示文本表面特征与常见模式的接近程度，不等于真实“AI 生成概率”，也不能单独作为认定依据。</p>
              </div>
            </div>
            <div class="analysis-details" id="analysis-details" hidden>
              <section class="analysis-block"><div class="analysis-block-head"><div><span>八项指标</span><h3>分数是怎样形成的</h3></div><p>每项都是风险指标：数值越高，越需要人工复核。</p></div><div class="metric-grid-v2" id="metric-grid"></div></section>
              <section class="reason-grid"><div class="reason-card risk"><span>分数升高的原因</span><ul id="risk-reasons"></ul></div><div class="reason-card natural"><span>更接近自然写作的信号</span><ul id="natural-reasons"></ul></div></section>
              <section class="analysis-block"><div class="analysis-block-head"><div><span>段落定位</span><h3>优先检查这些位置</h3></div><p>颜色越深，表示该段集中的模式越多；无需进行额外操作。</p></div><div class="segment-list" id="segment-list"></div></section>
            </div>
            <div class="tool-status"><span id="checker-status">文本不会离开当前页面。</span><span>仅供辅助复核</span></div>
          </div>
        </div>
      </section>`;
    bindAIChecker();
  }

  function renderTools(path) {
    if (path === "/tools/converter") renderConverter();
    else if (path === "/tools/ocr") renderOCR();
    else if (path === "/tools/ai-check") renderAIChecker();
    else renderToolsOverview();
  }

  function parseCSV(text) {
    const rows = [];
    let row = [], cell = "", quoted = false;
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      if (char === '"' && quoted && text[i + 1] === '"') { cell += '"'; i += 1; }
      else if (char === '"') quoted = !quoted;
      else if (char === "," && !quoted) { row.push(cell); cell = ""; }
      else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && text[i + 1] === "\n") i += 1;
        row.push(cell); if (row.some((item) => item.length)) rows.push(row); row = []; cell = "";
      } else cell += char;
    }
    row.push(cell); if (row.some((item) => item.length)) rows.push(row);
    return rows;
  }

  function csvToObjects(text) {
    const rows = parseCSV(text);
    if (!rows.length) return [];
    const headers = rows[0].map((h, index) => h.trim() || `column_${index + 1}`);
    return rows.slice(1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
  }

  function escapeCSV(value) {
    const string = String(value ?? "");
    return /[",\n\r]/.test(string) ? `"${string.replace(/"/g, '""')}"` : string;
  }

  function objectsToCSV(value) {
    const list = Array.isArray(value) ? value : [value];
    if (!list.length) return "";
    if (typeof list[0] !== "object" || list[0] === null) return list.map((item, index) => `${index + 1},${escapeCSV(item)}`).join("\n");
    const headers = [...new Set(list.flatMap((item) => Object.keys(item)))];
    return [headers.map(escapeCSV).join(","), ...list.map((item) => headers.map((header) => escapeCSV(item[header])).join(","))].join("\n");
  }

  function stripHTML(text) {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return (doc.body.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
  }

  function markdownToHTML(text) {
    const inline = (line) => escapeHTML(line)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
    let inList = false;
    const html = text.split(/\r?\n/).map((line) => {
      if (/^[-*]\s+/.test(line)) { const item = `<li>${inline(line.replace(/^[-*]\s+/, ""))}</li>`; const prefix = inList ? "" : "<ul>"; inList = true; return prefix + item; }
      const close = inList ? "</ul>" : ""; inList = false;
      if (/^###\s+/.test(line)) return `${close}<h3>${inline(line.replace(/^###\s+/, ""))}</h3>`;
      if (/^##\s+/.test(line)) return `${close}<h2>${inline(line.replace(/^##\s+/, ""))}</h2>`;
      if (/^#\s+/.test(line)) return `${close}<h1>${inline(line.replace(/^#\s+/, ""))}</h1>`;
      if (!line.trim()) return `${close}<br>`;
      return `${close}<p>${inline(line)}</p>`;
    }).join("\n");
    return `<!doctype html>\n<html lang="zh-CN">\n<head><meta charset="UTF-8"><title>转换文档</title></head>\n<body>\n${html}${inList ? "</ul>" : ""}\n</body>\n</html>`;
  }

  function htmlToMarkdown(text) {
    const doc = new DOMParser().parseFromString(text, "text/html");
    doc.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((node) => { node.textContent = `${"#".repeat(Number(node.tagName.slice(1)))} ${node.textContent}`; });
    doc.querySelectorAll("li").forEach((node) => { node.textContent = `- ${node.textContent}`; });
    doc.querySelectorAll("br").forEach((node) => node.replaceWith("\n"));
    doc.querySelectorAll("p,div,h1,h2,h3,h4,h5,h6,li").forEach((node) => node.append("\n"));
    return (doc.body.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
  }

  function convertContent(source, inputFormat, outputFormat) {
    let parsed;
    if (inputFormat === "json") parsed = JSON.parse(source);
    if (outputFormat === inputFormat) return source;
    if (outputFormat === "txt") {
      if (inputFormat === "html") return stripHTML(source);
      if (inputFormat === "json") return JSON.stringify(parsed, null, 2);
      if (inputFormat === "csv") return parseCSV(source).map((row) => row.join("\t")).join("\n");
      return source.replace(/^#{1,6}\s+/gm, "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");
    }
    if (outputFormat === "md") {
      if (inputFormat === "html") return htmlToMarkdown(source);
      if (inputFormat === "json") return `# JSON 数据\n\n\`\`\`json\n${JSON.stringify(parsed, null, 2)}\n\`\`\``;
      if (inputFormat === "csv") {
        const rows = parseCSV(source); if (!rows.length) return "";
        return [`| ${rows[0].join(" | ")} |`, `| ${rows[0].map(() => "---").join(" | ")} |`, ...rows.slice(1).map((row) => `| ${row.join(" | ")} |`)].join("\n");
      }
      return source;
    }
    if (outputFormat === "html") {
      if (inputFormat === "md") return markdownToHTML(source);
      if (inputFormat === "json") return `<!doctype html><meta charset="UTF-8"><pre>${escapeHTML(JSON.stringify(parsed, null, 2))}</pre>`;
      if (inputFormat === "csv") {
        const rows = parseCSV(source);
        return `<!doctype html><meta charset="UTF-8"><table border="1">${rows.map((row, index) => `<tr>${row.map((cell) => `<${index ? "td" : "th"}>${escapeHTML(cell)}</${index ? "td" : "th"}>`).join("")}</tr>`).join("")}</table>`;
      }
      return markdownToHTML(source);
    }
    if (outputFormat === "json") {
      if (inputFormat === "csv") return JSON.stringify(csvToObjects(source), null, 2);
      if (inputFormat === "html") return JSON.stringify({ content: stripHTML(source) }, null, 2);
      return JSON.stringify({ content: source }, null, 2);
    }
    if (outputFormat === "csv") {
      if (inputFormat === "json") return objectsToCSV(parsed);
      const text = inputFormat === "html" ? stripHTML(source) : source;
      return ["序号,内容", ...text.split(/\r?\n/).filter(Boolean).map((line, index) => `${index + 1},${escapeCSV(line)}`)].join("\n");
    }
    return source;
  }

  function bindConverter() {
    const fileInput = document.getElementById("file-input");
    const dropZone = document.getElementById("drop-zone");
    const sourceText = document.getElementById("source-text");
    const outputText = document.getElementById("output-text");
    const sourceFormat = document.getElementById("source-format");
    const sourceMeta = document.getElementById("source-meta");
    const outputMeta = document.getElementById("output-meta");
    const status = document.getElementById("converter-status");
    const downloadButton = document.getElementById("download-button");
    let outputFormat = "txt";
    let originalName = "congyu-document";

    function loadFile(file) {
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { showToast("文件超过 5 MB，暂不支持。"); return; }
      const extension = (file.name.split(".").pop() || "txt").toLowerCase().replace("markdown", "md").replace("htm", "html");
      if (!["txt", "md", "html", "json", "csv"].includes(extension)) { showToast("当前仅支持 TXT、MD、HTML、JSON 和 CSV。"); return; }
      const reader = new FileReader();
      reader.onload = () => {
        sourceText.value = String(reader.result || "").replace(/^\uFEFF/, "");
        sourceFormat.value = extension;
        originalName = file.name.replace(/\.[^.]+$/, "") || "congyu-document";
        sourceMeta.textContent = `${file.name} · ${(file.size / 1024).toFixed(1)} KB`;
        status.textContent = "文件已在本地读取，可以开始转换。";
        outputText.value = ""; downloadButton.disabled = true;
      };
      reader.onerror = () => showToast("无法读取这个文件。");
      reader.readAsText(file, "UTF-8");
    }

    fileInput.addEventListener("change", () => loadFile(fileInput.files[0]));
    ["dragenter", "dragover"].forEach((event) => dropZone.addEventListener(event, (e) => { e.preventDefault(); dropZone.classList.add("is-dragging"); }));
    ["dragleave", "drop"].forEach((event) => dropZone.addEventListener(event, (e) => { e.preventDefault(); dropZone.classList.remove("is-dragging"); }));
    dropZone.addEventListener("drop", (event) => loadFile(event.dataTransfer.files[0]));
    document.querySelectorAll(".format-option").forEach((button) => button.addEventListener("click", () => {
      document.querySelectorAll(".format-option").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active"); outputFormat = button.dataset.format;
    }));
    document.getElementById("convert-button").addEventListener("click", () => {
      if (!sourceText.value.trim()) { showToast("请先上传文件或输入内容。"); return; }
      try {
        const result = convertContent(sourceText.value, sourceFormat.value, outputFormat);
        outputText.value = result;
        outputMeta.textContent = `${result.length.toLocaleString()} 个字符 · ${outputFormat.toUpperCase()}`;
        status.textContent = `转换完成：${sourceFormat.value.toUpperCase()} → ${outputFormat.toUpperCase()}`;
        downloadButton.disabled = false;
        showToast("转换完成，可以下载文件。 ");
      } catch (error) {
        status.textContent = "转换失败，请检查输入内容是否符合所选格式。";
        showToast(error instanceof SyntaxError ? "JSON 格式有误，请检查括号和引号。" : "转换失败，请检查内容。");
      }
    });
    downloadButton.addEventListener("click", () => {
      const mime = { txt: "text/plain", md: "text/markdown", html: "text/html", json: "application/json", csv: "text/csv" }[outputFormat];
      const prefix = outputFormat === "csv" ? "\uFEFF" : "";
      const blob = new Blob([prefix + outputText.value], { type: `${mime};charset=utf-8` });
      const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `${originalName}.${outputFormat}`; link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    });
    document.getElementById("clear-converter").addEventListener("click", () => {
      sourceText.value = ""; outputText.value = ""; fileInput.value = ""; downloadButton.disabled = true;
      sourceMeta.textContent = "尚未选择文件"; outputMeta.textContent = "等待转换"; status.textContent = "所有转换都在当前浏览器中完成。";
    });
  }

  function loadOCRLibrary() {
    if (window.Tesseract) return Promise.resolve(window.Tesseract);
    if (ocrLibraryPromise) return ocrLibraryPromise;
    ocrLibraryPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@6/dist/tesseract.min.js";
      script.crossOrigin = "anonymous";
      script.onload = () => resolve(window.Tesseract);
      script.onerror = () => reject(new Error("OCR 组件加载失败，请检查网络连接后重试。"));
      document.head.appendChild(script);
    }).catch((error) => { ocrLibraryPromise = null; throw error; });
    return ocrLibraryPromise;
  }

  async function prepareOCRImage(file, enhance) {
    const bitmap = await createImageBitmap(file);
    const longestSide = Math.max(bitmap.width, bitmap.height);
    const upscale = longestSide < 1400 ? Math.min(2, 1400 / Math.max(1, longestSide)) : 1;
    const scale = Math.min(upscale, 2600 / Math.max(1, longestSide));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d", { willReadFrequently: enhance });
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    if (enhance) {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      for (let index = 0; index < pixels.length; index += 4) {
        const gray = pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114;
        const adjusted = Math.max(0, Math.min(255, (gray - 128) * 1.28 + 134));
        pixels[index] = adjusted;
        pixels[index + 1] = adjusted;
        pixels[index + 2] = adjusted;
      }
      context.putImageData(imageData, 0, 0);
    }
    return canvas;
  }

  function bindOCR() {
    if (ocrWorker) {
      const previousWorker = ocrWorker;
      ocrWorker = null;
      ocrWorkerLanguage = "";
      previousWorker.terminate().catch(() => {});
    }

    const fileInput = document.getElementById("ocr-file-input");
    const dropZone = document.getElementById("ocr-drop-zone");
    const preview = document.getElementById("ocr-preview");
    const previewImage = document.getElementById("ocr-preview-image");
    const fileMeta = document.getElementById("ocr-file-meta");
    const language = document.getElementById("ocr-language");
    const enhance = document.getElementById("ocr-enhance");
    const startButton = document.getElementById("ocr-start");
    const clearButton = document.getElementById("ocr-clear");
    const copyButton = document.getElementById("ocr-copy");
    const downloadButton = document.getElementById("ocr-download");
    const resultText = document.getElementById("ocr-result");
    const resultMeta = document.getElementById("ocr-result-meta");
    const status = document.getElementById("ocr-status");
    const confidence = document.getElementById("ocr-confidence");
    const charCount = document.getElementById("ocr-char-count");
    const elapsedTime = document.getElementById("ocr-time");
    let selectedFile = null;
    let previewUrl = "";
    let running = false;

    function updateProgress(progress, label) {
      const value = Math.max(0, Math.min(100, Math.round(progress)));
      document.getElementById("ocr-progress-label").textContent = label;
      document.getElementById("ocr-progress-value").textContent = `${value}%`;
      document.getElementById("ocr-progress-bar").style.setProperty("--progress", `${value}%`);
    }

    function clearResult() {
      resultText.value = "";
      resultMeta.textContent = "等待识别";
      confidence.textContent = "—";
      charCount.textContent = "—";
      elapsedTime.textContent = "—";
      copyButton.disabled = true;
      downloadButton.disabled = true;
      updateProgress(0, "准备就绪");
    }

    function setFile(file) {
      if (!file) return;
      const extensionOk = /\.(jpe?g|png|webp|bmp)$/i.test(file.name);
      if (!file.type.startsWith("image/") && !extensionOk) { showToast("请选择 JPG、PNG、WebP 或 BMP 图片。"); return; }
      if (file.size > 15 * 1024 * 1024) { showToast("图片超过 15 MB，请压缩后重试。"); return; }
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      selectedFile = file;
      previewUrl = URL.createObjectURL(file);
      previewImage.src = previewUrl;
      preview.classList.add("has-image");
      fileMeta.textContent = `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB`;
      previewImage.onload = () => {
        fileMeta.textContent = `${file.name} · ${previewImage.naturalWidth}×${previewImage.naturalHeight} · ${(file.size / 1024 / 1024).toFixed(2)} MB`;
      };
      startButton.disabled = false;
      clearResult();
      status.textContent = "图片已就绪。首次识别需要联网加载语言模型。";
    }

    async function getWorker(logger) {
      await loadOCRLibrary();
      if (ocrWorker && ocrWorkerLanguage === language.value) return ocrWorker;
      if (ocrWorker) await ocrWorker.terminate();
      const engineMode = window.Tesseract.OEM ? window.Tesseract.OEM.LSTM_ONLY : 1;
      ocrWorker = await window.Tesseract.createWorker(language.value, engineMode, { logger });
      ocrWorkerLanguage = language.value;
      return ocrWorker;
    }

    const statusLabels = {
      "loading tesseract core": "加载识别核心",
      "initializing tesseract": "初始化识别核心",
      "loading language traineddata": "加载语言模型",
      "initializing api": "初始化文字识别",
      "recognizing text": "正在识别文字"
    };

    fileInput.addEventListener("change", () => setFile(fileInput.files[0]));
    ["dragenter", "dragover"].forEach((eventName) => dropZone.addEventListener(eventName, (event) => { event.preventDefault(); dropZone.classList.add("is-dragging"); }));
    ["dragleave", "drop"].forEach((eventName) => dropZone.addEventListener(eventName, (event) => { event.preventDefault(); dropZone.classList.remove("is-dragging"); }));
    dropZone.addEventListener("drop", (event) => setFile(event.dataTransfer.files[0]));

    startButton.addEventListener("click", async () => {
      if (!selectedFile || running) return;
      running = true;
      startButton.disabled = true;
      clearButton.disabled = true;
      language.disabled = true;
      enhance.disabled = true;
      clearResult();
      const startedAt = performance.now();
      try {
        status.textContent = "正在准备图片……";
        updateProgress(3, "预处理图片");
        const canvas = await prepareOCRImage(selectedFile, enhance.checked);
        const worker = await getWorker((message) => {
          const label = statusLabels[message.status] || "准备识别";
          const progress = message.status === "recognizing text" ? 45 + (message.progress || 0) * 53 : 5 + (message.progress || 0) * 35;
          updateProgress(progress, label);
          status.textContent = `${label}，请保持页面开启。`;
        });
        updateProgress(45, "正在识别文字");
        const output = await worker.recognize(canvas);
        const text = (output.data.text || "")
          .replace(/[^\S\r\n]+/g, "")
          .replace(/\r\n?/g, "\n")
          .trim();
        resultText.value = text;
        const seconds = (performance.now() - startedAt) / 1000;
        const characters = text.replace(/\s/g, "").length;
        confidence.textContent = Number.isFinite(output.data.confidence) ? `${Math.round(output.data.confidence)}%` : "—";
        charCount.textContent = characters.toLocaleString();
        elapsedTime.textContent = `${seconds.toFixed(1)}s`;
        resultMeta.textContent = text ? `已提取 ${characters.toLocaleString()} 个字符` : "未识别到文字";
        copyButton.disabled = !text;
        downloadButton.disabled = !text;
        updateProgress(100, text ? "识别完成" : "未发现文字");
        status.textContent = text ? "识别完成。你可以修改、复制或下载结果。" : "没有识别到文字，请尝试更清晰的图片或关闭图像增强后重试。";
        showToast(text ? "文字提取完成。" : "没有识别到可用文字。");
      } catch (error) {
        console.error(error);
        updateProgress(0, "识别失败");
        status.textContent = error.message || "识别失败，请稍后重试。";
        showToast(error.message || "文字提取失败。");
      } finally {
        running = false;
        startButton.disabled = !selectedFile;
        clearButton.disabled = false;
        language.disabled = false;
        enhance.disabled = false;
      }
    });

    clearButton.addEventListener("click", () => {
      if (running) return;
      selectedFile = null;
      fileInput.value = "";
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = "";
      previewImage.removeAttribute("src");
      preview.classList.remove("has-image");
      fileMeta.textContent = "尚未选择图片";
      startButton.disabled = true;
      clearResult();
      status.textContent = "图片只在当前浏览器中处理，不会主动上传。";
    });

    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(resultText.value);
      } catch (_) {
        resultText.select();
        document.execCommand("copy");
      }
      showToast("识别文字已复制。");
    });

    downloadButton.addEventListener("click", () => {
      const blob = new Blob([resultText.value], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${(selectedFile?.name || "ocr-result").replace(/\.[^.]+$/, "")}-文字提取.txt`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    });
  }

  const ANALYSIS_METRICS = [
    { key: "repetition", label: "重复表达", description: "词组与相似句式复现", weight: "22%" },
    { key: "templates", label: "模板化表达", description: "常见套话与泛化句式", weight: "15%" },
    { key: "rhythm", label: "句子节奏", description: "句长是否过度接近", weight: "15%" },
    { key: "lexical", label: "词汇单一度", description: "滑动窗口中的词汇变化", weight: "14%" },
    { key: "paragraph", label: "段落对称", description: "自然段长度是否整齐", weight: "10%" },
    { key: "connectors", label: "结构连接词", description: "枚举与转折词的密度", weight: "9%" },
    { key: "punctuation", label: "标点节奏", description: "标点类型是否缺少变化", weight: "7%" },
    { key: "specificity", label: "细节缺失", description: "数字、引用与具体信息", weight: "8%" }
  ];

  const ANALYSIS_MODES = {
    general: { label: "普通文章", rhythm: [0.18, 0.60], paragraph: [0.14, 0.55], connectors: [7, 32], templates: [1.5, 14], lexical: [0.40, 0.70], detail: [1.5, 12] },
    academic: { label: "学术论文", rhythm: [0.12, 0.50], paragraph: [0.10, 0.46], connectors: [12, 46], templates: [3, 20], lexical: [0.34, 0.62], detail: [4, 18] },
    official: { label: "说明文 / 公文", rhythm: [0.10, 0.46], paragraph: [0.08, 0.42], connectors: [14, 54], templates: [4, 24], lexical: [0.32, 0.60], detail: [3, 15] }
  };

  const CONNECTOR_WORDS = ["首先", "其次", "再次", "此外", "最后", "综上所述", "总而言之", "值得注意的是", "与此同时", "因此", "然而", "一方面", "另一方面", "从而", "由此可见", "进一步而言", "换言之", "具体来说"];
  const TEMPLATE_PATTERNS = [
    /在(?:当今|当前).{0,10}(?:时代|背景|社会)/g,
    /随着.{0,14}(?:发展|进步|推进)/g,
    /(?:具有|有着).{0,8}(?:重要意义|重要作用|深远影响)/g,
    /(?:发挥着|起到了).{0,8}(?:重要|关键|积极)作用/g,
    /(?:我们可以看出|不难发现|由此可见|毋庸置疑)/g,
    /(?:本文将|本文旨在|下文将).{0,12}(?:分析|探讨|研究|阐述)/g,
    /(?:多维度|全方位|深层次|高质量发展|赋能|不可忽视)/g,
    /不仅.{0,24}而且/g
  ];

  function clampScore(value) { return Math.max(0, Math.min(100, value)); }
  function average(values) { return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length); }
  function coefficientVariation(values) {
    if (values.length < 2) return 0;
    const mean = average(values);
    const variance = average(values.map((value) => Math.pow(value - mean, 2)));
    return Math.sqrt(variance) / Math.max(1, mean);
  }
  function riskWhenLow(value, suspicious, natural) { return clampScore((natural - value) / Math.max(0.001, natural - suspicious) * 100); }
  function riskWhenHigh(value, natural, suspicious) { return clampScore((value - natural) / Math.max(0.001, suspicious - natural) * 100); }

  function textParts(text) {
    const cleaned = text.replace(/\r/g, "").trim();
    const normalized = cleaned.replace(/\s+/g, "").replace(/[“”‘’]/g, "");
    const sentences = cleaned.split(/[。！？!?；;\n]+/).map((item) => item.trim()).filter((item) => item.length > 3);
    const paragraphs = cleaned.split(/\n+/).map((item) => item.trim()).filter((item) => item.replace(/\s+/g, "").length > 12);
    return { cleaned, normalized, sentences, paragraphs: paragraphs.length ? paragraphs : [cleaned] };
  }

  function countTerms(text, words) {
    return words.reduce((sum, word) => {
      let count = 0;
      let index = text.indexOf(word);
      while (index !== -1) { count += 1; index = text.indexOf(word, index + word.length); }
      return sum + count;
    }, 0);
  }

  function countTemplates(text) {
    return TEMPLATE_PATTERNS.reduce((sum, pattern) => sum + (text.match(new RegExp(pattern.source, "g")) || []).length, 0);
  }

  function ngramDuplicateRatio(text, size = 5) {
    const grams = new Map();
    let total = 0;
    for (let index = 0; index <= text.length - size; index += 1) {
      const gram = text.slice(index, index + size);
      if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(gram)) continue;
      grams.set(gram, (grams.get(gram) || 0) + 1);
      total += 1;
    }
    const duplicates = [...grams.values()].reduce((sum, count) => sum + Math.max(0, count - 1), 0);
    return duplicates / Math.max(1, total);
  }

  function sentenceSimilarity(sentences) {
    const sets = sentences.slice(0, 45).map((sentence) => {
      const compact = sentence.replace(/\s+/g, "");
      const grams = new Set();
      for (let index = 0; index < compact.length - 1; index += 1) grams.add(compact.slice(index, index + 2));
      return grams;
    });
    let total = 0;
    let pairs = 0;
    for (let left = 0; left < sets.length; left += 1) {
      for (let right = left + 1; right < Math.min(sets.length, left + 9); right += 1) {
        const intersection = [...sets[left]].filter((gram) => sets[right].has(gram)).length;
        const union = new Set([...sets[left], ...sets[right]]).size;
        total += intersection / Math.max(1, union);
        pairs += 1;
      }
    }
    return total / Math.max(1, pairs);
  }

  function tokenize(text) {
    try {
      if (typeof Intl.Segmenter === "function") {
        const segmenter = new Intl.Segmenter("zh-CN", { granularity: "word" });
        return [...segmenter.segment(text.toLowerCase())].filter((item) => item.isWordLike).map((item) => item.segment);
      }
    } catch (_) { /* use the simple fallback below */ }
    return text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?|\d+(?:\.\d+)?|[\u4e00-\u9fa5]/g) || [];
  }

  function movingLexicalDiversity(tokens) {
    if (!tokens.length) return 0;
    const windowSize = Math.min(50, tokens.length);
    const step = Math.max(1, Math.floor(windowSize / 3));
    const ratios = [];
    for (let index = 0; index <= tokens.length - windowSize; index += step) ratios.push(new Set(tokens.slice(index, index + windowSize)).size / windowSize);
    if (!ratios.length) ratios.push(new Set(tokens).size / tokens.length);
    return average(ratios);
  }

  function punctuationEntropy(text) {
    const marks = text.match(/[，。；：！？、,.!?;:“”‘’（）()—…]/g) || [];
    if (marks.length < 8) return 0.42;
    const counts = new Map();
    marks.forEach((mark) => counts.set(mark, (counts.get(mark) || 0) + 1));
    if (counts.size < 2) return 0;
    const entropy = [...counts.values()].reduce((sum, count) => {
      const probability = count / marks.length;
      return sum - probability * Math.log(probability);
    }, 0);
    return entropy / Math.log(counts.size);
  }

  function detailSignalCount(text) {
    const patterns = [
      /\d+(?:[.,]\d+)?%?/g,
      /[一二三四五六七八九十百]+(?:年|月|日|周|届|级|次|项|页)/g,
      /《[^》]{2,30}》|“[^”]{2,40}”|\[[0-9]{1,4}\]/g,
      /(?:根据|数据显示|调查显示|研究发现|报告指出|来源于|例如|比如|具体而言)/g,
      /(?:元|亿元|万人|公里|小时|分钟|学分|平方米|个百分点)/g
    ];
    return patterns.reduce((sum, pattern) => sum + (text.match(new RegExp(pattern.source, "g")) || []).length, 0);
  }

  function segmentAnalysis(parts) {
    let segments = parts.paragraphs;
    if (segments.length < 2 && parts.sentences.length > 3) {
      segments = [];
      for (let index = 0; index < parts.sentences.length; index += 3) segments.push(parts.sentences.slice(index, index + 3).join("。") + "。");
    }
    return segments.slice(0, 12).map((text, index) => {
      const local = textParts(text);
      const templateCount = countTemplates(text);
      const connectorCount = countTerms(text, CONNECTOR_WORDS);
      const repeatRisk = riskWhenHigh(ngramDuplicateRatio(local.normalized), 0.02, 0.14);
      const cv = coefficientVariation(local.sentences.map((sentence) => sentence.replace(/\s+/g, "").length));
      const rhythmRisk = local.sentences.length > 2 ? riskWhenLow(cv, 0.16, 0.58) : 18;
      const details = detailSignalCount(text);
      const score = Math.round(clampScore(8 + templateCount * 18 + Math.min(28, connectorCount * 7) + repeatRisk * 0.26 + rhythmRisk * 0.18 + (local.normalized.length > 90 && details === 0 ? 12 : 0)));
      const reasons = [];
      if (templateCount) reasons.push(`${templateCount} 处模板表达`);
      if (connectorCount) reasons.push(`${connectorCount} 个结构连接词`);
      if (repeatRisk > 52) reasons.push("局部词组重复");
      if (rhythmRisk > 60 && local.sentences.length > 2) reasons.push("句长较整齐");
      if (!details && local.normalized.length > 90) reasons.push("具体细节较少");
      if (!reasons.length) reasons.push("未发现突出的表面模式");
      return { index: index + 1, text, score, reasons };
    });
  }

  function buildInsights(metrics) {
    const copy = {
      repetition: ["部分词组或句式多次复现。", "重复片段处于较低水平。"],
      templates: ["检测到多处常见模板表达。", "常见套话出现较少。"],
      rhythm: ["句子长度和节奏较为整齐。", "长短句变化比较明显。"],
      lexical: ["滑动窗口中的词汇变化偏少。", "词汇变化相对丰富。"],
      paragraph: ["段落长度呈现较强的对称性。", "自然段长度差异较自然。"],
      connectors: ["结构连接词使用相对集中。", "连接方式较为分散。"],
      punctuation: ["标点类型和节奏比较单一。", "标点使用具有一定变化。"],
      specificity: ["数字、引用或具体细节偏少。", "文本包含可核对的具体信息。"]
    };
    const ordered = ANALYSIS_METRICS.map((item) => ({ ...item, value: metrics[item.key] }));
    return {
      risk: ordered.slice().sort((a, b) => b.value - a.value).slice(0, 3).map((item) => ({ label: item.label, text: copy[item.key][0], value: item.value })),
      natural: ordered.slice().sort((a, b) => a.value - b.value).slice(0, 3).map((item) => ({ label: item.label, text: copy[item.key][1], value: item.value }))
    };
  }

  function analyzeWriting(text, modeKey = "general") {
    const mode = ANALYSIS_MODES[modeKey] || ANALYSIS_MODES.general;
    const parts = textParts(text);
    const chars = parts.normalized.length;
    const sentenceLengths = parts.sentences.map((sentence) => sentence.replace(/\s+/g, "").length);
    const paragraphLengths = parts.paragraphs.map((paragraph) => paragraph.replace(/\s+/g, "").length);
    const rhythm = riskWhenLow(coefficientVariation(sentenceLengths), mode.rhythm[0], mode.rhythm[1]);
    const paragraph = paragraphLengths.length >= 3 ? riskWhenLow(coefficientVariation(paragraphLengths), mode.paragraph[0], mode.paragraph[1]) : 28;
    const repetitionRatio = average([ngramDuplicateRatio(parts.normalized, 5), ngramDuplicateRatio(parts.normalized, 6)]);
    const repetition = riskWhenHigh(repetitionRatio, 0.018, 0.145) * 0.72 + riskWhenHigh(sentenceSimilarity(parts.sentences), 0.20, 0.58) * 0.28;
    const connectorDensity = countTerms(text, CONNECTOR_WORDS) * 1000 / Math.max(1, chars);
    const templateDensity = countTemplates(text) * 1000 / Math.max(1, chars);
    const connectors = riskWhenHigh(connectorDensity, mode.connectors[0], mode.connectors[1]);
    const templates = riskWhenHigh(templateDensity, mode.templates[0], mode.templates[1]);
    const lexical = riskWhenLow(movingLexicalDiversity(tokenize(text)), mode.lexical[0], mode.lexical[1]);
    const punctuation = riskWhenLow(punctuationEntropy(text), 0.30, 0.76);
    const detailDensity = detailSignalCount(text) * 1000 / Math.max(1, chars);
    const specificity = riskWhenLow(detailDensity, mode.detail[0], mode.detail[1]);
    const metrics = { repetition, templates, rhythm, lexical, paragraph, connectors, punctuation, specificity };
    Object.keys(metrics).forEach((key) => { metrics[key] = Math.round(clampScore(metrics[key])); });
    const weights = { repetition: 0.22, templates: 0.15, rhythm: 0.15, lexical: 0.14, paragraph: 0.10, connectors: 0.09, punctuation: 0.07, specificity: 0.08 };
    const baseScore = Object.keys(weights).reduce((sum, key) => sum + metrics[key] * weights[key], 0);
    const repetitionBoost = metrics.repetition > 60 ? (metrics.repetition - 60) * 0.38 : 0;
    const score = Math.round(clampScore(baseScore + repetitionBoost));
    const confidence = chars < 300 ? { key: "low", label: "低可信度", margin: 15 } : chars < 800 ? { key: "medium", label: "中等可信度", margin: 9 } : { key: "high", label: "较高可信度", margin: 6 };
    const label = score < 35 ? "AI 写作特征较低" : score < 60 ? "存在部分 AI 写作特征" : score < 78 ? "AI 写作特征较明显" : "AI 写作特征高度集中";
    const description = score < 35 ? "整体节奏和表达变化较自然，仍应结合写作过程判断。" : score < 60 ? "部分指标偏高，请查看下方原因和段落定位。" : score < 78 ? "多项模式同时出现，建议优先人工复核高分段落。" : "规则化与重复信号较集中，但结果仍不能证明文本来源。";
    return { score, range: [Math.max(0, score - confidence.margin), Math.min(100, score + confidence.margin)], label, description, confidence, mode: mode.label, metrics, chars, sentences: parts.sentences.length, paragraphs: parts.paragraphs.length, segments: segmentAnalysis(parts), insights: buildInsights(metrics) };
  }

  function bindAIChecker() {
    const textarea = document.getElementById("checker-text");
    const mode = document.getElementById("checker-mode");
    const count = document.getElementById("checker-count");
    const status = document.getElementById("checker-status");
    const details = document.getElementById("analysis-details");

    function resetResult() {
      document.getElementById("score-value").textContent = "—";
      document.getElementById("score-label").textContent = "等待分析";
      document.getElementById("score-description").textContent = "结果将显示为风险区间，并说明影响分数的具体原因。";
      document.getElementById("score-range").textContent = "—";
      document.getElementById("score-ring").style.setProperty("--score", 0);
      ["stat-chars", "stat-sentences", "stat-paragraphs"].forEach((id) => { document.getElementById(id).textContent = "—"; });
      const badge = document.getElementById("confidence-badge");
      badge.className = "confidence-badge is-empty";
      badge.textContent = "等待样本";
      details.hidden = true;
      document.getElementById("metric-grid").innerHTML = "";
      status.textContent = "文本不会离开当前页面。";
    }

    function renderAnalysis(result) {
      document.getElementById("score-value").textContent = result.score;
      document.getElementById("score-label").textContent = result.label;
      document.getElementById("score-description").textContent = result.description;
      document.getElementById("score-range").textContent = `${result.range[0]}—${result.range[1]}`;
      document.getElementById("stat-chars").textContent = result.chars.toLocaleString();
      document.getElementById("stat-sentences").textContent = result.sentences;
      document.getElementById("stat-paragraphs").textContent = result.paragraphs;
      const badge = document.getElementById("confidence-badge");
      badge.className = `confidence-badge is-${result.confidence.key}`;
      badge.textContent = result.confidence.label;
      const tone = result.score < 35 ? "var(--green)" : result.score < 60 ? "var(--orange)" : "var(--coral)";
      const ring = document.getElementById("score-ring");
      ring.style.setProperty("--score", result.score);
      ring.style.background = `conic-gradient(${tone} ${result.score}%, var(--paper-2) 0)`;
      document.getElementById("metric-grid").innerHTML = ANALYSIS_METRICS.map((item, index) => {
        const value = result.metrics[item.key];
        const level = value < 35 ? "low" : value < 65 ? "medium" : "high";
        return `<article class="metric-card-v2 is-${level}"><div><span>0${index + 1} · ${item.weight}</span><b>${value}</b></div><h4>${item.label}</h4><p>${item.description}</p><div class="metric-bar"><i style="--value:${value}%"></i></div></article>`;
      }).join("");
      const reasonList = (items) => items.map((item) => `<li><b>${escapeHTML(item.label)} · ${item.value}</b><span>${escapeHTML(item.text)}</span></li>`).join("");
      document.getElementById("risk-reasons").innerHTML = reasonList(result.insights.risk);
      document.getElementById("natural-reasons").innerHTML = reasonList(result.insights.natural);
      document.getElementById("segment-list").innerHTML = result.segments.map((segment) => {
        const level = segment.score < 38 ? "low" : segment.score < 68 ? "medium" : "high";
        const excerpt = segment.text.length > 260 ? `${segment.text.slice(0, 260)}……` : segment.text;
        return `<article class="segment-card is-${level}" style="--segment-risk:${segment.score}%"><header><span>段落 ${String(segment.index).padStart(2, "0")}</span><b>${segment.score}</b></header><p>${escapeHTML(excerpt)}</p><div>${segment.reasons.map((reason) => `<span>${escapeHTML(reason)}</span>`).join("")}</div></article>`;
      }).join("");
      details.hidden = false;
      status.textContent = `已按“${result.mode}”分析 ${result.chars.toLocaleString()} 字；${result.confidence.label}，结果仅供辅助复核。`;
    }

    textarea.addEventListener("input", () => {
      const chars = textarea.value.replace(/\s/g, "").length;
      count.textContent = `${chars.toLocaleString()} 字`;
      if (!details.hidden) status.textContent = "文本内容已改变，请重新分析。";
      else if (chars > 0 && chars < 200) status.textContent = `还需要至少 ${200 - chars} 字才能分析。`;
      else if (chars >= 200 && chars < 300) status.textContent = "可以分析；达到 300 字后结果会更稳定。";
      else if (chars >= 300) status.textContent = "样本长度已达到建议值，可以开始分析。";
      else status.textContent = "文本不会离开当前页面。";
    });
    mode.addEventListener("change", () => { if (!details.hidden) status.textContent = "文本类型已改变，请重新分析。"; });
    document.getElementById("sample-button").addEventListener("click", () => {
      textarea.value = "在数字化学习逐渐成为日常的今天，信息整理显得格外重要。首先，我们每天都会接触大量网页、课程资料和文档。其次，如果缺少清晰的分类，这些内容很快就会再次消失在浏览记录里。因此，建立清晰的信息管理体系具有重要意义。\n\n与此同时，个人网站能够发挥重要作用。它不仅可以保存常用入口，而且可以记录不断变化的学习安排。通过多维度的信息整合，我们可以看出，个人网站能够有效提升学习效率，赋能个人成长。\n\n然而，整理并不意味着保存一切。2026 年 7 月，我尝试把一周内打开的 63 个网页分成课程、工具和阅读三类，最终只留下了 21 个真正会再次使用的入口。我还为其中 8 个课程网站写了简短备注，并在两周后检查自己是否真的再次访问。这次整理让我意识到，具体的取舍比一套看似完整的分类规则更重要，也说明记录真实使用情况比追求漂亮的分类数量更有价值。";
      textarea.dispatchEvent(new Event("input"));
    });
    document.getElementById("clear-checker").addEventListener("click", () => { textarea.value = ""; textarea.dispatchEvent(new Event("input")); resetResult(); });
    document.getElementById("analyze-button").addEventListener("click", () => {
      const chars = textarea.value.replace(/\s/g, "").length;
      if (chars < 200) { showToast("文本过短，请至少输入 200 个有效字符。"); return; }
      renderAnalysis(analyzeWriting(textarea.value, mode.value));
      showToast("分析完成：请结合分项指标和原始写作过程判断。");
    });
  }

  function categoryCount(category) {
    return DATA.bookmarks.filter((item) => item.category === category).length;
  }

  function bookmarkResults() {
    const query = navState.query.trim().toLowerCase();
    return DATA.bookmarks.filter((item) => {
      const categoryMatch = navState.category === "全部" || item.category === navState.category;
      const queryMatch = !query || `${item.title} ${item.description} ${item.category} ${item.tag}`.toLowerCase().includes(query);
      return categoryMatch && queryMatch;
    });
  }

  function bookmarkCards(items) {
    if (!items.length) return '<div class="empty-state"><div><strong>没有找到匹配的网页</strong><span>换一个关键词或分类试试。</span></div></div>';
    return `<div class="bookmark-grid ${navState.view === "list" ? "is-list" : ""}">${items.map((item) => {
      const categoryIndex = Math.max(0, DATA.categories.indexOf(item.category));
      const tone = TONES[categoryIndex % TONES.length];
      return `<a class="bookmark-card" style="--accent:${tone.accent}" href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer"><div class="bookmark-head"><span class="bookmark-icon">${escapeHTML(item.title.slice(0, 1).toUpperCase())}</span><span>${escapeHTML(item.category)} · ${escapeHTML(item.tag)}</span></div><div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p></div><div class="bookmark-foot"><span>${escapeHTML(new URL(item.url).hostname.replace(/^www\./, ""))}</span><b>打开 ↗</b></div></a>`;
    }).join("")}</div>`;
  }

  function updateBookmarkArea() {
    const items = bookmarkResults();
    document.getElementById("bookmark-count").textContent = `显示 ${items.length} / ${DATA.bookmarks.length} 个网页`;
    document.getElementById("bookmark-results").innerHTML = bookmarkCards(items);
    document.querySelectorAll(".category-button").forEach((button) => button.classList.toggle("is-active", button.dataset.category === navState.category));
  }

  function renderNavigation(query) {
    const requested = query.get("category");
    if (requested && (requested === "全部" || DATA.categories.includes(requested))) navState.category = requested;
    app.innerHTML = `
      ${pageHero("常用网页导航", "把常用网页", "放回各自的位置。", "从资源库、官网、AI 到图片视频与安装工具，按分类筛选或直接搜索，点击后在新标签页打开。")}
      <section class="section">
        <div class="page-shell">
          <div class="library-controls">
            <label class="search-field">${icon("search")}<input class="text-input" id="bookmark-search" type="search" placeholder="搜索名称、用途、分类或标签……" value="${escapeHTML(navState.query)}"></label>
            <div class="view-toggle" aria-label="切换导航视图"><button type="button" data-view="grid" class="${navState.view === "grid" ? "is-active" : ""}">网格</button><button type="button" data-view="list" class="${navState.view === "list" ? "is-active" : ""}">列表</button></div>
          </div>
          <div class="library-layout">
            <aside class="category-sidebar" aria-label="网页分类">
              <button class="category-button ${navState.category === "全部" ? "is-active" : ""}" type="button" data-category="全部"><b>全</b><span>全部网页</span><span>${DATA.bookmarks.length}</span></button>
              ${DATA.categories.map((category, index) => `<button class="category-button ${navState.category === category ? "is-active" : ""}" type="button" data-category="${escapeHTML(category)}"><b style="background:${TONES[index % TONES.length].bg};color:${TONES[index % TONES.length].accent}">${escapeHTML(category.slice(0, 1))}</b><span>${escapeHTML(category)}</span><span>${categoryCount(category)}</span></button>`).join("")}
            </aside>
            <div class="bookmark-area"><div class="bookmark-meta"><span id="bookmark-count"></span><span>按个人书签分类整理</span></div><div id="bookmark-results"></div></div>
          </div>
        </div>
      </section>`;
    document.getElementById("bookmark-search").addEventListener("input", (event) => { navState.query = event.target.value; updateBookmarkArea(); });
    document.querySelectorAll(".category-button").forEach((button) => button.addEventListener("click", () => { navState.category = button.dataset.category; updateBookmarkArea(); }));
    document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
      navState.view = button.dataset.view; document.querySelectorAll("[data-view]").forEach((item) => item.classList.toggle("is-active", item === button)); updateBookmarkArea();
    }));
    updateBookmarkArea();
  }

  function meetingLocation(meeting) {
    return [meeting.campus, meeting.building, meeting.room].filter(Boolean).join(" · ");
  }

  function courseInfoGrid(course) {
    const items = [
      ["课程号", course.code], ["课序号", course.section], ["学分", course.credits], ["教师", course.teacher],
      ["课程属性", course.property], ["课程类别", course.category], ["考试类型", course.exam], ["选课状态", course.status]
    ];
    return `<div class="course-info-grid">${items.map(([label, value]) => `<div><strong>${label}</strong><span>${escapeHTML(value)}</span></div>`).join("")}</div>`;
  }

  function meetingRows(course) {
    return `<div class="meeting-list">${course.meetings.map((meeting) => `<div class="meeting-row"><span>${escapeHTML(meeting.weeks)}</span><span>${DAY_SHORT[meeting.day - 1]}</span><span>${meeting.start}–${meeting.end}节</span><span>${escapeHTML(meetingLocation(meeting))}</span></div>`).join("")}</div>`;
  }

  function assignMeetingLanes(courses) {
    const items = courses.flatMap((course) => course.meetings.map((meeting) => ({ course, meeting, lane: 0, lanes: 1 })));
    for (let day = 1; day <= 7; day += 1) {
      const dayItems = items.filter((item) => item.meeting.day === day).sort((a, b) => a.meeting.start - b.meeting.start || a.meeting.end - b.meeting.end);
      const laneEnds = [];
      dayItems.forEach((item) => {
        let lane = laneEnds.findIndex((end) => end < item.meeting.start);
        if (lane < 0) lane = laneEnds.length;
        laneEnds[lane] = item.meeting.end; item.lane = lane;
      });
      dayItems.forEach((item) => {
        const overlapping = dayItems.filter((other) => other.meeting.start <= item.meeting.end && other.meeting.end >= item.meeting.start);
        item.lanes = Math.max(1, ...overlapping.map((other) => other.lane + 1));
      });
    }
    return items;
  }

  function renderTimetable(semester) {
    const headers = `<div class="tt-corner" style="grid-column:1;grid-row:1">节次 / 时间</div>${DAYS.map((day, index) => `<div class="tt-day" style="grid-column:${index + 2};grid-row:1"><span>${day}</span><small>${index < 5 ? "工作日" : "周末"}</small></div>`).join("")}`;
    const times = DATA.periods.map((period) => `<div class="tt-time" style="grid-column:1;grid-row:${period.n + 1}"><div><b>第${period.n}节</b><small>${period.time}</small></div></div>`).join("");
    const slots = DATA.periods.flatMap((period) => DAYS.map((_, index) => `<div class="tt-slot ${period.group}" style="grid-column:${index + 2};grid-row:${period.n + 1}"></div>`)).join("");
    const blocks = assignMeetingLanes(semester.courses).map(({ course, meeting, lane, lanes }) => {
      const tone = TONES[course.tone % TONES.length];
      const width = lanes > 1 ? `width:calc((100% - 4px)/${lanes});transform:translateX(${lane * 100}%);justify-self:start;` : "";
      return `<button class="course-block" type="button" data-course-id="${escapeHTML(course.id)}" style="grid-column:${meeting.day + 1};grid-row:${meeting.start + 1}/span ${meeting.end - meeting.start + 1};--course-accent:${tone.accent};--course-bg:${tone.bg};${width}" aria-label="查看课程：${escapeHTML(course.name)}"><strong>${escapeHTML(course.name)}</strong><span>${escapeHTML(course.teacher)}</span><span>${escapeHTML(meeting.weeks)}</span><small>${escapeHTML(meeting.room)}</small></button>`;
    }).join("");
    return `<div class="timetable-wrap"><div class="timetable">${headers}${times}${slots}${blocks}</div></div>`;
  }

  function renderCourseList(semester) {
    return `<div class="course-list"><div class="course-list-heading"><div><span class="section-kicker">课程信息</span><h2>本学期全部课程</h2></div><span>点击课程名称展开详细信息</span></div>${semester.courses.map((course) => {
      const tone = TONES[course.tone % TONES.length];
      return `<details class="course-detail"><summary><i class="course-color" style="--course-accent:${tone.accent}"></i><div class="course-summary-main"><strong>${escapeHTML(course.name)}</strong><span>${escapeHTML(course.code)} · ${escapeHTML(course.teacher)} · ${course.meetings.length} 个上课安排</span></div><div class="course-summary-badges"><span>${course.credits} 学分</span><span>${escapeHTML(course.category)}</span></div></summary><div class="course-detail-body">${courseInfoGrid(course)}${meetingRows(course)}</div></details>`;
    }).join("")}</div>`;
  }

  function openCourseDialog(course) {
    const tone = TONES[course.tone % TONES.length];
    courseDialogContent.innerHTML = `<div class="dialog-course-head" style="border-top:6px solid ${tone.accent}"><small>${escapeHTML(course.code)} · ${escapeHTML(course.category)}</small><h2 id="course-dialog-title">${escapeHTML(course.name)}</h2><p>${escapeHTML(course.teacher)} · ${course.credits} 学分 · ${escapeHTML(course.property)}</p></div><div class="dialog-course-body">${courseInfoGrid(course)}${meetingRows(course)}</div>`;
    if (!courseDialog.open) courseDialog.showModal();
  }

  function renderSchedule(query) {
    const requested = query.get("semester");
    const semester = DATA.semesters.find((item) => item.id === requested) || DATA.semesters[DATA.semesters.length - 1];
    app.innerHTML = `
      ${pageHero("各学期课表", "一周安排，", "课程详情。", "切换学期查看星期一至星期日的课程分布。点击彩色课程块可以快速查看，向下展开则能浏览完整课程信息。")}
      <section class="section">
        <div class="page-shell">
          <div class="schedule-toolbar">
            <div class="semester-select-wrap"><label for="semester-select">选择学期</label><select class="select" id="semester-select">${DATA.semesters.map((item) => `<option value="${escapeHTML(item.id)}" ${item.id === semester.id ? "selected" : ""}>${escapeHTML(item.name)}</option>`).join("")}</select></div>
            <div class="semester-summary"><span>${semester.courses.length} 门课程</span><span>${semester.credits} 学分</span><span>${escapeHTML(semester.program)}</span></div>
          </div>
          ${renderTimetable(semester)}
          ${renderCourseList(semester)}
        </div>
      </section>`;
    document.getElementById("semester-select").addEventListener("change", (event) => { location.hash = `/schedule?semester=${encodeURIComponent(event.target.value)}`; });
    document.querySelectorAll(".course-block").forEach((button) => button.addEventListener("click", () => {
      const course = semester.courses.find((item) => item.id === button.dataset.courseId); if (course) openCourseDialog(course);
    }));
  }

  function render() {
    const { path, query } = currentLocation();
    setActiveNav(path);
    nav.classList.remove("is-open"); menuButton.setAttribute("aria-expanded", "false");
    if (path === "/") { document.title = "丛鱼的家"; renderHome(); }
    else if (path === "/about") { document.title = "个人简介 · 丛鱼的家"; renderAbout(); }
    else if (path === "/tools" || path.startsWith("/tools/")) { document.title = "工具 · 丛鱼的家"; renderTools(path); }
    else if (path === "/navigation") { document.title = "网页导航 · 丛鱼的家"; renderNavigation(query); }
    else if (path === "/schedule") { document.title = "学期课表 · 丛鱼的家"; renderSchedule(query); }
    else { location.hash = "/"; return; }
    bindMotionCollages();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function initTheme() {
    let saved = "";
    try { saved = localStorage.getItem("congyu-theme") || ""; } catch (_) { /* local storage may be disabled */ }
    if (saved === "dark" || saved === "light") document.documentElement.dataset.theme = saved;
    themeButton.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("congyu-theme", next); } catch (_) { /* ignore */ }
    });
  }

  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open"); menuButton.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", () => { nav.classList.remove("is-open"); menuButton.setAttribute("aria-expanded", "false"); });
  courseDialog.querySelector(".dialog-close").addEventListener("click", () => courseDialog.close());
  courseDialog.addEventListener("click", (event) => { if (event.target === courseDialog) courseDialog.close(); });
  window.addEventListener("hashchange", render);
  document.getElementById("footer-year").textContent = `© ${new Date().getFullYear()} 丛鱼`;
  initTheme();
  render();
})();
