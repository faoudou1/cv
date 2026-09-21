/**
 * Digital Creative Portfolio — 数据 + 渲染 + Three.js 场景（深色主题版）
 * 依赖：three.min.js (CDN)。若加载失败，自动降级为静态版。
 *
 * 三个 3D 场景：
 *  1. Hero 个人数字身份装置（背景层，含首字母 / 玻璃主体 / 金属环 / 粒子）
 *  2. Digital Creative Workspace（About 区域旁的 3D 工作台）
 *  3. AIGC Cube（Portfolio 区域的透明能力立方体）
 * 每个场景都有静态 fallback；离屏场景自动暂停渲染以节省性能。
 */

const defaultResumeData = {
  zh: {
    name: '朱肖尚',
    heroTitle: '艺术科技与商业硕士 · 岭南大学（中国香港）',
    location: '中国 · 香港',
    email: 'xiaoshangzhu@ln.hk',
    heroEyebrow: 'Digital Media · Interactive Design · AIGC',
    heroHint: '拖动背景旋转 · 滚动探索 ↓',
    degreeLabel: '学历',
    locationLabel: '现居',
    copy: '复制邮箱',
    copied: '已复制',
    copyFailed: '复制失败，请手动复制邮箱：',
    footerTag: 'Digital Creative Portfolio',
    pdfLabel: '简历 PDF',
    pdfTitle: '中文简历 PDF',
    pdfOpen: '新标签页打开',
    pdfDownload: '下载',
    pdfClose: '关闭',
    pdfFile: 'assets/resume-zh.pdf',
    pdfDownloadName: '朱肖尚简历.pdf',
    nav: ['关于', '教育', '实习', '校园', '技能', '联系'],
    sectionTitles: {
      about: '关于我',
      workspace: 'Digital Creative Workspace',
      education: '教育背景',
      experience: '实习经历',
      projects: '校园经历',
      cube: 'AIGC Cube',
      skills: '个人技能',
      contact: '联系我'
    },
    workspaceHint: '点击画面进入 3D 工作台 · 拖动 360° 环视 · 滚轮缩放',
    enterWorkspace: '进入 3D 工作台',
    exitWorkspace: '退出 ✕',
    immersiveHint: '拖动 360° 环视 · 滚轮缩放 · 点击屏幕关键词或设备跳转板块 · ESC 退出',
    cubeHint: '点击画面进入 · 拖动旋转 · 悬停放大当前面 · 点击面跳转板块',
    enterCube: '进入 AIGC Cube',
    cubeImmersiveHint: '拖动旋转 · 滚轮缩放 · 点击立方体面跳转对应板块 · ESC 退出',
    comingSoon: 'COMING SOON',
    fallbackWorkspace: 'Digital Creative Workspace',
    fallbackCube: 'AIGC Cube · 能力矩阵',
    deviceLabels: {
      desk: 'DIGITAL WORKSPACE',
      monitor: 'DIGITAL MEDIA',
      camera: 'VIDEO / MEDIA',
      tablet: 'VISUAL DESIGN',
      keyboard: 'CREATIVE TOOLS',
      phone: 'INTERACTIVE',
      ai: 'AIGC'
    },
    summary: '数字媒体艺术背景，正在岭南大学攻读艺术科技与商业硕士。关注 AIGC、互动设计与视觉叙事，习惯用 3D、影像与代码把想法做成可交互的体验。做事条理清晰、目标导向，善于分析并解决问题，注重细节与效率，能高效推动任务完成。',
    highlights: [
      'Digital Media / Interactive Design / AIGC',
      '硕士：艺术科技与商业 · 岭南大学（中国香港）',
      '本科：数字媒体艺术 · 2026 届',
      '3D 建模：3ds Max / Blender / C4D',
      '后期剪辑：Pr / AE / PS / 剪映'
    ],
    education: [
      {
        degree: '艺术科技与商业理学硕士',
        school: '岭南大学（中国香港）',
        period: '2026.09 — 2027.08',
        note: '在读 · 商学院。主修课程：中西艺术史、艺科融合、设计思维与创新、艺术会计与财务、艺术金融和科技、互动艺术与科技、艺术与科技：从人工智能到 NFT 等'
      },
      {
        degree: '数字媒体艺术（本科）',
        school: '江西服装学院',
        period: '2022.09 — 2026.07',
        note: '主修课程：交互设计、动态绘本设计、影视后期制作、虚拟现实、数字图像处理与建模等'
      }
    ],
    experience: [
      {
        role: '后期制作实习生',
        company: '佛山市南海人力资源服务产业园',
        period: '2023.07 — 2023.09',
        details: [
          '负责产业园公众号与视频号的日常运作及后期制作。',
          '参与企业推广海报设计。',
          '参加广东多场 HR 专场对接会。'
        ]
      },
      {
        role: '媒体运营实习生',
        company: '佛山市美创研设计研究有限公司',
        period: '2025.07 — 2025.09',
        details: [
          '负责企业视频号、抖音账号的宣传与推广运营。',
          '参与企业推广海报设计。'
        ]
      },
      {
        role: '生活频道实习生',
        company: '广东省河源广播电视台',
        period: '2026.03 — 2026.05',
        details: [
          '负责电视台节目剪辑与 AI 视频生成工作。',
          '协助完成台内节目视频的剪辑与整理。'
        ]
      }
    ],
    projects: [
      {
        name: '社团活动 · 江西服装学院',
        description: '2022.09 — 2026.06｜积极参与社团各项活动，与其他同学共同策划各类学生活动；参与社团推广海报设计；完成社团其余工作任务，成功举办“社团志愿活动”等多次活动。'
      }
    ],
    skills: [
      '粤语（日常交流）', '普通话二级乙', '雅思作文 6.0',
      'Word / Excel / PPT', 'C1 驾照', '3ds Max',
      'Blender', 'C4D', 'Premiere Pro',
      'After Effects', 'Photoshop', '剪映'
    ],
    links: [
      { label: '邮箱', value: 'xiaoshangzhu@ln.hk', href: 'mailto:xiaoshangzhu@ln.hk' },
      { label: '电话', value: '13925453279', href: 'tel:13925453279' },
      { label: '现居住地', value: '中国香港', href: null },
      { label: '毕业院校', value: '江西服装学院', href: null },
      { label: '出生年月', value: '2004 年 08 月', href: null },
      { label: '民族', value: '汉族', href: null },
      { label: '简历 PDF', value: '点击在页面内预览中文简历', href: 'assets/resume-zh.pdf', pdf: true }
    ]
  },
  en: {
    name: 'Zhu Xiaoshang',
    heroTitle: 'M.Sc. in Arts Technology and Business · Lingnan University, Hong Kong, China',
    location: 'Hong Kong, China',
    email: 'xiaoshangzhu@ln.hk',
    heroEyebrow: 'DIGITAL MEDIA · INTERACTIVE DESIGN · AIGC',
    heroHint: 'Drag the background to rotate · Scroll to explore ↓',
    degreeLabel: 'Degree',
    locationLabel: 'Based in',
    copy: 'Copy Email',
    copied: 'Copied',
    copyFailed: 'Copy failed. Please copy the email manually: ',
    footerTag: 'Digital Creative Portfolio',
    pdfLabel: 'Resume PDF',
    pdfTitle: 'English Resume PDF',
    pdfOpen: 'Open in new tab',
    pdfDownload: 'Download',
    pdfClose: 'Close',
    pdfFile: 'assets/resume-en.pdf',
    pdfDownloadName: 'Zhu_Xiaoshang_Resume_EN.pdf',
    nav: ['About', 'Education', 'Internships', 'Campus', 'Skills', 'Contact'],
    sectionTitles: {
      about: 'About Me',
      workspace: 'Digital Creative Workspace',
      education: 'Education',
      experience: 'Internships',
      projects: 'Campus Experience',
      cube: 'AIGC Cube',
      skills: 'Skills',
      contact: 'Contact Me'
    },
    workspaceHint: 'Click the scene to enter the 3D workspace · drag for a 360° view · scroll to zoom',
    enterWorkspace: 'Enter 3D Workspace',
    exitWorkspace: 'Exit ✕',
    immersiveHint: 'Drag for 360° view · scroll to zoom · click screen keywords or devices to jump · ESC to exit',
    cubeHint: 'Click the scene to enter · drag to rotate · hover to zoom a face · click a face to jump',
    enterCube: 'Enter AIGC Cube',
    cubeImmersiveHint: 'Drag for 360° view around the cube · scroll to zoom · click a face to jump · ESC to exit',
    comingSoon: 'COMING SOON',
    fallbackWorkspace: 'Digital Creative Workspace',
    fallbackCube: 'AIGC Cube · Capability Matrix',
    deviceLabels: {
      desk: 'DIGITAL WORKSPACE',
      monitor: 'DIGITAL MEDIA',
      camera: 'VIDEO / MEDIA',
      tablet: 'VISUAL DESIGN',
      keyboard: 'CREATIVE TOOLS',
      phone: 'INTERACTIVE',
      ai: 'AIGC'
    },
    summary: 'Digital media art background, now pursuing an M.Sc. in Arts Technology and Business at Lingnan University. I care about AIGC, interactive design and visual storytelling, and I like turning ideas into interactive experiences with 3D, video and code. I work in an organized, goal-oriented way, am good at analysing and solving problems, and focus on detail and efficiency so tasks move forward fast.',
    highlights: [
      'Digital Media / Interactive Design / AIGC',
      'M.Sc. Arts Technology and Business · Lingnan University (in progress)',
      'B.A. Digital Media Art · Class of 2026',
      '3D modeling: 3ds Max / Blender / C4D',
      'Post-production: Pr / AE / PS / CapCut'
    ],
    education: [
      {
        degree: 'M.Sc. in Arts Technology and Business',
        school: 'Lingnan University, Hong Kong, China',
        period: '2026.09 — 2027.08',
        note: 'In progress · School of Business. Core courses: Chinese & Western Art History, Art-Tech Integration, Design Thinking & Innovation, Accounting & Finance for Arts, Art Finance & Technology, Interactive Art & Technology, Art & Technology: from AI to NFT, and more'
      },
      {
        degree: 'B.A. Digital Media Art',
        school: 'Jiangxi Institute of Fashion Technology',
        period: '2022.09 — 2026.07',
        note: 'Core courses: Interaction Design, Motion Picture Book Design, Film & TV Post-Production, Virtual Reality, Digital Image Processing & Modeling, and more'
      }
    ],
    experience: [
      {
        role: 'Post-Production Intern',
        company: 'Foshan Nanhai Human Resources Service Industrial Park',
        period: '2023.07 — 2023.09',
        details: [
          'Handled the daily operation and post-production of the park’s WeChat Official Account and video channel.',
          'Contributed to corporate promotional poster design.',
          'Attended multiple HR matchmaking events across Guangdong.'
        ]
      },
      {
        role: 'Media Operations Intern',
        company: 'Foshan Meichuangyan Design & Research Co., Ltd.',
        period: '2025.07 — 2025.09',
        details: [
          'Ran promotion and content operations for the company’s video channel and Douyin account.',
          'Contributed to corporate promotional poster design.'
        ]
      },
      {
        role: 'Lifestyle Channel Intern',
        company: 'Heyuan Radio and Television Station, Guangdong',
        period: '2026.03 — 2026.05',
        details: [
          'Handled programme editing and AI video generation for the station.',
          'Assisted with editing and organising programme footage.'
        ]
      }
    ],
    projects: [
      {
        name: 'Student Club Activities · Jiangxi Institute of Fashion Technology',
        description: '2022.09 — 2026.06 | Actively took part in club activities and co-planned various student events with fellow students; contributed to club promotional poster design; completed other club duties and helped host multiple successful events such as the “Club Volunteer Activity”.'
      }
    ],
    skills: [
      'Cantonese (daily conversation)', 'Mandarin Level 2-B', 'IELTS Writing 6.0',
      'Word / Excel / PowerPoint', 'Driving Licence (C1)', '3ds Max',
      'Blender', 'C4D', 'Premiere Pro',
      'After Effects', 'Photoshop', 'CapCut'
    ],
    links: [
      { label: 'Email', value: 'xiaoshangzhu@ln.hk', href: 'mailto:xiaoshangzhu@ln.hk' },
      { label: 'Phone', value: '13925453279', href: 'tel:13925453279' },
      { label: 'Based in', value: 'Hong Kong, China', href: null },
      { label: 'University', value: 'Jiangxi Institute of Fashion Technology (B.A.) / Lingnan University, Hong Kong, China (M.Sc.)', href: null },
      { label: 'Date of Birth', value: 'Aug 2004', href: null },
      { label: 'Ethnicity', value: 'Han', href: null },
      { label: 'Resume PDF', value: 'Preview the English resume in this page', href: 'assets/resume-en.pdf', pdf: true }
    ]
  }
};

