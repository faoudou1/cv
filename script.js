/**
 * 3D 交互式简历 — 数据 + 渲染 + Three.js 场景（浅色主题版）
 * 依赖：three.min.js (CDN)。若加载失败，自动降级为无 3D 背景的静态版。
 */

const defaultResumeData = {
  zh: {
    name: '朱肖尚',
    heroTitle: '艺术科技与商业硕士 · 岭南大学（中国香港）',
    location: '中国 · 香港',
    email: 'xiaoshangzhu@ln.hk',
    heroEyebrow: '求职意向 · 运营岗 / 设计岗',
    heroHint: '拖动背景旋转 · 滚动探索 ↓',
    degreeLabel: '学历',
    locationLabel: '现居',
    copy: '复制邮箱',
    copied: '已复制',
    copyFailed: '复制失败，请手动复制邮箱：',
    footerTag: '3D 交互式简历',
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
      education: '教育背景',
      experience: '实习经历',
      projects: '校园经历',
      skills: '个人技能',
      contact: '联系我'
    },
    summary: '具备扎实的专业知识与相关经验，学习与适应能力强，能快速响应工作需求。做事条理清晰、目标导向，善于分析并解决问题，注重细节与效率，能高效推动任务完成。拥有良好的团队协作精神与沟通能力，责任心强，渴望在岗位上创造实际价值，为团队目标与公司发展贡献积极力量。',
    highlights: [
      '求职意向：运营岗 / 设计岗',
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
    heroEyebrow: 'TARGET ROLES · OPERATIONS / DESIGN',
    heroHint: 'Drag the background to rotate · Scroll to explore ↓',
    degreeLabel: 'Degree',
    locationLabel: 'Based in',
    copy: 'Copy Email',
    copied: 'Copied',
    copyFailed: 'Copy failed. Please copy the email manually: ',
    footerTag: '3D Interactive Resume',
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
      education: 'Education',
      experience: 'Internships',
      projects: 'Campus Experience',
      skills: 'Skills',
      contact: 'Contact Me'
    },
    summary: 'With solid professional knowledge and hands-on experience, I learn and adapt quickly and respond to work demands efficiently. I work in an organized, goal-oriented way, am good at analysing and solving problems, and focus on detail and efficiency so tasks move forward fast. I am a strong team player with good communication skills and a strong sense of responsibility, eager to create real value in my role and contribute to team and company goals.',
    highlights: [
      'Target roles: Operations / Design',
      'B.A. Digital Media Art · Class of 2026',
      '3D modeling: 3ds Max / Blender / C4D',
      'Post-production: Pr / AE / PS / CapCut'
    ],
    education: [
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
      document.body.dataset.lang = state.language;
      document.querySelectorAll('.lang-btn').forEach((b) => {
        const isActive = b === button;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });
      renderResume();
    });
  });
  document.body.dataset.lang = state.language;
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
 * 中文版指向 assets/resume-zh.pdf，英文版指向 assets/resume-en.pdf
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

  // 关闭时卸载 iframe，停止后台继续渲染 PDF
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
 * Three.js 3D 背景（浅色主题配色）
 * 暖调微粒 + 陶土色线框几何体 + 鼠标视差 + 拖拽旋转 + 滚动视差
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
  // 雾色与页面底色一致，远景几何体自然融进米杏背景
  scene.fog = new THREE.FogExp2(0xF5F3EE, 0.02);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 14);

  // ---- 灯光（浅底：暖白环境光 + 陶土 / 雾蓝点光塑形） ----
  scene.add(new THREE.AmbientLight(0xffffff, 1.15));

  const warmLight = new THREE.PointLight(0xE7C9AE, 1.6, 70);
  warmLight.position.set(8, 6, 10);
  scene.add(warmLight);

  const coolLight = new THREE.PointLight(0xAFC0CF, 1.1, 70);
  coolLight.position.set(-10, -4, 8);
  scene.add(coolLight);

  // ---- 微粒（浅底改用正常混合 + 半透明，避免加色混合被冲白） ----
  const particleCount = 1400;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const palette = [new THREE.Color(0xA98D7C), new THREE.Color(0xC6A99A), new THREE.Color(0x8C8377), new THREE.Color(0x9FB0BD)];

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
    size: 0.11,
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.NormalBlending
  }));
  scene.add(particles);

  // ---- 漂浮几何体（陶土色调） ----
  const shapes = [];
  const wireMat = (color, opacity) => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });
  const glassMat = (color) => new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.42, shininess: 60, flatShading: true });

  function addShape(geo, material, position, speed, scale) {
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.scale.setScalar(scale);
    mesh.userData.speed = speed;
    shapes.push(mesh);
    scene.add(mesh);
    return mesh;
  }

  addShape(new THREE.IcosahedronGeometry(2.2, 0), wireMat(0xA98D7C, 0.5), [-9, 3, -6], 0.0035, 1);
  addShape(new THREE.TorusKnotGeometry(1.5, 0.42, 90, 14), glassMat(0xDCC6B4), [10, -3, -8], 0.005, 1);
  addShape(new THREE.OctahedronGeometry(1.7, 0), wireMat(0x8C8377, 0.45), [7, 5, -12], 0.0045, 1);
  addShape(new THREE.TorusGeometry(1.9, 0.32, 12, 60), wireMat(0x9FB0BD, 0.42), [-11, -5, -10], 0.006, 1);
  addShape(new THREE.DodecahedronGeometry(1.4, 0), glassMat(0xC6A99A), [0, -7, -9], 0.004, 1);
  addShape(new THREE.ConeGeometry(1.3, 2.6, 5), wireMat(0xB9A99B, 0.35), [-4, 8, -14], 0.0055, 1);

  // 核心球体（奶油陶土质感，位于标题后方，浅底上保持淡淡的存在感）
  const coreSphere = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.2, 1),
    new THREE.MeshPhongMaterial({ color: 0xE6D6C6, transparent: true, opacity: 0.5, shininess: 50, flatShading: true })
  );
  coreSphere.position.set(0, 0.5, -4);
  scene.add(coreSphere);

  const coreWire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.35, 1),
    wireMat(0x9C8878, 0.3)
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

  // 内容层在 canvas 之上，所以拖拽监听放在 window 上：
  // 命中链接/按钮/折叠面板/卡片/顶栏时不触发旋转，其余空白区域（Hero、卡片间隙）都可拖动。
  function isInteractiveTarget(target) {
    return !!(target && target.closest &&
      target.closest('a, button, summary, details, input, textarea, select, .card, .top-bar, .pdf-modal'));
  }

  window.addEventListener('pointerdown', (event) => {
    if (isInteractiveTarget(event.target)) return;
    if (event.pointerType === 'mouse' && event.cancelable) event.preventDefault();
    drag.active = true;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    document.body.classList.add('is-dragging');
  });

  window.addEventListener('pointermove', (event) => {
    if (!drag.active) return;
    drag.rotY += (event.clientX - drag.lastX) * 0.004;
    drag.rotX += (event.clientY - drag.lastY) * 0.003;
    drag.rotX = Math.max(-0.6, Math.min(0.6, drag.rotX));
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
  }, { passive: true });

  const endDrag = () => {
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
    warmLight.intensity = 1.6 + Math.sin(t * 0.8) * 0.25;
    coolLight.intensity = 1.1 + Math.sin(t * 0.6 + 2) * 0.2;

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
  bindPdfModal();
  bindTilt();
  bindReveal();
  init3DScene();
});
