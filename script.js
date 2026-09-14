/* ============================================================
 * 3D 交互式简历 — 数据 + 渲染 + Three.js 场景
 * 依赖：three.min.js (CDN)。若加载失败，自动降级为无 3D 背景的静态版。
 * ============================================================ */

const defaultResumeData = {
  zh: {
    name: '发欧豆',
    heroTitle: '数字媒体艺术 / 艺术科技商业 · 工商管理硕士',
    location: '中国 · 上海',
    email: 'faoudou@example.com',
    heroEyebrow: '个人简历 · 3D INTERACTIVE',
    heroHint: '拖动背景旋转 · 滚动探索 ↓',
    degreeLabel: '学历',
    locationLabel: '地点',
    copy: '复制邮箱',
    copied: '已复制',
    copyFailed: '复制失败，请手动复制邮箱：',
    nav: ['关于', '教育', '经历', '项目', '技能', '联系'],
    sectionTitles: {
      about: '关于我',
      education: '教育背景',
      experience: '工作经历',
      projects: '项目',
      skills: '技能',
      contact: '联系我'
    },
    summary: '我是发欧豆，长期聚焦数字媒体艺术、创意科技与文化产业商业化的跨界实践。拥有工商管理硕士背景，能够从“艺术表达”和“商业落地”两个维度协同推动项目：在创意策展、互动体验、品牌传播与数字内容运营方面具备系统性思维，擅长把抽象的艺术理念转化为可执行的产品方案、可传播的叙事内容与可持续增长的商业模式。我的工作方式强调审美敏感度、数据驱动逻辑与跨团队协作能力，致力于在文化创新、艺术科技、品牌增长与社区参与之间建立高质量连接。',
    highlights: [
      '数字媒体艺术与创意科技项目统筹',
      '品牌传播、策展叙事与商业落地',
      '跨部门协作与项目管理',
      '数据复盘、参与转化与增长优化'
    ],
    education: [
      { degree: '工商管理硕士（MBA）', school: '某某大学 商学院', period: '2019 - 2021' },
      { degree: '数字媒体艺术与传播学双学位', school: '某某学院 传媒系', period: '2015 - 2019' },
      { degree: '视觉设计与品牌策划进修课程', school: '中国艺术设计培训中心', period: '2017 - 2018' }
    ],
    experience: [
      {
        role: '数字媒体艺术项目负责人',
        company: 'Aesthetic Lab 创意科技工作室',
        period: '2023.03 — 至今',
        details: [
          '负责数字媒体艺术项目的整体规划、创意表达与商业落地，推动艺术装置、互动媒体与品牌传播内容的跨界协同。',
          '统筹创意策划、技术对接、内容制作与发布节奏，确保每个项目能够同时兼顾审美价值、传播影响力与运营效果。',
          '带领跨部门团队完成从概念提案、视觉脚本、技术实现到活动落地的全流程管理，提升项目复用率与品牌认知度。',
          '与企业、展馆与文化机构建立长期合作机制，推动艺术科技项目从单次活动转向可持续运营的内容资产。'
        ]
      },
      {
        role: '艺术科技商业分析与运营顾问',
        company: '某文化创新产业联合体',
        period: '2021.09 — 2023.02',
        details: [
          '参与数字展览、互动体验与文化品牌项目的商业模式设计，结合市场调研、用户画像与参与数据，提升活动转化与品牌互动深度。',
          '负责项目收益分析、内容结构优化与社交传播策略，帮助文化项目从“品牌展示”升级为“持续参与型内容产品”。',
          '设计项目评估模型，包括参与率、留存率、品牌认知提升与合作转化指标，为决策层提供可执行建议。',
          '输出周/月度复盘报告与商业建议，支持资源配置、合作拓展与后续投资讨论。'
        ]
      },
      {
        role: '品牌内容与数字传播经理',
        company: '某大型文创品牌',
        period: '2020.06 — 2021.08',
        details: [
          '负责品牌数字内容体系搭建，统筹短视频、图片内容、H5体验与社交传播资产的开发与更新。',
          '推动品牌叙事向“艺术表达 + 商业价值 + 社区参与”方向升级，提升年轻用户触达效率与品牌好感度。',
          '联动设计、运营、销售与公关团队，保障品牌内容在不同渠道上的统一性与一致性。',
          '通过数据分析持续优化内容结构，提升互动率、关注转化与复购意愿。'
        ]
      },
      {
        role: '视觉设计与用户体验支持',
        company: '某新媒体传播机构',
        period: '2018.08 — 2020.05',
        details: [
          '参与品牌视觉体系、页面设计、展陈物料与数字内容脚本的策划与执行，强化内容的展示品质与传播一致性。',
          '协助完成从创意概念到成品落地的跨平台设计支持，包括海报、视频封面、页面动态与社交素材。',
          '围绕用户体验与传播效果开展优化迭代，提升内容的留白、节奏与阅读引导能力。',
          '为客户提供创意方案梳理、视觉深化与投放素材支持，提升项目交付效率与成效。'
        ]
      }
    ],
    projects: [
      { name: '城市公共艺术互动装置计划', description: '作为核心策划与运营负责人，联合城市文旅部门与企业合作方共同推进公共艺术互动装置项目，设计沉浸式体验路径、社交分享机制与现场活动编排。项目围绕“文化参与感 + 公共空间价值 + 商业协同”展开，成功提升周边消费活跃度与品牌曝光量，并形成可持续复用的内容资产。' },
      { name: '艺术科技商业孵化工作坊系列', description: '策划并实施一系列面向高校、创作团队与中小企业的艺术科技工作坊，帮助参与者从概念验证到商业表达进行系统支持。内容覆盖创意产品设计、体验原型测试、品牌叙事与合作谈判基础，帮助多个项目完成从“想法阶段”到“可展示成果”的跃迁。' },
      { name: '数字展览与沉浸式内容平台', description: '参与数字展览内容架构、互动环节设计与传播方案制定，围绕跨媒介叙事与用户参与体验打造完整的展示体系。该项目融合视频、空间设计、数据可视化与社交传播思路，推动展览从线下观展升级为线上线下联动传播的新型文化产品。' },
      { name: '品牌IP数字化传播与社交增长项目', description: '负责品牌IP的数字传播策略及内容运营设计，为产品与文化场景建立统一的视觉语言与传播节奏。通过内容矩阵、KOL协同、分层传播与复盘机制，实现品牌曝光、用户参与与社交裂变的协同增长，同时为后续品牌活动提供持续素材支持。' },
      { name: 'AI辅助创意内容生成体系', description: '基于数字内容生产需求，探索AI工具在脚本生成、素材筛选、视觉草图辅助与目标受众定位中的应用，建立兼顾效率与创意自由度的内容生产流程。该体系帮助团队缩短创意迭代周期，提高内容更新频率，并在保持审美质量的前提下提升团队工作效率。' },
      { name: '文化产业合作展示与招商支持', description: '协助组织文化场景、创意品牌与投资方的展示沟通，通过统一的项目叙事、数据呈现与创意演示材料帮助合作方快速理解项目价值。此类项目推动了展陈互动体验、校企合作、跨界联动与后续商业资源整合的有效落地。' }
    ],
    skills: ['数字媒体艺术策展', '艺术科技项目管理', '品牌传播与叙事', '互动体验设计', '跨界合作协调', '视觉设计基础', '数据分析与复盘', '社交媒体运营', '用户参与设计', '内容策略与规划', 'AI创意工具应用', '商业模式梳理'],
    links: [
      { label: '邮箱', value: 'faoudou@example.com', href: 'mailto:faoudou@example.com' },
      { label: '电话', value: '+86 138 0000 0000', href: null },
      { label: 'Behance / 个人作品集', value: '可根据需要添加', href: null },
      { label: '微信公众号 / 个人品牌', value: '可根据需要添加', href: null }
    ]
  },
  en: {
    name: 'Fa Oudou',
    heroTitle: 'Digital Media Art / Art-Tech Business · MBA',
    location: 'China · Shanghai',
    email: 'faoudou@example.com',
    heroEyebrow: 'RESUME · 3D INTERACTIVE',
    heroHint: 'Drag the background to rotate · Scroll to explore ↓',
    degreeLabel: 'Degree',
    locationLabel: 'Location',
    copy: 'Copy Email',
    copied: 'Copied',
    copyFailed: 'Copy failed. Please copy the email manually: ',
    nav: ['About', 'Education', 'Experience', 'Projects', 'Skills', 'Contact'],
    sectionTitles: {
      about: 'About Me',
      education: 'Education',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact Me'
    },
    summary: 'I am Fa Oudou, with a strong focus on digital media art, creative technology, and the commercialization of cultural innovation. Combining an MBA background with interdisciplinary practice in art, design, and media, I specialize in transforming creative concepts into actionable projects, memorable narratives, and scalable business opportunities. My work spans curatorial planning, interactive experiences, brand storytelling, digital content strategy, and cross-sector collaboration, with a consistent emphasis on aesthetic quality, user engagement, and measurable business value.',
    highlights: [
      'Digital media art and art-tech project coordination',
      'Brand storytelling, curation, and commercialization',
      'Cross-functional collaboration and project management',
      'Data review, engagement optimization, and growth support'
    ],
    education: [
      { degree: 'MBA', school: 'Some University, School of Business', period: '2019 - 2021' },
      { degree: 'Digital Media Art & Communication', school: 'Some College, Media Department', period: '2015 - 2019' },
      { degree: 'Visual Design & Brand Strategy', school: 'China Institute of Art Design', period: '2017 - 2018' }
    ],
    experience: [
      {
        role: 'Digital Media Art Project Lead',
        company: 'Aesthetic Lab Creative Technology Studio',
        period: '2023.03 — Present',
        details: [
          'Led the planning, creative development, and commercialization of digital media art and interactive projects, coordinating artistic vision, technical execution, and project delivery.',
          'Managed end-to-end project workflows from proposal, visual scripting, production, and launch to post-event evaluation and content repurposing.',
          'Built collaborative systems across design, technology, marketing, and partner teams to ensure projects delivered both expressive value and measurable impact.',
          'Established long-term partnerships with cultural institutions, brands, and public programs to transform one-off artistic activities into sustainable content platforms.'
        ]
      },
      {
        role: 'Art-Tech Business Analysis & Operations Consultant',
        company: 'Cultural Innovation Alliance',
        period: '2021.09 — 2023.02',
        details: [
          'Supported the business model design of digital exhibitions, immersive experiences, and cultural products through market research, user profiling, and participation analysis.',
          'Developed project evaluation frameworks covering engagement, retention, brand awareness, and conversion metrics to inform strategic decision-making.',
          'Prepared weekly and monthly reports with actionable recommendations for resource allocation, partnership expansion, and future investment opportunities.',
          'Improved project effectiveness by helping teams refine content structures, audience targeting, and social communication plans.'
        ]
      },
      {
        role: 'Brand Content & Digital Communication Manager',
        company: 'Cultural Brand Company',
        period: '2020.06 — 2021.08',
        details: [
          'Built a structured digital content system covering short-form video, visual storytelling, H5 experiences, and social media campaigns.',
          'Elevated brand messaging from traditional promotion to a model combining artistic expression, business value, and audience participation.',
          'Worked closely with design, operations, sales, and PR teams to maintain consistency across channels and improve brand recall.',
          'Optimized content strategy through data analysis, increasing engagement, follower conversion, and long-term community participation.'
        ]
      },
      {
        role: 'Visual Design & UX Support',
        company: 'New Media Communication Agency',
        period: '2018.08 — 2020.05',
        details: [
          'Supported campaign visuals, webpage design, exhibition materials, and digital content scripting, helping ensure a polished presentation and coherent communication system.',
          'Collaborated with clients to translate creative concepts into polished design outputs for posters, video covers, landing pages, and social assets.',
          'Refined visual pacing, readability, and user journey through iterative improvement and content performance feedback.',
          'Improved project delivery efficiency by providing consistent creative support across multiple client-facing outputs.'
        ]
      }
    ],
    projects: [
      { name: 'Urban Public Art Interactive Installation Program', description: 'Served as the core planner and operations lead for a public art interactive installation project in collaboration with city cultural departments and enterprise partners. The project focused on immersive experience design, social sharing mechanisms, and on-site event programming, successfully increasing surrounding commercial activity and expanding brand visibility while building reusable digital content assets.' },
      { name: 'Art-Tech Business Incubation Workshop Series', description: 'Designed and implemented a series of workshops for universities, creative teams, and SMEs, helping participants move from concept validation to commercially meaningful presentation. Workshops covered creative product design, prototype testing, brand storytelling, and partnership negotiation basics, enabling several projects to advance from idea-stage to showcase-ready outcomes.' },
      { name: 'Digital Exhibition and Immersive Content Platform', description: 'Contributed to digital exhibition architecture, interactive programming, and communication strategy, building a coherent system of narrative, experience design, data visualization, and social outreach. The project transformed traditional exhibition formats into a hybrid online-offline cultural experience with strong user participation.' },
      { name: 'Brand IP Digital Communication and Social Growth Program', description: 'Developed digital strategy and content operations for a brand IP, creating a unified visual language and communication rhythm across products and cultural scenarios. By combining content matrices, KOL coordination, layered distribution, and performance review, the project improved brand exposure, community engagement, and social conversion outcomes.' },
      { name: 'AI-Assisted Creative Content Generation System', description: 'Explored AI tools for script drafting, material selection, visual concept support, and audience segmentation, developing a production workflow that balances efficiency and creative freedom. The framework shortened creative iteration cycles and improved content update frequency while maintaining high aesthetic standards.' },
      { name: 'Cultural Industry Partnerships and Investment Support', description: 'Supported communication and presentation for cultural scenes, creative brands, and investors through structured storytelling, data visualization, and compelling presentation materials. These efforts improved understanding of project value and facilitated downstream partnership development, cross-sector collaboration, and commercialization opportunities.' }
    ],
    skills: ['Digital Media Art Curation', 'Art-Tech Project Management', 'Brand Communication & Storytelling', 'Interactive Experience Design', 'Cross-Sector Collaboration', 'Visual Design Fundamentals', 'Data Analysis & Review', 'Social Media Operations', 'User Engagement Design', 'Content Strategy & Planning', 'AI Creative Tool Application', 'Business Model Structuring'],
    links: [
      { label: 'Email', value: 'faoudou@example.com', href: 'mailto:faoudou@example.com' },
      { label: 'Phone', value: '+86 138 0000 0000', href: null },
      { label: 'Behance / Portfolio', value: 'Add as needed', href: null },
      { label: 'WeChat / Personal Brand', value: 'Add as needed', href: null }
    ]
  }
};