/* ============================================================
 * 状态
 * ============================================================ */
const cloneData = (data) => JSON.parse(JSON.stringify(data));

const state = {
  language: 'zh',
  resumeData: cloneData(defaultResumeData)
};

function getText() {
  return state.resumeData[state.language];
}

/* 安全的文本节点创建（替代 innerHTML 拼接，避免注入） */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* ============================================================
 * 渲染
 * ============================================================ */
function renderResume() {
  const text = getText();

  document.getElementById('heroEyebrow').textContent = text.heroEyebrow;
  document.getElementById('heroName').textContent = text.name;
  document.getElementById('heroDegreeLabel').textContent = text.degreeLabel;
  document.getElementById('heroDegree').textContent = text.heroTitle;
  document.getElementById('heroLocationLabel').textContent = text.locationLabel;
  document.getElementById('heroLocation').textContent = text.location;
  document.getElementById('heroHint').textContent = text.heroHint;
  document.getElementById('copyEmail').textContent = text.copy;
  document.getElementById('pdfBtn').textContent = text.pdfLabel;
  document.getElementById('aboutSummary').textContent = text.summary;
  document.getElementById('workspaceHint').textContent = text.workspaceHint;
  document.getElementById('cubeHint').textContent = text.cubeHint;
  const wsEnter = document.getElementById('workspaceEnter');
  const wsExit = document.getElementById('workspaceExit');
  const wsImmHint = document.getElementById('workspaceImmersiveHint');
  const cubeEnter = document.getElementById('cubeEnter');
  const cubeExit = document.getElementById('cubeExit');
  const cubeImmHint = document.getElementById('cubeImmersiveHint');
  if (wsEnter) wsEnter.textContent = text.enterWorkspace;
  if (wsExit) wsExit.textContent = text.exitWorkspace;
  if (wsImmHint) wsImmHint.textContent = text.immersiveHint;
  if (cubeEnter) cubeEnter.textContent = text.enterCube;
  if (cubeExit) cubeExit.textContent = text.exitWorkspace;
  if (cubeImmHint) cubeImmHint.textContent = text.cubeImmersiveHint;

  Object.entries(text.sectionTitles).forEach(([key, value]) => {
    const heading = document.getElementById('t-' + key);
    if (heading) heading.textContent = value;
  });

  document.querySelectorAll('.quick a').forEach((link, index) => {
    if (text.nav[index]) link.textContent = text.nav[index];
  });

  // 关于我 - 亮点
  const highlights = document.getElementById('aboutHighlights');
  highlights.innerHTML = '';
  text.highlights.forEach((item) => highlights.appendChild(el('span', 'highlight-item', item)));

  // 教育背景
  const educationList = document.getElementById('educationList');
  educationList.innerHTML = '';
  text.education.forEach((item) => {
    const row = el('div', 'list-item');
    row.appendChild(el('strong', null, item.degree + ' — ' + item.school));
    row.appendChild(el('p', 'meta', item.period));
    if (item.note) row.appendChild(el('p', 'desc', item.note));
    educationList.appendChild(row);
  });

  // 工作经历
  const experienceList = document.getElementById('experienceList');
  experienceList.innerHTML = '';
  text.experience.forEach((item) => {
    const article = el('article', 'article interactive-item');
    const details = document.createElement('details');
    details.open = true;
    const summary = document.createElement('summary');
    const main = el('div', 'summary-main');
    main.appendChild(el('h3', null, item.role + ' — ' + item.company));
    main.appendChild(el('p', 'meta', item.period));
    summary.appendChild(main);
    details.appendChild(summary);
    const ul = document.createElement('ul');
    item.details.forEach((detail) => ul.appendChild(el('li', null, detail)));
    details.appendChild(ul);
    article.appendChild(details);
    article.addEventListener('click', () => pulseCard(article));
    experienceList.appendChild(article);
  });

  // 项目
  const projectsList = document.getElementById('projectsList');
  projectsList.innerHTML = '';
  text.projects.forEach((item) => {
    const row = el('div', 'list-item');
    row.appendChild(el('strong', null, item.name));
    row.appendChild(el('p', 'desc', item.description));
    projectsList.appendChild(row);
  });

  // 技能
  const skillsGrid = document.getElementById('skillsGrid');
  skillsGrid.innerHTML = '';
  text.skills.forEach((skill) => skillsGrid.appendChild(el('span', 'skill-pill', skill)));

  // 联系
  const contactGrid = document.getElementById('contactGrid');
  contactGrid.innerHTML = '';
  text.links.forEach((link) => {
    const item = el('div', 'contact-item');
    item.appendChild(el('span', 'label', link.label));
    if (link.href) {
      const a = el('a', link.pdf ? 'pdf-trigger' : null, link.value);
      a.href = link.href;
      // PDF 入口：不跳转，改为在页面内弹出预览
      if (link.pdf) {
        a.setAttribute('aria-haspopup', 'dialog');
        a.addEventListener('click', (event) => {
          event.preventDefault();
          openResumePdf();
        });
      }
      item.appendChild(a);
    } else {
      item.appendChild(el('span', null, link.value));
    }
    contactGrid.appendChild(item);
  });

  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('footerName').textContent = text.name;
  document.getElementById('footerTag').textContent = text.footerTag;
  document.title = text.name + (state.language === 'zh' ? ' · Digital Creative Portfolio' : ' · Digital Creative Portfolio');
}

/* 折叠切换时的轻微脉冲反馈 */
function pulseCard(node) {
  node.classList.remove('pulsing');
  void node.offsetWidth;
  node.classList.add('pulsing');
}

/* ============================================================
 * 交互：语言切换 / 复制邮箱
 * ============================================================ */
function bindLanguageToggle() {
  document.querySelectorAll('.lang-btn').forEach((button) => {
    button.addEventListener('click', () => {
      state.language = button.dataset.lang;
      document.body.dataset.lang = state.language;
      document.documentElement.lang = state.language === 'zh' ? 'zh-CN' : 'en';
      document.querySelectorAll('.lang-btn').forEach((b) => {
        const isActive = b === button;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });
      renderResume();
    });
  });
  document.body.dataset.lang = state.language;
  document.documentElement.lang = 'zh-CN';
}

function bindCopyEmail() {
  document.getElementById('copyEmail').addEventListener('click', () => {
    const text = getText();
    const button = document.getElementById('copyEmail');
    const done = () => {
      button.textContent = text.copied;
      setTimeout(() => { button.textContent = text.copy; }, 1200);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text.email).then(done).catch(() => fallbackCopy(text, button, done));
    } else {
      fallbackCopy(text, button, done);
    }
  });
}

function fallbackCopy(text, button, done) {
  const textarea = document.createElement('textarea');
  textarea.value = text.email;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    done();
  } catch (error) {
    window.alert(text.copyFailed + text.email);
  }
  document.body.removeChild(textarea);
}

/* ============================================================
 * 简历 PDF：站内预览弹层
 * ============================================================ */
let pdfPrevFocus = null;

function openResumePdf() {
  const modal = document.getElementById('pdfModal');
  if (!modal) return;

  const text = getText();
  const frame = document.getElementById('pdfFrame');
  const openTab = document.getElementById('pdfOpenTab');
  const download = document.getElementById('pdfDownload');

  document.getElementById('pdfModalTitle').textContent = text.pdfTitle;
  document.getElementById('pdfClose').setAttribute('aria-label', text.pdfClose);

  openTab.textContent = text.pdfOpen;
  openTab.href = text.pdfFile;

  download.textContent = text.pdfDownload;
  download.href = text.pdfFile;
  download.setAttribute('download', text.pdfDownloadName);

  if (frame.dataset.src !== text.pdfFile) {
    frame.src = text.pdfFile + '#view=FitH';
    frame.dataset.src = text.pdfFile;
  }

  pdfPrevFocus = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-pdf-open');
  document.getElementById('pdfClose').focus();
}

