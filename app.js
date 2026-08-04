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

  function initSharkWidgets() {
    document.querySelectorAll("[data-shark-widget]").forEach((widget) => {
      const water = widget.querySelector("[data-shark-water]");
      const sprite = widget.querySelector("[data-shark-sprite]");
      const layer = widget.querySelector("[data-bubble-layer]");
      const depth = widget.querySelector("[data-shark-depth]");
      const hint = widget.querySelector("[data-shark-hint]");
      const feed = widget.querySelector("[data-shark-feed]");
      let lastX = 56;
      let lastY = 51;

      function releaseBubbles(x = lastX, y = lastY, count = 8) {
        for (let index = 0; index < count; index += 1) {
          const bubble = document.createElement("i");
          const size = 4 + Math.random() * 9;
          bubble.className = "water-bubble";
          bubble.style.left = `${Math.max(4, Math.min(96, x + (Math.random() - 0.5) * 13))}%`;
          bubble.style.top = `${Math.max(20, Math.min(92, y + (Math.random() - 0.5) * 10))}%`;
          bubble.style.setProperty("--bubble-size", `${size}px`);
          bubble.style.setProperty("--bubble-drift", `${(Math.random() - 0.5) * 48}px`);
          bubble.style.animationDelay = `${Math.random() * 0.16}s`;
          layer.appendChild(bubble);
          bubble.addEventListener("animationend", () => bubble.remove(), { once: true });
        }
      }

      function guideShark(event) {
        const rect = water.getBoundingClientRect();
        const x = Math.max(18, Math.min(82, ((event.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(24, Math.min(76, ((event.clientY - rect.top) / rect.height) * 100));
        const direction = x < lastX ? -1 : 1;
        const angle = Math.max(-12, Math.min(12, (y - lastY) * 0.55));
        sprite.style.setProperty("--shark-x", `${x}%`);
        sprite.style.setProperty("--shark-y", `${y}%`);
        sprite.style.setProperty("--shark-flip", String(direction));
        sprite.style.setProperty("--shark-angle", `${direction < 0 ? -angle : angle}deg`);
        depth.textContent = `深度 ${String(Math.round(3 + y / 6)).padStart(2, "0")}m`;
        lastX = x;
        lastY = y;
      }

      water.addEventListener("pointermove", guideShark);
      water.addEventListener("pointerdown", (event) => {
        guideShark(event);
        releaseBubbles(lastX, lastY, 7);
        widget.classList.add("is-excited");
        setTimeout(() => widget.classList.remove("is-excited"), 620);
      });
      water.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          releaseBubbles(56, 58, 10);
        }
      });
      feed.addEventListener("click", () => {
        releaseBubbles(lastX, lastY, 13);
        widget.classList.add("is-excited");
        hint.textContent = "鲨鱼收到啦！";
        setTimeout(() => {
          widget.classList.remove("is-excited");
          hint.textContent = "移动指针，引导鲨鱼";
        }, 1100);
      });
    });
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

  function sharkGraphic() {
    return '<img class="shark-art shark-photo" src="./assets/shark.png" alt="" aria-hidden="true" />';
  }

  function sharkWidget(label, compact = false) {
    return `
      <aside class="shark-widget ${compact ? "is-compact" : ""}" data-shark-widget aria-label="${escapeHTML(label)}">
        <div class="shark-widget-head"><span><i></i> CONGYU BAY</span><b data-shark-depth>深度 08m</b></div>
        <div class="shark-water" data-shark-water role="button" tabindex="0" aria-label="移动指针引导鲨鱼，点击水面产生气泡">
          <div class="current-lines" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="bubble-layer" data-bubble-layer aria-hidden="true"></div>
          <div class="shark-sprite" data-shark-sprite>${sharkGraphic()}</div>
          <span class="water-label">POINTER CURRENT</span>
        </div>
        <div class="shark-widget-foot"><span data-shark-hint>移动指针，引导鲨鱼</span><button class="shark-feed" data-shark-feed type="button">投喂 +</button></div>
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
            ${sharkWidget("首页互动鲨鱼水域")}
          </div>
          <div class="hero-stats">
            <div class="stat"><strong>${bookmarkCount}</strong><span>常用网页</span><small>分门别类，点击即达</small></div>
            <div class="stat"><strong>${categoryCount}</strong><span>导航分类</span><small>支持筛选与关键词搜索</small></div>
            <div class="stat"><strong>${DATA.semesters.length}</strong><span>学期课表</span><small>课表与课程详情联动</small></div>
            <div class="stat"><strong>2</strong><span>本地工具</span><small>文档转换 · 写作特征分析</small></div>
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
            <a class="quick-card" href="#/tools"><span class="number">02 · TOOLS</span><span class="icon-tile tone-blue">${icon("tools")}</span><h3>实用工具</h3><p>在浏览器里转换文档、分析文章的模式化写作特征。</p><span class="card-link">打开工具箱 →</span></a>
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
          <div class="check-card"><strong>当前已经包括</strong><span><i>✓</i>固定且响应式的顶部导航</span><span><i>✓</i>三学期彩色课表与完整详情</span><span><i>✓</i>可筛选、搜索的网页分类</span><span><i>✓</i>两项浏览器端工具</span><span><i>✓</i>适配 GitHub Pages 的静态结构</span></div>
        </div>
      </section>`;
  }

  function renderAbout() {
    const p = DATA.profile;
    app.innerHTML = `
      ${pageHero("关于这个空间", "这里是", "丛鱼的家", "一个用于收纳学习、工具、网页和课表的个人空间。它保持简单，也给未来的内容留出足够的位置。", '<a class="button primary" href="#about-content">开始认识 →</a><a class="button" href="#/navigation">看看常用网页</a>', true, sharkWidget("个人简介互动鲨鱼水域", true))}
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
        <a class="tool-nav-button ${active === "ai-check" ? "is-active" : ""}" href="#/tools/ai-check">${icon("scan")} AI 写作特征</a>
        <div class="sidebar-note">文档转换和文本分析默认在当前浏览器中运行，不会主动上传你的内容。</div>
      </aside>`;
  }

  function renderToolsOverview() {
    app.innerHTML = `
      ${pageHero("浏览器端工具", "处理文档，", "检查写作特征。", "两项工具都优先在本地浏览器中运行。第一版专注于常见文本格式和透明、可解释的写作特征分析。")}
      <section class="section">
        <div class="page-shell">
          <div class="section-heading"><div><span class="section-kicker">选择工具</span><h2>现在要处理什么？</h2><p>不需要账号。打开工具、放入内容、查看结果，需要时再下载。</p></div></div>
          <div class="tool-switcher">
            <a class="tool-choice" href="#/tools/converter"><span class="skill-icon tone-blue">${icon("file")}</span><div><h3>文档转换工具</h3><p>在 TXT、Markdown、HTML、JSON 和 CSV 之间转换，文件默认留在本机。</p></div><b>→</b></a>
            <a class="tool-choice" href="#/tools/ai-check"><span class="skill-icon tone-coral">${icon("scan")}</span><div><h3>AI 写作特征分析</h3><p>从句长、重复、连接词和模板表达等角度检查文章的模式化程度。</p></div><b>→</b></a>
          </div>
        </div>
      </section>
      <section class="section alt"><div class="page-shell"><div class="section-heading"><div><span class="section-kicker">能力边界</span><h2>清楚说明能做什么。</h2><p>纯前端暂不承诺 Word、PPT、Excel 与 PDF 的高保真任意互转；写作分析也不是权威的 AI 来源鉴定。页面会把这些限制直接告诉使用者。</p></div></div></div></section>`;
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

  function renderAIChecker() {
    app.innerHTML = `
      ${pageHero("工具 · 写作分析", "检查文章中的", "模式化写作特征。", "从句长变化、重复表达、连接词密度和模板句式等可解释指标出发，帮助人工复核文本。结果不是权威的 AI 来源鉴定。")}
      <section class="section">
        <div class="page-shell tool-workspace">
          ${toolNav("ai-check")}
          <div class="workspace-card">
            <div class="workspace-heading"><div><h2>AI 写作特征分析</h2><p>粘贴至少 120 个汉字，获得模式化特征指数和分项提示。</p></div><span class="local-badge">● 本地分析</span></div>
            <div class="checker-layout">
              <div class="input-card"><div class="input-card-head"><strong>待分析文章</strong><span id="checker-count">0 字</span></div><textarea class="text-area large" id="checker-text" placeholder="请粘贴需要分析的中文文章……"></textarea><div class="button-row"><button class="button primary" id="analyze-button" type="button">开始分析</button><button class="button" id="sample-button" type="button">载入示例</button><button class="button ghost" id="clear-checker" type="button">清空</button></div></div>
              <div class="score-panel">
                <div class="score-ring" id="score-ring" style="--score:0"><div><strong id="score-value">—</strong><span>模式化特征指数</span></div></div>
                <div class="score-caption"><strong id="score-label">等待分析</strong><span id="score-description">结果会从多个文本指标综合得出。</span></div>
                ${[["句长均匀度", "metric-uniform"], ["重复表达", "metric-repeat"], ["连接词密度", "metric-connect"], ["模板化表达", "metric-template"]].map(([label, id]) => `<div class="metric-row"><div><span>${label}</span><b id="${id}-value">—</b></div><div class="metric-bar"><i id="${id}-bar" style="--value:0%"></i></div></div>`).join("")}
                <p class="disclaimer">重要：这个工具只分析文本表面特征，不能证明文章由 AI 或人类创作。请结合写作过程、引用和人工判断使用。</p>
              </div>
            </div>
            <div class="tool-status"><span id="checker-status">文本不会离开当前页面。</span><span>仅供参考</span></div>
          </div>
        </div>
      </section>`;
    bindAIChecker();
  }

  function renderTools(path) {
    if (path === "/tools/converter") renderConverter();
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

  function analyzeWriting(text) {
    const normalized = text.replace(/\s+/g, "").replace(/[“”‘’]/g, "");
    const sentences = text.split(/[。！？!?；;\n]+/).map((item) => item.trim()).filter((item) => item.length > 3);
    const lengths = sentences.map((item) => item.replace(/\s+/g, "").length);
    const mean = lengths.reduce((a, b) => a + b, 0) / Math.max(1, lengths.length);
    const variance = lengths.reduce((sum, length) => sum + Math.pow(length - mean, 2), 0) / Math.max(1, lengths.length);
    const cv = Math.sqrt(variance) / Math.max(1, mean);
    const uniform = Math.round(Math.max(0, Math.min(100, 94 - cv * 125)));

    const grams = new Map();
    for (let i = 0; i <= normalized.length - 5; i += 1) {
      const gram = normalized.slice(i, i + 5);
      if (/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(gram)) grams.set(gram, (grams.get(gram) || 0) + 1);
    }
    const repeated = [...grams.values()].filter((count) => count > 1).reduce((sum, count) => sum + count - 1, 0);
    const repeat = Math.round(Math.min(100, repeated / Math.max(1, normalized.length / 45) * 38));

    const connectors = ["首先", "其次", "再次", "此外", "最后", "综上所述", "总而言之", "值得注意的是", "与此同时", "因此", "然而", "一方面", "另一方面", "从而", "由此可见"];
    const connectorCount = connectors.reduce((sum, word) => sum + (text.match(new RegExp(word, "g")) || []).length, 0);
    const connect = Math.round(Math.min(100, connectorCount / Math.max(1, normalized.length / 300) * 24));

    const templates = ["在当今", "随着.*发展", "不可忽视", "具有重要意义", "发挥着重要作用", "我们可以看出", "毋庸置疑", "不难发现", "本文将", "深入探讨", "多维度", "赋能"];
    const templateCount = templates.reduce((sum, pattern) => sum + (text.match(new RegExp(pattern, "g")) || []).length, 0);
    const template = Math.round(Math.min(100, templateCount / Math.max(1, normalized.length / 420) * 32));

    const score = Math.round(uniform * 0.38 + repeat * 0.25 + connect * 0.19 + template * 0.18);
    return { score, uniform, repeat, connect, template, sentences: sentences.length, chars: normalized.length };
  }

  function bindAIChecker() {
    const textarea = document.getElementById("checker-text");
    const count = document.getElementById("checker-count");
    const status = document.getElementById("checker-status");
    textarea.addEventListener("input", () => { count.textContent = `${textarea.value.replace(/\s/g, "").length.toLocaleString()} 字`; });
    document.getElementById("sample-button").addEventListener("click", () => {
      textarea.value = "在数字化学习逐渐成为日常的今天，信息整理显得格外重要。首先，我们每天都会接触大量网页、课程资料和文档。其次，如果缺少清晰的分类，这些内容很快就会再次消失在浏览记录里。然而，整理并不意味着保存一切，而是判断哪些内容值得留下、应该放在哪里，以及未来怎样再次找到它。对我而言，个人网站正是这样一个空间：它既保存常用入口，也记录不断变化的学习安排。";
      textarea.dispatchEvent(new Event("input"));
    });
    document.getElementById("clear-checker").addEventListener("click", () => {
      textarea.value = ""; textarea.dispatchEvent(new Event("input"));
      document.getElementById("score-value").textContent = "—"; document.getElementById("score-label").textContent = "等待分析";
      document.getElementById("score-description").textContent = "结果会从多个文本指标综合得出。"; document.getElementById("score-ring").style.setProperty("--score", 0);
      ["uniform", "repeat", "connect", "template"].forEach((key) => { document.getElementById(`metric-${key}-value`).textContent = "—"; document.getElementById(`metric-${key}-bar`).style.setProperty("--value", "0%"); });
      status.textContent = "文本不会离开当前页面。";
    });
    document.getElementById("analyze-button").addEventListener("click", () => {
      const chars = textarea.value.replace(/\s/g, "").length;
      if (chars < 120) { showToast("文本过短，请至少输入 120 个汉字。 "); return; }
      const result = analyzeWriting(textarea.value);
      const label = result.score < 38 ? "模式化特征较低" : result.score < 65 ? "存在一些模式化特征" : "模式化特征较明显";
      const desc = result.score < 38 ? "句式和表达变化相对自然，仍建议结合写作过程判断。" : result.score < 65 ? "部分表达较规则，可以重点复核高分指标。" : "句式、重复或模板表达较集中，建议进行人工复核。";
      document.getElementById("score-value").textContent = result.score;
      document.getElementById("score-label").textContent = label;
      document.getElementById("score-description").textContent = desc;
      const ring = document.getElementById("score-ring"); ring.style.setProperty("--score", result.score); ring.style.background = `conic-gradient(${result.score < 38 ? "var(--green)" : result.score < 65 ? "var(--orange)" : "var(--coral)"} ${result.score}%, var(--paper-2) 0)`;
      [["uniform", result.uniform], ["repeat", result.repeat], ["connect", result.connect], ["template", result.template]].forEach(([key, value]) => {
        document.getElementById(`metric-${key}-value`).textContent = value;
        document.getElementById(`metric-${key}-bar`).style.setProperty("--value", `${value}%`);
      });
      status.textContent = `已分析 ${result.chars.toLocaleString()} 字、${result.sentences} 个句段。结果仅用于辅助人工检查。`;
      showToast("分析完成。结果不是 AI 来源证明。 ");
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
    initSharkWidgets();
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