/* ============================================================
 * 状态
 * ============================================================ */
const STORAGE_KEY = 'resume_dynamic_data_v3';

const state = {
  language: 'zh',
  resumeData: loadResumeData()
};

function loadResumeData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return JSON.parse(JSON.stringify(defaultResumeData));
    return JSON.parse(saved);
  } catch (error) {
    return JSON.parse(JSON.stringify(defaultResumeData));
  }
}

function persistResumeData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.resumeData));
  } catch (error) {
    /* localStorage 不可用时静默降级 */
  }
}

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
  document.getElementById('aboutSummary').textContent = text.summary;

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
      const a = el('a', null, link.value);
      a.href = link.href;
      item.appendChild(a);
    } else {
      item.appendChild(el('span', null, link.value));
    }
    contactGrid.appendChild(item);
  });

  document.getElementById('year').textContent = new Date().getFullYear();
  document.title = text.name + (state.language === 'zh' ? ' · 3D 交互简历' : ' · 3D Interactive Resume');
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
      document.querySelectorAll('.lang-btn').forEach((b) => {
        const isActive = b === button;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });
      renderResume();
    });
  });
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
 * 3D 倾斜卡片（鼠标跟随透视）
 * ============================================================ */
function bindTilt() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  document.querySelectorAll('[data-tilt]').forEach((node) => {
    const maxTilt = node.classList.contains('hero-name') ? 8 : 5;

    node.addEventListener('mousemove', (event) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.transform = `rotateY(${x * maxTilt * 2}deg) rotateX(${-y * maxTilt * 2}deg) translateZ(6px)`;
    });

    node.addEventListener('mouseleave', () => {
      node.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
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
 * Three.js 3D 背景
 * 粒子星域 + 漂浮几何体 + 鼠标视差 + 拖拽旋转 + 滚动视差
 * ============================================================ */
function init3DScene() {
  const canvas = document.getElementById('bg3d');

  if (typeof THREE === 'undefined' || !canvas) {
    canvas.style.display = 'none'; // 降级：显示 CSS 光斑背景
    return;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x070b14, 0.055);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 14);

  // ---- 灯光 ----
  scene.add(new THREE.AmbientLight(0x334466, 1.2));

  const cyanLight = new THREE.PointLight(0x6ee7ff, 2.2, 60);
  cyanLight.position.set(8, 6, 10);
  scene.add(cyanLight);

  const violetLight = new THREE.PointLight(0xa78bfa, 2.0, 60);
  violetLight.position.set(-10, -4, 8);
  scene.add(violetLight);

  // ---- 粒子星域 ----
  const particleCount = 1400;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const palette = [new THREE.Color(0x6ee7ff), new THREE.Color(0xa78bfa), new THREE.Color(0xf0abfc), new THREE.Color(0xffffff)];

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
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }));
  scene.add(particles);

  // ---- 漂浮几何体 ----
  const shapes = [];
  const wireMat = (color, opacity) => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });
  const glassMat = (color) => new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.18, shininess: 80, flatShading: true });

  function addShape(geo, material, position, speed, scale) {
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.scale.setScalar(scale);
    mesh.userData.speed = speed;
    shapes.push(mesh);
    scene.add(mesh);
    return mesh;
  }

  addShape(new THREE.IcosahedronGeometry(2.2, 0), wireMat(0x6ee7ff, 0.5), [-9, 3, -6], 0.0035, 1);
  addShape(new THREE.TorusKnotGeometry(1.5, 0.42, 90, 14), glassMat(0xa78bfa), [10, -3, -8], 0.005, 1);
  addShape(new THREE.OctahedronGeometry(1.7, 0), wireMat(0xf0abfc, 0.45), [7, 5, -12], 0.0045, 1);
  addShape(new THREE.TorusGeometry(1.9, 0.32, 12, 60), wireMat(0xa78bfa, 0.4), [-11, -5, -10], 0.006, 1);
  addShape(new THREE.DodecahedronGeometry(1.4, 0), glassMat(0x6ee7ff), [0, -7, -9], 0.004, 1);
  addShape(new THREE.ConeGeometry(1.3, 2.6, 5), wireMat(0xffffff, 0.3), [-4, 8, -14], 0.0055, 1);

  // 核心大球体（磨砂玻璃感，位于标题后方）
  const coreSphere = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.2, 1),
    new THREE.MeshPhongMaterial({ color: 0x1a2b4a, transparent: true, opacity: 0.22, shininess: 90, flatShading: true })
  );
  coreSphere.position.set(0, 0.5, -4);
  scene.add(coreSphere);

  const coreWire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.35, 1),
    wireMat(0x6ee7ff, 0.22)
  );
  coreWire.position.copy(coreSphere.position);
  scene.add(coreWire);

  // ---- 交互状态 ----
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const drag = { active: false, lastX: 0, lastY: 0, rotY: 0, rotX: 0 };
  let scrollProgress = 0;

  window.addEventListener('mousemove', (event) => {
    pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  canvas.addEventListener('pointerdown', (event) => {
    drag.active = true;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });

  window.addEventListener('pointermove', (event) => {
    if (!drag.active) return;
    drag.rotY += (event.clientX - drag.lastX) * 0.004;
    drag.rotX += (event.clientY - drag.lastY) * 0.003;
    drag.rotX = Math.max(-0.6, Math.min(0.6, drag.rotX));
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
  }, { passive: true });

  window.addEventListener('pointerup', () => { drag.active = false; });

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

    // 指针平滑跟随（视差）
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;

    // 相机：鼠标视差 + 滚动下潜 + 拖拽旋转
    camera.position.x = pointer.x * 1.6;
    camera.position.y = -pointer.y * 1.1 - scrollProgress * 3.5;
    camera.position.z = 14 - scrollProgress * 3;

    if (!prefersReduced) {
      camera.lookAt(pointer.x * 0.6, -pointer.y * 0.4 - scrollProgress * 3, 0);
    } else {
      camera.lookAt(0, 0, 0);
    }

    // 拖拽旋转整个场景内容
    scene.rotation.y = drag.rotY;
    scene.rotation.x = drag.rotX;

    // 粒子缓慢漂移
    if (!prefersReduced) {
      particles.rotation.y = t * 0.02;
      particles.rotation.x = Math.sin(t * 0.1) * 0.03;
    }

    // 几何体自转 + 上下浮动
    if (!prefersReduced) {
      shapes.forEach((mesh, i) => {
        mesh.rotation.x += mesh.userData.speed;
        mesh.rotation.y += mesh.userData.speed * 1.4;
        mesh.position.y += Math.sin(t * 0.6 + i * 1.7) * 0.004;
      });
      coreSphere.rotation.y = t * 0.08;
      coreWire.rotation.y = -t * 0.06;
      coreWire.rotation.x = t * 0.04;

      // 核心球随滚动后退，制造纵深感
      const depth = Math.sin(Math.min(scrollProgress * 2, Math.PI)) * 6;
      coreSphere.position.z = -4 - depth;
      coreWire.position.z = coreSphere.position.z;
    }

    // 灯光呼吸
    cyanLight.intensity = 2.2 + Math.sin(t * 0.8) * 0.4;
    violetLight.intensity = 2.0 + Math.sin(t * 0.6 + 2) * 0.4;

    renderer.render(scene, camera);
  }

  animate();
}

/* ============================================================
 * 启动
 * ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderResume();
  bindLanguageToggle();
  bindCopyEmail();
  bindTilt();
  bindReveal();
  init3DScene();
});