function closeResumePdf() {
  const modal = document.getElementById('pdfModal');
  if (!modal || !modal.classList.contains('open')) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-pdf-open');

  const frame = document.getElementById('pdfFrame');
  frame.src = 'about:blank';
  delete frame.dataset.src;

  if (pdfPrevFocus && typeof pdfPrevFocus.focus === 'function') pdfPrevFocus.focus();
}

function bindPdfModal() {
  const modal = document.getElementById('pdfModal');
  if (!modal) return;

  document.getElementById('pdfBtn').addEventListener('click', openResumePdf);
  document.getElementById('pdfClose').addEventListener('click', closeResumePdf);
  modal.querySelectorAll('[data-pdf-close]').forEach((node) => {
    node.addEventListener('click', closeResumePdf);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeResumePdf();
  });
}

/* ============================================================
 * 3D 倾斜卡片（鼠标跟随透视）
 * ============================================================ */
function bindTilt() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  document.querySelectorAll('[data-tilt]').forEach((node) => {
    const maxTilt = node.classList.contains('hero-name') ? 8 : 5;

    // will-change 只在倾斜交互期间启用，避免所有卡片常驻合成层拖慢滚动
    node.addEventListener('mouseenter', () => { node.style.willChange = 'transform'; });
    node.addEventListener('mousemove', (event) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.transform = `rotateY(${x * maxTilt * 2}deg) rotateX(${-y * maxTilt * 2}deg) translateZ(6px)`;
    });

    node.addEventListener('mouseleave', () => {
      node.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
      node.style.willChange = 'auto';
    });
  });
}

/* 滚动渐显 */
function bindReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.card').forEach((card) => observer.observe(card));
}

/* ============================================================
 * 3D 场景公共工具
 * ============================================================ */
const SCENE_ACTIVE = { bg: true, workspace: false, cube: false };

function supports3D() {
  return typeof THREE !== 'undefined' &&
    (function () {
      try {
        const probe = document.createElement('canvas');
        return !!(probe.getContext('webgl') || probe.getContext('experimental-webgl'));
      } catch (error) {
        return false;
      }
    })();
}

/* 静态 fallback：显示可点击的关键词芯片 */
function showSceneFallback(containerId, fallbackId, title, chips, onClickChip) {
  const stage = document.getElementById(containerId);
  const fallback = document.getElementById(fallbackId);
  if (!stage || !fallback) return;

  const canvas = stage.querySelector('canvas');
  if (canvas) canvas.style.display = 'none';
  fallback.hidden = false;
  fallback.innerHTML = '';

  const titleNode = el('p', 'fallback-title', title);
  const chipsWrap = el('div', 'fallback-chips');
  chips.forEach((chip) => {
    const node = el('button', 'fallback-chip', chip);
    node.type = 'button';
    node.addEventListener('click', () => onClickChip(chip));
    chipsWrap.appendChild(node);
  });
  fallback.appendChild(titleNode);
  fallback.appendChild(chipsWrap);
}

/* 全局悬停标签 */
const tooltipEl = () => document.getElementById('sceneTooltip');

function showTooltip(clientX, clientY, label) {
  const tip = tooltipEl();
  if (!tip) return;
  tip.textContent = label;
  tip.style.left = clientX + 'px';
  tip.style.top = clientY + 'px';
  tip.classList.add('visible');
  tip.setAttribute('aria-hidden', 'false');
}

function hideTooltip() {
  const tip = tooltipEl();
  if (!tip) return;
  tip.classList.remove('visible');
  tip.setAttribute('aria-hidden', 'true');
}

/* 把 canvas 指针事件换算为 NDC 坐标 */
function toNDC(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  return new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  );
}

/* 离屏自动暂停渲染 */
function observeSceneActive(elementId, key) {
  const target = document.getElementById(elementId);
  if (!target || !('IntersectionObserver' in window)) {
    SCENE_ACTIVE[key] = true;
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      SCENE_ACTIVE[key] = entry.isIntersecting;
    });
  }, { rootMargin: '120px' });
  observer.observe(target);
}

/* 冷色调 Canvas 文字纹理 */
function makeTextTexture(lines, options) {
  const opts = Object.assign({ width: 512, height: 288, accent: '#7FD6F2', muted: '#8FA3B8', bg: '#0D1119' }, options || {});
  const canvas = document.createElement('canvas');
  canvas.width = opts.width;
  canvas.height = opts.height;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = opts.bg;
  ctx.fillRect(0, 0, opts.width, opts.height);

  // 细网格，增加"数字工作台"质感
  ctx.strokeStyle = 'rgba(127, 214, 242, 0.08)';
  ctx.lineWidth = 1;
  for (let x = 32; x < opts.width; x += 32) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, opts.height); ctx.stroke();
  }
  for (let y = 32; y < opts.height; y += 32) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(opts.width, y); ctx.stroke();
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const step = opts.height / (lines.length + 1);
  lines.forEach((line, i) => {
    const isAccent = i === 0;
    ctx.fillStyle = isAccent ? opts.accent : 'rgba(242, 244, 246, 0.85)';
    ctx.font = (isAccent ? '700 ' : '500 ') + (isAccent ? Math.round(step * 0.52) : Math.round(step * 0.4)) + 'px "Segoe UI", "PingFang SC", sans-serif';
    ctx.shadowColor = isAccent ? 'rgba(127, 214, 242, 0.55)' : 'transparent';
    ctx.shadowBlur = isAccent ? 18 : 0;
    ctx.fillText(line, opts.width / 2, step * (i + 1));
  });
  ctx.shadowBlur = 0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return { texture, canvas, ctx, opts };
}

/* ============================================================
 * 场景 1：Hero 个人数字身份装置（全屏背景层）
 * 抽象几何主体 + 首字母 + 玻璃卫星体 + 金属环 + 粒子 + 微光
 * ============================================================ */
function init3DScene() {
  const canvas = document.getElementById('bg3d');

  if (!supports3D() || !canvas) {
    canvas.style.display = 'none'; // 降级：显示 CSS 光斑背景
    return;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0B0C0F, 0.02);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 14);

  // ---- 灯光：冷白环境光 + 冷青主光 + 淡蓝辅光 ----
  scene.add(new THREE.AmbientLight(0xBFD4E2, 0.7));

  const keyLight = new THREE.PointLight(0x7FD6F2, 1.5, 80);
  keyLight.position.set(9, 7, 12);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0x5B79A8, 0.8, 80);
  fillLight.position.set(-11, -4, 9);
  scene.add(fillLight);

  // 身份装置中心的呼吸微光（悬停时增强）
  const identityGlow = new THREE.PointLight(0x7FD6F2, 0.9, 24);
  identityGlow.position.set(0, 0.4, -1.5);
  scene.add(identityGlow);

  // ---- 微粒：冷色低透明度，安静漂浮 ----
  const particleCount = 1200;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const palette = [new THREE.Color(0x6FA8C9), new THREE.Color(0x7FD6F2), new THREE.Color(0x43536B), new THREE.Color(0xC9D6E3)];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 5;
    const color = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({
    size: 0.09,
    vertexColors: true,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    blending: THREE.NormalBlending
  }));
  scene.add(particles);

  // ---- 远景几何体（深空冷色线框，弱化装饰感） ----
  const shapes = [];
  const wireMat = (color, opacity) => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });
  const glassMat = (color, opacity) => new THREE.MeshPhongMaterial({ color, transparent: true, opacity: opacity || 0.28, shininess: 70, flatShading: true });

  function addShape(geo, material, position, speed) {
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.userData.speed = speed;
    shapes.push(mesh);
    scene.add(mesh);
    return mesh;
  }

  addShape(new THREE.IcosahedronGeometry(2.2, 0), wireMat(0x43536B, 0.35), [-11, 4, -8], 0.0032);
  addShape(new THREE.TorusKnotGeometry(1.5, 0.4, 80, 12), glassMat(0x2C3A4C, 0.32), [11, -4, -9], 0.0045);
  addShape(new THREE.OctahedronGeometry(1.7, 0), wireMat(0x5FA8C7, 0.30), [8, 6, -13], 0.004);
  addShape(new THREE.TorusGeometry(1.9, 0.3, 10, 48), wireMat(0x4E7E9B, 0.30), [-12, -6, -11], 0.0055);
  addShape(new THREE.DodecahedronGeometry(1.4, 0), glassMat(0x33465C, 0.3), [1, -8, -10], 0.0038);
  addShape(new THREE.ConeGeometry(1.3, 2.6, 5), wireMat(0x43536B, 0.26), [-5, 9, -15], 0.005);

  // ============================================================
  // 个人数字身份装置：Personal Identity Object
  // ============================================================
  const identity = new THREE.Group();
  identity.position.set(0, 0.4, -4);
  scene.add(identity);

  // 渐显动画（0 → 1，页面进入时约 1.8s）
  const fadeIn = { value: 0 };

  // 抽象几何主体：深空玻璃二十面体 + 冷色线框
  const mainGlass = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.6, 1),
    new THREE.MeshPhongMaterial({ color: 0x16202E, transparent: true, opacity: 0, shininess: 90, flatShading: true })
  );
  identity.add(mainGlass);

  const mainWire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.74, 1),
    wireMat(0x7FD6F2, 0)
  );
  identity.add(mainWire);

  // 内核：小型发光体
  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.9, 0),
    new THREE.MeshBasicMaterial({ color: 0x7FD6F2, transparent: true, opacity: 0 })
  );
  identity.add(core);

  // 姓名首字母（取自英文姓名 Zhu Xiaoshang → Z）
  const initial = (defaultResumeData.en.name || 'Z').trim().charAt(0).toUpperCase();
  const letterCanvas = document.createElement('canvas');
  letterCanvas.width = 256;
  letterCanvas.height = 256;
  const letterCtx = letterCanvas.getContext('2d');
  letterCtx.clearRect(0, 0, 256, 256);
  letterCtx.textAlign = 'center';
  letterCtx.textBaseline = 'middle';
  letterCtx.font = '700 170px "Segoe UI", "Helvetica Neue", Arial, sans-serif';
  letterCtx.fillStyle = '#FFFFFF';
  letterCtx.shadowColor = 'rgba(127, 214, 242, 0.9)';
  letterCtx.shadowBlur = 28;
  letterCtx.fillText(initial, 128, 138);
  const letterTexture = new THREE.CanvasTexture(letterCanvas);
  const letterPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.8, 1.8),
    new THREE.MeshBasicMaterial({ map: letterTexture, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false })
  );
  letterPlane.position.set(0, 0.05, 2.68); // 贴在主体前方
  identity.add(letterPlane);

  // 金属环 × 2（高光银灰，缓慢反向运动）
  const metalMat = new THREE.MeshPhongMaterial({ color: 0xC9CFD8, shininess: 120, specular: 0xE8EEF5, transparent: true, opacity: 0 });
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.045, 16, 96), metalMat.clone());
  ringA.rotation.set(1.15, 0.3, 0);
  identity.add(ringA);

  const ringB = new THREE.Mesh(new THREE.TorusGeometry(4.05, 0.028, 16, 96), metalMat.clone());
  ringB.rotation.set(1.6, -0.5, 0.4);
  identity.add(ringB);

  // 环上的小型玻璃卫星体
  const satellites = [];
  for (let i = 0; i < 3; i++) {
    const sat = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), glassMat(0x9FD8EF, 0));
    sat.userData.orbit = {
      radius: i === 0 ? 3.5 : 4.05,
      speed: 0.22 + i * 0.08,
      phase: (i / 3) * Math.PI * 2,
      ring: i === 0 ? ringA : ringB
    };
    satellites.push(sat);
    identity.add(sat);
  }

  // 交互状态
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const drag = { active: false, lastX: 0, lastY: 0, rotY: 0, rotX: 0, moved: 0 };
  let scrollProgress = 0;
  let identityHover = 0;
  let pulsePower = 0; // 点击装置触发的"重组脉冲"能量，随时间衰减

  // 字母 Z 面向相机的补偿计算所用临时对象（避免每帧分配内存）
  const Z_AXIS = new THREE.Vector3(0, 0, 1);
  const tmpDevicePos = new THREE.Vector3();
  const tmpDir = new THREE.Vector3();
  const tmpLetterPos = new THREE.Vector3();
  const tmpQParent = new THREE.Quaternion();
  const tmpQTarget = new THREE.Quaternion();

  window.addEventListener('mousemove', (event) => {
    pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;

    // 悬停检测：指针靠近屏幕中心的装置区域 → 轻微发光
    const dx = event.clientX - window.innerWidth / 2;
    const dy = event.clientY - window.innerHeight / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const hovered = distance < Math.min(window.innerWidth, window.innerHeight) * 0.28;
    identityHover += ((hovered ? 1 : 0) - identityHover) * 0.08;
  }, { passive: true });

  function isInteractiveTarget(target) {
    return !!(target && target.closest &&
      target.closest('a, button, summary, details, input, textarea, select, .card, .top-bar, .pdf-modal, canvas#wsCanvas, canvas#cubeCanvas'));
  }

  window.addEventListener('pointerdown', (event) => {
    if (isInteractiveTarget(event.target)) return;
    if (event.pointerType === 'mouse' && event.cancelable) event.preventDefault();
    drag.active = true;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.moved = 0;
    document.body.classList.add('is-dragging');
  });

  window.addEventListener('pointermove', (event) => {
    if (!drag.active) return;
    const dx = event.clientX - drag.lastX;
    const dy = event.clientY - drag.lastY;
    drag.rotY += dx * 0.004;
    drag.rotX += dy * 0.003;
    drag.rotX = Math.max(-0.6, Math.min(0.6, drag.rotX));
    drag.moved += Math.abs(dx) + Math.abs(dy);
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
  }, { passive: true });

  const endDrag = () => {
    if (drag.active && drag.moved < 6) {
      // 点击空白处（非拖动）→ 触发身份装置的重组脉冲
      pulsePower = 1;
    }
    drag.active = false;
    document.body.classList.remove('is-dragging');
  };

  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = max > 0 ? window.scrollY / max : 0;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ---- 动画循环 ----
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // 页面进入渐显（约 1.8s，克制）
    if (fadeIn.value < 1) {
      fadeIn.value = Math.min(1, fadeIn.value + 0.012);
      const f = fadeIn.value;
      mainGlass.material.opacity = 0.42 * f;
      mainWire.material.opacity = 0.35 * f;
      core.material.opacity = 0.85 * f;
      letterPlane.material.opacity = f;
      ringA.material.opacity = 0.9 * f;
      ringB.material.opacity = 0.9 * f;
      satellites.forEach((sat) => { sat.material.opacity = 0.8 * f; });
    }

    // 指针平滑跟随（视差）
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;

    // 相机：鼠标视差 + 滚动下潜 + 拖拽旋转
    camera.position.x = pointer.x * 1.6;
    camera.position.y = -pointer.y * 1.1 - scrollProgress * 3.5;
    camera.position.z = 14 - scrollProgress * 3;

    camera.lookAt(pointer.x * 0.6, -pointer.y * 0.4 - scrollProgress * 3, 0);

    // 拖拽旋转整个场景内容
    scene.rotation.y = drag.rotY;
    scene.rotation.x = drag.rotX;

    if (!prefersReduced) {
      // 粒子缓慢漂移
      particles.rotation.y = t * 0.018;
      particles.rotation.x = Math.sin(t * 0.1) * 0.03;

      // 远景几何体自转 + 浮动
      shapes.forEach((mesh, i) => {
        mesh.rotation.x += mesh.userData.speed;
        mesh.rotation.y += mesh.userData.speed * 1.3;
        mesh.position.y += Math.sin(t * 0.6 + i * 1.7) * 0.004;
      });

      // 装置：非常缓慢的自转 + 呼吸
      identity.rotation.y = t * 0.06;
      identity.rotation.x = Math.sin(t * 0.12) * 0.05;
    } else {
      identity.rotation.y = 0.4;
    }

    // 脉冲能量衰减（点击装置后触发）
    if (pulsePower > 0.001) {
      pulsePower *= 0.965;
    } else {
      pulsePower = 0;
    }

    // 呼吸 + 脉冲闪光
    const breathe = 1 + Math.sin(t * 0.7) * 0.015 + pulsePower * 0.25;
    core.scale.setScalar(breathe);

    // ============================================================
    // 字母 Z：无论场景/装置如何旋转，始终缓慢转向相机正面
    // 做法：每帧把字母的世界朝向对齐"装置中心 → 相机"方向，
    // 再用 slerp 平滑补偿（缓慢回正），位置同步贴在装置前缘。
    // ============================================================
    identity.updateWorldMatrix(true, false);
    identity.getWorldQuaternion(tmpQParent);
    identity.getWorldPosition(tmpDevicePos);
    tmpDir.subVectors(camera.position, tmpDevicePos).normalize();
    tmpQTarget.setFromUnitVectors(Z_AXIS, tmpDir);
    tmpQTarget.premultiply(tmpQParent.invert());
    letterPlane.quaternion.slerp(tmpQTarget, 0.06);
    // 位置：装置中心 + 指向相机方向 × 半径（世界空间），再转回装置本地坐标
    tmpLetterPos.copy(tmpDevicePos).addScaledVector(tmpDir, 2.78);
    tmpLetterPos.y += Math.sin(t * 0.8) * 0.06;
    identity.worldToLocal(tmpLetterPos);
    letterPlane.position.copy(tmpLetterPos);

    // 金属环：极缓慢反向运动（脉冲时短暂加速，模拟重组）
    if (!prefersReduced) {
      const spinBoost = pulsePower * 0.05;
      ringA.rotation.z += 0.0012 + spinBoost;
      ringB.rotation.z -= 0.0008 + spinBoost * 0.7;
      ringA.rotation.x += 0.0004 + spinBoost * 0.5;
      ringB.rotation.x -= 0.0003 + spinBoost * 0.5;
    }

    // 玻璃卫星沿各自的环公转：悬停时被轻微"磁吸"（半径收缩、提速），脉冲时环绕加速
    if (!prefersReduced) {
      const speedMul = 1 + identityHover * 0.6 + pulsePower * 2.5;
      const radiusMul = 1 - identityHover * 0.12 - pulsePower * 0.06;
      satellites.forEach((sat) => {
        const o = sat.userData.orbit;
        const angle = t * o.speed * speedMul + o.phase;
        const rr = o.radius * radiusMul;
        sat.position.set(
          Math.cos(angle) * rr,
          Math.sin(angle) * rr * Math.sin(o.ring.rotation.x),
          Math.sin(angle) * rr * Math.cos(o.ring.rotation.x)
        );
        sat.rotation.y += 0.01 + pulsePower * 0.1;
      });
    }

    // 悬停发光 + 呼吸微光 + 脉冲闪光
    const hoverBoost = identityHover * 1.1;
    identityGlow.intensity = (0.8 + Math.sin(t * 0.9) * 0.15) * fadeIn.value + hoverBoost + pulsePower * 2.2;
    keyLight.intensity = 1.5 + Math.sin(t * 0.8) * 0.15;
    fillLight.intensity = 0.8 + Math.sin(t * 0.6 + 2) * 0.12;

    renderer.render(scene, camera);
  }

  animate();
}

/* ============================================================
 * 场景 2：Digital Creative Workspace（About 区域旁）
 * 低多边形极简工作台：显示器 / 键盘 / 鼠标 / 手机 / 数位板 /
 * 摄像机 / 耳机 / 硬盘 / 文件夹 / 台灯 / AI 悬浮体
 * 悬停设备 → 标签；点击设备 → 滚动到对应板块
 * ============================================================ */
function initWorkspaceScene() {
  const stage = document.getElementById('workspaceStage');
  const canvas = document.getElementById('wsCanvas');
  if (!stage || !canvas || !supports3D()) {
    const text = getText();
    const map = {
      'DIGITAL MEDIA': '#about',
      'VIDEO / MEDIA': '#experience',
      'VISUAL DESIGN': '#projects',
      'INTERACTIVE': '#skills',
      'AIGC': '#skills'
    };
    showSceneFallback('workspaceStage', 'workspaceFallback', text.fallbackWorkspace,
      Object.keys(map),
      (chip) => { const target = document.querySelector(map[chip]); if (target) target.scrollIntoView({ behavior: 'smooth' }); });
    return;
  }

  observeSceneActive('workspace', 'workspace');

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 2, 0.1, 60);
  camera.position.set(0, 3.1, 9.2);
  camera.lookAt(0, 0.7, 0);

  scene.add(new THREE.AmbientLight(0xBFD4E2, 0.55));
  const keyLight = new THREE.PointLight(0x7FD6F2, 1.1, 40);
  keyLight.position.set(4, 6, 7);
  scene.add(keyLight);
  const fillLight = new THREE.PointLight(0x5B79A8, 0.5, 40);
  fillLight.position.set(-6, 2, 5);
  scene.add(fillLight);

  const world = new THREE.Group();
  scene.add(world);

  // 材质库：极简深色 + 玻璃 + 少量金属
  const darkMat = new THREE.MeshPhongMaterial({ color: 0x1A1F29, shininess: 30, flatShading: true });
  const darkerMat = new THREE.MeshPhongMaterial({ color: 0x11151D, shininess: 20, flatShading: true });
  const metalMat = new THREE.MeshPhongMaterial({ color: 0x9AA6B5, shininess: 110, specular: 0xD6DEE8 });
  const glassMat = new THREE.MeshPhongMaterial({ color: 0x2C3A4C, transparent: true, opacity: 0.3, shininess: 80, flatShading: true });
  const accentMat = new THREE.MeshBasicMaterial({ color: 0x7FD6F2, transparent: true, opacity: 0.9 });

  function box(w, h, d, mat, x, y, z, ry) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    if (ry) mesh.rotation.y = ry;
    world.add(mesh);
    return mesh;
  }

  // ---- 桌面（含桌腿，可整体点击） ----
  const deskGroup = new THREE.Group();
  world.add(deskGroup);
  const desk = new THREE.Mesh(new THREE.BoxGeometry(9, 0.22, 3.6), darkMat);
  deskGroup.add(desk);
  // 桌腿（简化，只做暗示）
  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.4, 0.18), darkerMat);
  legL.position.set(-4.1, -0.8, -1.4);
  deskGroup.add(legL);
  const legR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.4, 0.18), darkerMat);
  legR.position.set(4.1, -0.8, -1.4);
  deskGroup.add(legR);

  // ---- 显示器（屏幕内容：品牌关键词轮播） ----
  const monitorGroup = new THREE.Group();
  monitorGroup.position.set(-0.8, 0, -0.5);
  world.add(monitorGroup);
  const monBase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.62, 0.06, 24), darkerMat);
  monBase.position.set(0, 0.14, 0.2);
  monitorGroup.add(monBase);
  const stand = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.9, 0.1), darkMat);
  stand.position.set(0, 0.6, 0.2);
  monitorGroup.add(stand);
  const shell = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.05, 0.12), darkMat);
  shell.position.set(0, 1.55, 0.1);
  monitorGroup.add(shell);
  const monitorWords = ['DIGITAL MEDIA', 'INTERACTIVE', 'DESIGN', 'AIGC', 'MOTION', 'VISUAL'];
  const screen = makeTextTexture(monitorWords, { width: 512, height: 288 });
  const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.36, 1.86),
    new THREE.MeshBasicMaterial({ map: screen.texture })
  );
  screenMesh.position.set(0, 1.55, 0.17);
  monitorGroup.add(screenMesh);

  // ---- 键盘 ----
  const kbGroup = new THREE.Group();
  kbGroup.position.set(-0.8, 0.13, 1.0);
  kbGroup.rotation.y = -0.04;
  world.add(kbGroup);
  const kbBase = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.07, 0.64), darkerMat);
  kbGroup.add(kbBase);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 10; c++) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.03, 0.13), darkMat);
      key.position.set(-0.8 + c * 0.165, 0.05, -0.2 + r * 0.19);
      kbGroup.add(key);
    }
  }

  // ---- 鼠标 ----
  const mouseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.16, 18, 14), darkMat);
  mouseMesh.scale.set(1, 0.55, 1.45);
  mouseMesh.position.set(0.55, 0.16, 1.05);
  world.add(mouseMesh);

  // ---- 手机 ----
  const phoneGroup = new THREE.Group();
  phoneGroup.position.set(1.35, 0.12, 0.55);
  phoneGroup.rotation.y = -0.5;
  world.add(phoneGroup);
  const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.035, 0.66), darkerMat);
  phoneGroup.add(phoneBody);
  const phoneScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.6), accentMat.clone());
  phoneScreen.material.opacity = 0.5;
  phoneScreen.rotation.x = -Math.PI / 2;
  phoneScreen.position.y = 0.02;
  phoneGroup.add(phoneScreen);

  // ---- 数位板（含小型屏幕） ----
  const tabletGroup = new THREE.Group();
  tabletGroup.position.set(-3.0, 0.13, 0.7);
  tabletGroup.rotation.y = 0.35;
  world.add(tabletGroup);
  const tabletBody = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.05, 0.8), darkMat);
  tabletGroup.add(tabletBody);
  const tabletTex = makeTextTexture(['VISUAL', 'DESIGN'], { width: 256, height: 160 });
  const tabletScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.98, 0.62),
    new THREE.MeshBasicMaterial({ map: tabletTex.texture })
  );
  tabletScreen.rotation.x = -Math.PI / 2;
  tabletScreen.position.y = 0.03;
  tabletGroup.add(tabletScreen);

  // ---- 摄像机（机身 + 镜头） ----
  const cameraGroup = new THREE.Group();
  cameraGroup.position.set(2.55, 0.32, 0.35);
  cameraGroup.rotation.y = -0.4;
  world.add(cameraGroup);
  const camBody = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.42, 0.34), darkerMat);
  cameraGroup.add(camBody);
  const lensOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.22, 20), darkMat);
  lensOuter.rotation.x = Math.PI / 2;
  lensOuter.position.set(0, 0.02, 0.26);
  cameraGroup.add(lensOuter);
  const lensGlass = new THREE.Mesh(new THREE.CircleGeometry(0.11, 20), glassMat);
  lensGlass.position.set(0, 0.02, 0.38);
  cameraGroup.add(lensGlass);
  const recDot = new THREE.Mesh(new THREE.CircleGeometry(0.025, 10), accentMat.clone());
  recDot.position.set(0.28, 0.16, 0.18);
  cameraGroup.add(recDot);

  // ---- 耳机（头梁 + 双耳罩，平放） ----
  const hpGroup = new THREE.Group();
  hpGroup.position.set(3.3, 0.1, -0.9);
  hpGroup.rotation.y = 0.6;
  world.add(hpGroup);
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.045, 12, 32, Math.PI), darkMat);
  band.rotation.z = 0;
  band.rotation.x = Math.PI / 2;
  hpGroup.add(band);
  const cupL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 20), darkMat);
  cupL.position.set(-0.34, 0.03, 0);
  cupL.rotation.z = Math.PI / 2;
  hpGroup.add(cupL);
  const cupR = cupL.clone();
  cupR.position.x = 0.34;
  hpGroup.add(cupR);

  // ---- 小型硬盘 ----
  const hdd = box(0.6, 0.1, 0.42, darkerMat, 0.75, 0.11, -0.75, 0.3);
  const hddLed = new THREE.Mesh(new THREE.CircleGeometry(0.025, 10), accentMat.clone());
  hddLed.rotation.x = -Math.PI / 2;
  hddLed.position.set(0.9, 0.165, -0.66);
  world.add(hddLed);
  void hdd;

  // ---- 文件夹（两片薄板） ----
  const folderA = box(0.72, 0.035, 0.52, darkMat, -1.85, 0.09, -1.0, -0.25);
  const folderB = box(0.68, 0.03, 0.48, new THREE.MeshPhongMaterial({ color: 0x223042, shininess: 24, flatShading: true }), -1.85, 0.12, -1.0, -0.25);
  folderB.rotation.z = 0.02;
  void folderA;

  // ---- 台灯（底座 + 双臂 + 灯头 + 灯光） ----
  const lampGroup = new THREE.Group();
  lampGroup.position.set(-3.6, 0, -1.1);
  world.add(lampGroup);
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.05, 24), darkerMat);
  lampBase.position.set(0, 0.05, 0);
  lampGroup.add(lampBase);
  const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.0, 10), metalMat);
  arm1.position.set(0.12, 0.55, 0);
  arm1.rotation.z = 0.25;
  lampGroup.add(arm1);
  const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.8, 10), metalMat);
  arm2.position.set(0.38, 1.12, 0);
  arm2.rotation.z = 1.15;
  lampGroup.add(arm2);
  const lampHead = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.26, 20), darkMat);
  lampHead.position.set(0.72, 1.18, 0);
  lampHead.rotation.z = -1.9;
  lampGroup.add(lampHead);
  const lampBulb = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), accentMat.clone());
  lampBulb.material.opacity = 0.75;
  lampBulb.position.set(0.82, 1.14, 0);
  lampBulb.rotation.z = -2.1;
  lampGroup.add(lampBulb);
  const lampLight = new THREE.PointLight(0x9FD8EF, 0.9, 6);
  lampLight.position.set(0.85, 1.1, 0.2);
  lampGroup.add(lampLight);

  // ---- AI 悬浮体（AIGC 标识：小型发光十二面体） ----
  function wireLike(color, opacity) {
    return new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });
  }
  const aiGroup = new THREE.Group();
  aiGroup.position.set(0.4, 2.6, -0.2);
  world.add(aiGroup);
  const aiWire = new THREE.Mesh(new THREE.DodecahedronGeometry(0.3, 0), wireLike(0x7FD6F2, 0.6));
  aiGroup.add(aiWire);
  const aiCore = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), accentMat.clone());
  aiGroup.add(aiCore);
  const aiLight = new THREE.PointLight(0x7FD6F2, 0.7, 4);
  aiGroup.add(aiLight);

  // ---- 可点击设备注册表（group → 标签 + 跳转目标） ----
  const deviceMap = [
    { key: 'desk', group: deskGroup, target: '#about' },
    { key: 'monitor', group: monitorGroup, target: '#cube' },
    { key: 'camera', group: cameraGroup, target: '#experience' },
    { key: 'tablet', group: tabletGroup, target: '#projects' },
    { key: 'keyboard', group: kbGroup, target: '#skills' },
    { key: 'phone', group: phoneGroup, target: '#contact' },
    { key: 'ai', group: aiGroup, target: '#skills' }
  ];
  const pickables = [];
  deviceMap.forEach((d) => {
    d.group.traverse((node) => { if (node.isMesh) { node.userData.deviceKey = d.key; pickables.push(node); } });
  });

  // ---- 沉浸模式（点击进入 3D 工作台空间） ----
  let immersive = false;
  let immT = 0; // 0 = 常规视角, 1 = 沉浸视角（缓动过渡）
  const camBase = {
    pos: new THREE.Vector3(0, 3.1, 9.2),
    look: new THREE.Vector3(0, 0.7, 0)
  };
  const camImm = {
    pos: new THREE.Vector3(0.9, 2.4, 5.6),
    look: new THREE.Vector3(-0.3, 0.9, -0.2)
  };
  // 360° 环视轨道：拖拽自由旋转（偏航无限、俯仰限位）+ 滚轮缩放 + 惯性
  const orbit = { yaw: 0, pitch: 0, zoom: 1, active: false, lastX: 0, lastY: 0, velYaw: 0, velPitch: 0 };
  // 显示器屏幕关键词 → 板块（屏幕内简单操作：悬停看词，点击行直接跳转）
  const SCREEN_LINKS = [
    { word: 'DIGITAL MEDIA', target: '#about' },
    { word: 'INTERACTIVE', target: '#workspace' },
    { word: 'DESIGN', target: '#projects' },
    { word: 'AIGC', target: '#cube' },
    { word: 'MOTION', target: '#experience' },
    { word: 'VISUAL', target: '#skills' }
  ];
  const enterBtn = document.getElementById('workspaceEnter');
  const exitBtn = document.getElementById('workspaceExit');
  const immHint = document.getElementById('workspaceImmersiveHint');
  // 兜底：renderResume 之外也保证按钮有文案
  if (enterBtn && !enterBtn.textContent) enterBtn.textContent = getText().enterWorkspace;
  if (exitBtn && !exitBtn.textContent) exitBtn.textContent = getText().exitWorkspace;
  if (immHint && !immHint.textContent) immHint.textContent = getText().immersiveHint;

  const stageParent = stage.parentElement;
  const stageNext = stage.nextElementSibling;

  function enterImmersive() {
    if (immersive) return;
    immersive = true;
    // 卡片的 backdrop-filter / 容器的 perspective 会让 fixed 相对卡片定位——
    // 进入沉浸时把舞台挂到 body 下，彻底脱离这些祖先的影响
    document.body.appendChild(stage);
    stage.classList.add('immersive');
    document.body.classList.add('ws-immersive');
    if (enterBtn) enterBtn.hidden = true;
    if (exitBtn) exitBtn.hidden = false;
    if (immHint) immHint.hidden = false;
    canvas.style.cursor = 'grab';
    resize();
  }

  function exitImmersive() {
    if (!immersive) return;
    immersive = false;
    stage.classList.remove('immersive');
    document.body.classList.remove('ws-immersive');
    if (stageParent) stageParent.insertBefore(stage, stageNext);
    if (enterBtn) enterBtn.hidden = false;
    if (exitBtn) exitBtn.hidden = true;
    if (immHint) immHint.hidden = true;
    canvas.style.cursor = 'default';
    hideTooltip();
    resize();
  }

  if (enterBtn) enterBtn.addEventListener('click', enterImmersive);
  if (exitBtn) exitBtn.addEventListener('click', exitImmersive);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && immersive) exitImmersive();
  });

  // ---- 尺寸 ----
  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // ---- 悬停 / 点击 ----
  const raycaster = new THREE.Raycaster();
  let hoveredKey = null;

  /* 屏幕命中 → 关键词行（UV 映射到 6 行文案） */
  function screenRowAt(hit) {
    if (!hit || hit.object !== screenMesh || !hit.uv) return -1;
    return Math.min(SCREEN_LINKS.length - 1, Math.max(0, Math.floor((1 - hit.uv.y) * SCREEN_LINKS.length)));
  }

  canvas.addEventListener('pointermove', (event) => {
    if (orbit.active) { hoveredKey = null; hideTooltip(); return; }
    raycaster.setFromCamera(toNDC(event, canvas), camera);
    const hits = raycaster.intersectObjects(pickables, false);
    const screenRow = hits.length ? screenRowAt(hits[0]) : -1;
    const key = hits.length ? hits[0].object.userData.deviceKey : null;
    const label = screenRow >= 0
      ? SCREEN_LINKS[screenRow].word
      : (key ? (getText().deviceLabels[key] || key.toUpperCase()) : null);
    const effectiveKey = screenRow >= 0 ? 'screen' : key;
    if (effectiveKey !== hoveredKey) {
      hoveredKey = effectiveKey;
      canvas.style.cursor = effectiveKey ? 'pointer' : 'default';
      if (label) showTooltip(event.clientX, event.clientY, label);
      else hideTooltip();
    } else if (label) {
      showTooltip(event.clientX, event.clientY, label);
    }
  });

  canvas.addEventListener('pointerleave', () => {
    hoveredKey = null;
    canvas.style.cursor = 'default';
    hideTooltip();
  });

  // ---- 360° 环视拖拽（仅沉浸模式）+ 滚轮缩放 ----
  canvas.addEventListener('pointerdown', (event) => {
    if (!immersive) return;
    orbit.active = true;
    orbit.lastX = event.clientX;
    orbit.lastY = event.clientY;
    canvas.style.cursor = 'grabbing';
    if (event.cancelable) event.preventDefault();
  });

  window.addEventListener('pointermove', (event) => {
    if (!orbit.active) return;
    const dx = event.clientX - orbit.lastX;
    const dy = event.clientY - orbit.lastY;
    orbit.yaw -= dx * 0.005;
    orbit.pitch -= dy * 0.004;
    orbit.pitch = Math.max(-0.55, Math.min(0.5, orbit.pitch));
    orbit.velYaw = -dx * 0.005 * 0.4;
    orbit.velPitch = -dy * 0.004 * 0.4;
    orbit.lastX = event.clientX;
    orbit.lastY = event.clientY;
  }, { passive: true });

  const endOrbit = () => {
    if (!orbit.active) return;
    orbit.active = false;
    canvas.style.cursor = 'grab';
  };
  window.addEventListener('pointerup', endOrbit);
  window.addEventListener('pointercancel', endOrbit);

  canvas.addEventListener('wheel', (event) => {
    if (!immersive) return;
    event.preventDefault();
    orbit.zoom = Math.max(0.7, Math.min(1.5, orbit.zoom * (1 + event.deltaY * 0.0011)));
  }, { passive: false });

  canvas.addEventListener('click', (event) => {
    raycaster.setFromCamera(toNDC(event, canvas), camera);
    const hits = raycaster.intersectObjects(pickables, false);
    if (!hits.length) return;
    // 显示器屏幕：UV 定位关键词行，点击直接跳转（屏幕内简单操作）
    const row = screenRowAt(hits[0]);
    let device = null;
    let destSelector = null;
    if (row >= 0) {
      destSelector = SCREEN_LINKS[row].target;
    } else {
      device = deviceMap.find((d) => d.key === hits[0].object.userData.deviceKey);
      if (!device) return;
      destSelector = device.target;
    }
    const target = document.querySelector(destSelector);
    const destName = getText().sectionTitles[destSelector.slice(1)] || destSelector;
    showTooltip(event.clientX, event.clientY, '→ ' + destName);
    setTimeout(hideTooltip, 1200);
    if (immersive) {
      // 沉浸模式：先退出全屏视角，再平滑滚动到目标板块
      setTimeout(() => {
        exitImmersive();
        setTimeout(() => { if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 380);
      }, 420);
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // ---- 动画循环（离屏自动暂停） ----
  const clock = new THREE.Clock();
  const parallax = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('mousemove', (event) => {
    parallax.tx = (event.clientX / window.innerWidth) * 2 - 1;
    parallax.ty = (event.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });
  let wordIndex = 0;
  let lastWordSwap = 0;

  function animate() {
    requestAnimationFrame(animate);
    if (!SCENE_ACTIVE.workspace) return;
    const t = clock.getElapsedTime();

    // 悬停设备轻微放大（缓动），增强"可点击"反馈
    deviceMap.forEach((d) => {
      const target = d.key === hoveredKey ? 1.06 : 1;
      const s = d.group.scale.x + (target - d.group.scale.x) * 0.12;
      d.group.scale.setScalar(s);
    });

    // 显示器文字轮播（每 2.4s，重绘 canvas 纹理）
    if (t - lastWordSwap > 2.4) {
      lastWordSwap = t;
      wordIndex = (wordIndex + 1) % monitorWords.length;
      const ordered = monitorWords.slice(wordIndex).concat(monitorWords.slice(0, wordIndex));
      const ctx = screen.ctx;
      const opts = screen.opts;
      ctx.fillStyle = opts.bg;
      ctx.fillRect(0, 0, opts.width, opts.height);
      ctx.strokeStyle = 'rgba(127, 214, 242, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 32; x < opts.width; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, opts.height); ctx.stroke(); }
      for (let y = 32; y < opts.height; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(opts.width, y); ctx.stroke(); }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const step = opts.height / (ordered.length + 1);
      ordered.forEach((line, i) => {
        const isAccent = i === 0;
        ctx.fillStyle = isAccent ? opts.accent : 'rgba(242, 244, 246, 0.85)';
        ctx.font = (isAccent ? '700 ' : '500 ') + (isAccent ? Math.round(step * 0.52) : Math.round(step * 0.4)) + 'px "Segoe UI", "PingFang SC", sans-serif';
        ctx.shadowColor = isAccent ? 'rgba(127, 214, 242, 0.55)' : 'transparent';
        ctx.shadowBlur = isAccent ? 18 : 0;
        ctx.fillText(line, opts.width / 2, step * (i + 1));
      });
      ctx.shadowBlur = 0;
      screen.texture.needsUpdate = true;
    }

    // 相机：常规视角 ↔ 沉浸视角平滑过渡；拖拽 360° 环视 + 鼠标微视差 + 缩放
    immT += ((immersive ? 1 : 0) - immT) * 0.055;
    parallax.x += (parallax.tx - parallax.x) * 0.05;
    parallax.y += (parallax.ty - parallax.y) * 0.05;
    // 惯性衰减
    if (!orbit.active) {
      orbit.yaw += orbit.velYaw;
      orbit.pitch = Math.max(-0.55, Math.min(0.5, orbit.pitch + orbit.velPitch));
      orbit.velYaw *= 0.93;
      orbit.velPitch *= 0.93;
    }
    const look = camBase.look.clone().lerp(camImm.look, immT);
    const desiredPos = camBase.pos.clone().lerp(camImm.pos, immT);
    const yaw = orbit.yaw * immT + parallax.x * (0.06 + immT * 0.2);
    const pitch = orbit.pitch * immT + parallax.y * (0.025 + immT * 0.1);
    const offset = desiredPos.clone().sub(look);
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    const rightAxis = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), offset).normalize();
    offset.applyAxisAngle(rightAxis, pitch);
    // 滚轮缩放（仅沉浸时有意义，immT 保证平滑回位）
    offset.setLength(offset.length() * (1 + (orbit.zoom - 1) * immT));
    camera.position.copy(look.clone().add(offset));
    camera.lookAt(look);
    // 沉浸模式视野稍广
    const targetFov = 42 + immT * 6;
    if (Math.abs(camera.fov - targetFov) > 0.05) {
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
    }

    // AI 悬浮体：缓慢自转 + 浮动 + 呼吸灯
    aiGroup.rotation.y = t * 0.4;
    aiGroup.position.y = 2.6 + Math.sin(t * 0.9) * 0.12;
    aiCore.material.opacity = 0.6 + Math.sin(t * 2.2) * 0.25;
    aiLight.intensity = 0.6 + Math.sin(t * 2.2) * 0.2;

    // 手机屏幕 / 硬盘指示灯呼吸
    phoneScreen.material.opacity = 0.4 + Math.sin(t * 1.4) * 0.12;

    // 台灯微闪（模拟真实灯泡，非常轻微）
    lampLight.intensity = 0.85 + Math.sin(t * 7.3) * 0.03;

    // 录制红点（此处为冷色）闪烁
    recDot.material.opacity = 0.5 + Math.sin(t * 3) * 0.4;

    renderer.render(scene, camera);
  }

  animate();
}

/* ============================================================
 * 场景 3：AIGC Cube（Portfolio 区域）
 * 玻璃 + 半透明 + 金属边框立方体，六面标签
 * 拖动旋转 / 悬停放大 / 点击 → COMING SOON（暂无对应项目）
 * ============================================================ */
function initCubeScene() {
  // 六个面 → 站内最相关板块（当前暂无独立 Portfolio 项目，跳到最相关内容）
  const CUBE_FACE_SECTION = {
    VISUAL: 'projects',
    DESIGN: 'projects',
    MOTION: 'experience',
    VIDEO: 'experience',
    AIGC: 'skills',
    INTERACTIVE: 'workspace'
  };

  const stage = document.getElementById('cubeStage');
  const canvas = document.getElementById('cubeCanvas');
  if (!stage || !canvas || !supports3D()) {
    const faces = Object.keys(CUBE_FACE_SECTION);
    showSceneFallback('cubeStage', 'cubeFallback', getText().fallbackCube, faces, (chip) => {
      const target = document.getElementById(CUBE_FACE_SECTION[chip]);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return;
  }

  observeSceneActive('cube', 'cube');

  // ---- 沉浸模式（点击进入 AIGC Cube 空间） ----
  let immersive = false;
  let immT = 0;
  let zoom = 1;
  const camBase = { pos: new THREE.Vector3(0, 0.4, 7.6), look: new THREE.Vector3(0, 0, 0) };
  const camImm = { pos: new THREE.Vector3(0, 0.55, 5.2), look: new THREE.Vector3(0, 0, 0) };
  const enterBtn = document.getElementById('cubeEnter');
  const exitBtn = document.getElementById('cubeExit');
  const immHint = document.getElementById('cubeImmersiveHint');
  if (enterBtn && !enterBtn.textContent) enterBtn.textContent = getText().enterCube;
  if (exitBtn && !exitBtn.textContent) exitBtn.textContent = getText().exitWorkspace;
  if (immHint && !immHint.textContent) immHint.textContent = getText().cubeImmersiveHint;
  const stageParent = stage.parentElement;
  const stageNext = stage.nextElementSibling;

  function enterImmersive() {
    if (immersive) return;
    immersive = true;
    // 祖先的 backdrop-filter / perspective 会劫持 fixed 定位——挂到 body 下
    document.body.appendChild(stage);
    stage.classList.add('immersive');
    document.body.classList.add('cube-immersive');
    if (enterBtn) enterBtn.hidden = true;
    if (exitBtn) exitBtn.hidden = false;
    if (immHint) immHint.hidden = false;
    canvas.style.cursor = 'grab';
    resize();
  }

  function exitImmersive() {
    if (!immersive) return;
    immersive = false;
    stage.classList.remove('immersive');
    document.body.classList.remove('cube-immersive');
    if (stageParent) stageParent.insertBefore(stage, stageNext);
    if (enterBtn) enterBtn.hidden = false;
    if (exitBtn) exitBtn.hidden = true;
    if (immHint) immHint.hidden = true;
    canvas.style.cursor = 'default';
    hideTooltip();
    resize();
  }

  if (enterBtn) enterBtn.addEventListener('click', enterImmersive);
  if (exitBtn) exitBtn.addEventListener('click', exitImmersive);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && immersive) exitImmersive();
  });

  canvas.addEventListener('wheel', (event) => {
    if (!immersive) return;
    event.preventDefault();
    zoom = Math.max(0.72, Math.min(1.45, zoom * (1 + event.deltaY * 0.0011)));
  }, { passive: false });

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 50);
  camera.position.set(0, 0.4, 7.6);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xBFD4E2, 0.6));
  const keyLight = new THREE.PointLight(0x7FD6F2, 1.2, 40);
  keyLight.position.set(4, 5, 6);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(0x5B79A8, 0.7, 40);
  rimLight.position.set(-5, -3, -4);
  scene.add(rimLight);
  const centerGlow = new THREE.PointLight(0x7FD6F2, 0.5, 10);
  centerGlow.position.set(0, 0, 0);
  scene.add(centerGlow);

  const cubeGroup = new THREE.Group();
  scene.add(cubeGroup);

  // 玻璃立方体本体
  const size = 2.5;
  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(size, size, size),
    new THREE.MeshPhongMaterial({
      color: 0x1B2836,
      transparent: true,
      opacity: 0.16,
      shininess: 90,
      specular: 0x9FD8EF,
      side: THREE.DoubleSide,
      depthWrite: false
    })
  );
  cubeGroup.add(glass);

  // 金属边框（12 条棱）
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size)),
    new THREE.LineBasicMaterial({ color: 0xC9D6E3, transparent: true, opacity: 0.85 })
  );
  cubeGroup.add(edges);

  // 角落金属节点
  const cornerMat = new THREE.MeshPhongMaterial({ color: 0x9AA6B5, shininess: 110, specular: 0xD6DEE8 });
  const cornerGeo = new THREE.SphereGeometry(0.07, 12, 10);
  const hs = size / 2;
  [[-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1], [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1]].forEach((s) => {
    const node = new THREE.Mesh(cornerGeo, cornerMat);
    node.position.set(s[0] * hs, s[1] * hs, s[2] * hs);
    cubeGroup.add(node);
  });

  // 六面标签（略浮于玻璃表面，双层文字：大字 + 小字方向词）
  const faceDefs = [
    { label: 'VISUAL', dir: [0, 0, 1] },
    { label: 'AIGC', dir: [0, 0, -1] },
    { label: 'INTERACTIVE', dir: [0, 1, 0] },
    { label: 'VIDEO', dir: [0, -1, 0] },
    { label: 'MOTION', dir: [1, 0, 0] },
    { label: 'DESIGN', dir: [-1, 0, 0] }
  ];
  const faceMeshes = [];
  const off = hs + 0.02;

  faceDefs.forEach((def) => {
    const tex = makeFaceTexture(def.label);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(size * 0.82, size * 0.82),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.92, depthWrite: false })
    );
    plane.position.set(def.dir[0] * off, def.dir[1] * off, def.dir[2] * off);
    if (def.dir[2] === -1) plane.rotation.y = Math.PI;
    if (def.dir[1] === 1) plane.rotation.x = -Math.PI / 2;
    if (def.dir[1] === -1) plane.rotation.x = Math.PI / 2;
    if (def.dir[0] === 1) plane.rotation.y = Math.PI / 2;
    if (def.dir[0] === -1) plane.rotation.y = -Math.PI / 2;
    plane.userData.baseScale = 1;
    cubeGroup.add(plane);
    faceMeshes.push(plane);
  });

  function makeFaceTexture(label) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 256, 256);
    // 角标记
    ctx.strokeStyle = 'rgba(127, 214, 242, 0.35)';
    ctx.lineWidth = 3;
    const m = 18, l = 26;
    ctx.beginPath();
    ctx.moveTo(m, m + l); ctx.lineTo(m, m); ctx.lineTo(m + l, m);
    ctx.moveTo(256 - m - l, m); ctx.lineTo(256 - m, m); ctx.lineTo(256 - m, m + l);
    ctx.moveTo(m, 256 - m - l); ctx.lineTo(m, 256 - m); ctx.lineTo(m + l, 256 - m);
    ctx.moveTo(256 - m - l, 256 - m); ctx.lineTo(256 - m, 256 - m); ctx.lineTo(256 - m, 256 - m - l);
    ctx.stroke();
    // 文字
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(127, 214, 242, 0.7)';
    ctx.shadowBlur = 16;
    let fontSize = 46;
    ctx.font = '700 ' + fontSize + 'px "Segoe UI", "Helvetica Neue", Arial, sans-serif';
    while (ctx.measureText(label).width > 200 && fontSize > 20) {
      fontSize -= 3;
      ctx.font = '700 ' + fontSize + 'px "Segoe UI", "Helvetica Neue", Arial, sans-serif';
    }
    ctx.fillText(label, 128, 128);
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(127, 214, 242, 0.7)';
    ctx.font = '500 15px "Segoe UI", sans-serif';
    ctx.fillText('0' + (faceDefs.indexOf(label) === -1 ? faceMeshes.length + 1 : faceDefs.indexOf(label) + 1), 128, 176);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  // ---- 拖动旋转 ----
  const drag = { active: false, lastX: 0, lastY: 0, velX: 0.0035, velY: 0.0012 };
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  // 沉浸模式专属：相机绕立方体 360° 环视轨道（偏航无限 + 俯仰限位 + 惯性）
  const orbit = { yaw: 0, pitch: 0, active: false, lastX: 0, lastY: 0, velYaw: 0, velPitch: 0 };

  canvas.addEventListener('pointerdown', (event) => {
    if (immersive) {
      // 沉浸模式：拖拽 = 环绕立方体环视（相机移动，立方体不动）
      orbit.active = true;
      orbit.lastX = event.clientX;
      orbit.lastY = event.clientY;
      canvas.style.cursor = 'grabbing';
      if (event.cancelable) event.preventDefault();
      return;
    }
    drag.active = true;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    canvas.style.cursor = 'grabbing';
    if (event.cancelable) event.preventDefault();
  });

  window.addEventListener('pointermove', (event) => {
    pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
    if (orbit.active) {
      const dx = event.clientX - orbit.lastX;
      const dy = event.clientY - orbit.lastY;
      orbit.yaw -= dx * 0.005;
      orbit.pitch -= dy * 0.004;
      orbit.pitch = Math.max(-1.1, Math.min(1.1, orbit.pitch));
      orbit.velYaw = -dx * 0.005 * 0.4;
      orbit.velPitch = -dy * 0.004 * 0.4;
      orbit.lastX = event.clientX;
      orbit.lastY = event.clientY;
      return;
    }
    if (!drag.active) return;
    const dx = event.clientX - drag.lastX;
    const dy = event.clientY - drag.lastY;
    cubeGroup.rotation.y += dx * 0.006;
    cubeGroup.rotation.x += dy * 0.005;
    cubeGroup.rotation.x = Math.max(-1.2, Math.min(1.2, cubeGroup.rotation.x));
    drag.velY = dx * 0.006;
    drag.velX = dy * 0.005;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
  }, { passive: true });

  window.addEventListener('pointerup', () => {
    drag.active = false;
    orbit.active = false;
    canvas.style.cursor = immersive ? 'grab' : 'grab';
  });

  // ---- 悬停放大 + 点击 ----
  const raycaster = new THREE.Raycaster();
  let hoveredFace = null;

  canvas.addEventListener('pointermove', (event) => {
    if (drag.active || orbit.active) { hoveredFace = null; hideTooltip(); return; }
    raycaster.setFromCamera(toNDC(event, canvas), camera);
    const hits = raycaster.intersectObjects(faceMeshes, false);
    const face = hits.length ? hits[0].object : null;
    if (face !== hoveredFace) {
      hoveredFace = face;
      if (face) {
        showTooltip(event.clientX, event.clientY, faceDefs[faceMeshes.indexOf(face)].label);
      } else {
        hideTooltip();
      }
    } else if (face) {
      showTooltip(event.clientX, event.clientY, faceDefs[faceMeshes.indexOf(face)].label);
    }
  });

  canvas.addEventListener('pointerleave', () => {
    hoveredFace = null;
    hideTooltip();
  });

  function showComingSoon(x, y) {
    showTooltip(
      typeof x === 'number' ? x : window.innerWidth / 2,
      typeof y === 'number' ? y : window.innerHeight / 2,
      getText().comingSoon
    );
    setTimeout(hideTooltip, 1800);
  }

  canvas.addEventListener('click', (event) => {
    if (drag.active) return;
    raycaster.setFromCamera(toNDC(event, canvas), camera);
    const hits = raycaster.intersectObjects(faceMeshes, false);
    if (!hits.length) return;
    // 点击面 → 前往站内最相关板块（悬停标签已显示面名称，这里提示去向）
    const faceIndex = faceMeshes.indexOf(hits[0].object);
    const label = faceDefs[faceIndex].label;
    const sectionKey = CUBE_FACE_SECTION[label];
    const target = document.getElementById(sectionKey);
    if (!target) {
      showComingSoon(event.clientX, event.clientY);
      return;
    }
    showTooltip(event.clientX, event.clientY, '→ ' + (getText().sectionTitles[sectionKey] || label));
    setTimeout(hideTooltip, 1600);
    if (immersive) {
      // 沉浸模式：先退出全屏，再平滑滚动到目标板块
      setTimeout(() => {
        exitImmersive();
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 380);
      }, 420);
      return;
    }
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
  });

  // ---- 尺寸 ----
  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // ---- 动画循环 ----
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!SCENE_ACTIVE.cube) return;
    const t = clock.getElapsedTime();

    // 相机：常规 ↔ 沉浸视角平滑过渡 + 滚轮缩放 + 沉浸 360° 环视轨道
    immT += ((immersive ? 1 : 0) - immT) * 0.06;
    // 环视惯性衰减
    if (!orbit.active) {
      orbit.yaw += orbit.velYaw;
      orbit.pitch = Math.max(-1.1, Math.min(1.1, orbit.pitch + orbit.velPitch));
      orbit.velYaw *= 0.93;
      orbit.velPitch *= 0.93;
    }
    const camLook = camBase.look.clone().lerp(camImm.look, immT);
    const camPos = camBase.pos.clone().lerp(camImm.pos, immT);
    camPos.setLength(camPos.length() * (1 + (zoom - 1) * immT));
    const camOffset = camPos.clone().sub(camLook);
    if (immT > 0.001 && (orbit.yaw !== 0 || orbit.pitch !== 0)) {
      camOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), orbit.yaw * immT);
      const rightAxis = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), camOffset).normalize();
      camOffset.applyAxisAngle(rightAxis, orbit.pitch * immT);
    }
    camera.position.copy(camLook.clone().add(camOffset));
    camera.lookAt(camLook);

    // 未拖动时：极缓慢自转 + 惯性衰减
    if (!drag.active) {
      cubeGroup.rotation.y += drag.velY;
      cubeGroup.rotation.x += drag.velX;
      cubeGroup.rotation.x = Math.max(-1.2, Math.min(1.2, cubeGroup.rotation.x));
      drag.velX += (0.0011 - drag.velX) * 0.02;
      drag.velY += (0.0032 - drag.velY) * 0.02;
    }

    // 悬停面放大（缓动）
    faceMeshes.forEach((face) => {
      const target = face === hoveredFace ? 1.14 : 1;
      face.scale.x += (target - face.scale.x) * 0.12;
      face.scale.y += (target - face.scale.y) * 0.12;
    });

    // 悬停时边框与中心光增强
    const hoverBoost = hoveredFace ? 0.5 : 0;
    centerGlow.intensity = 0.45 + Math.sin(t * 1.1) * 0.1 + hoverBoost;
    edges.material.opacity = 0.75 + Math.sin(t * 1.4) * 0.08 + hoverBoost * 0.2;

    // 轻微呼吸浮动
    cubeGroup.position.y = Math.sin(t * 0.8) * 0.08;

    renderer.render(scene, camera);
  }

  animate();
}

/* ============================================================
 * 全屏翻页：滚轮/键盘逐页切换 + 激活转场动画
 * - 桌面精确指针：wheel 驱动整页翻动（带锁），高内容页先内部滚动
 * - 触屏 / reduced-motion：原生滚动 + CSS snap，不劫持
 * - 沉浸模式 / PDF 弹窗打开时自动禁用
 * ============================================================ */
function initPageFlow() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hero = document.querySelector('section.hero');
  const cards = Array.from(document.querySelectorAll('.container > section.card'));
  const pages = hero ? [hero].concat(cards) : cards;
  if (pages.length < 2) return;

  let current = -1;
  let locked = false;
  let lockTimer = 0;

  function blocked() {
    return document.body.classList.contains('ws-immersive') ||
      document.body.classList.contains('cube-immersive') ||
      document.body.classList.contains('is-pdf-open');
  }

  function pageTop(i) {
    return pages[i].getBoundingClientRect().top + window.scrollY - 10;
  }

  function currentPageIndex() {
    const center = window.scrollY + window.innerHeight * 0.5;
    let best = 0;
    let bestDist = Infinity;
    pages.forEach((sec, i) => {
      const top = sec.getBoundingClientRect().top + window.scrollY;
      const dist = Math.abs(top + sec.offsetHeight * 0.5 - center);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    return best;
  }

  function goToPage(i) {
    i = Math.max(0, Math.min(pages.length - 1, i));
    locked = true;
    clearTimeout(lockTimer);
    lockTimer = setTimeout(() => { locked = false; }, 1000);
    window.scrollTo({ top: pageTop(i), behavior: 'smooth' });
    applyActive(i);
  }

  /* 右侧页码指示点（桌面端） */
  let dotBtns = [];
  if (finePointer && !reduced) {
    const dotsNav = document.createElement('nav');
    dotsNav.className = 'page-dots';
    dotsNav.setAttribute('aria-label', '页面导航');
    dotBtns = pages.map((sec, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      const h2 = sec.querySelector('h2, h1');
      b.setAttribute('aria-label', h2 ? h2.textContent : 'Page ' + (i + 1));
      b.addEventListener('click', () => goToPage(i));
      dotsNav.appendChild(b);
      return b;
    });
    document.body.appendChild(dotsNav);
  }

  function applyActive(i) {
    if (i === current) return;
    current = i;
    pages.forEach((sec, j) => sec.classList.toggle('page-active', j === i));
    dotBtns.forEach((d, j) => d.classList.toggle('active', j === i));
  }

  /* 滚动位置 → 激活页（rAF 节流） */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; applyActive(currentPageIndex()); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* 滚轮：只劫持「首页 → 下一页」这一次翻页转场，其余保持原生滚动 */
  window.addEventListener('wheel', (event) => {
    if (reduced || !finePointer || blocked()) return;
    if (locked) { event.preventDefault(); return; }
    if (event.deltaY <= 24) return;
    if (currentPageIndex() !== 0) return;
    // 已在首页底部（用户可能想先看完整 Hero）→ 翻页进入下一屏
    if (window.scrollY > 40) return;
    event.preventDefault();
    goToPage(1);
  }, { passive: false });

  window.addEventListener('resize', onScroll);
  applyActive(0);
  pages[0].classList.add('page-active');
  current = 0;
  if (dotBtns[0]) dotBtns[0].classList.add('active');
}

/* ============================================================
 * 启动
 * ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderResume();
  bindLanguageToggle();
  bindCopyEmail();
  bindPdfModal();
  bindTilt();
  bindReveal();
  init3DScene();
  initWorkspaceScene();
  initCubeScene();
  initPageFlow();
  // 滚动时收起 3D 悬停标签，避免残留
  window.addEventListener('scroll', hideTooltip, { passive: true });
});
