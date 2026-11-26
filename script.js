/**
 * Daily Aesthetic Atelier — Neo-Atelier 3D 交互式简历与作品展厅
 * 依赖：three.min.js (CDN + onerror 本地兜底)。若 WebGL 不可用，自动降级为静态版。
 *
 * 三个 3D 场景：
 *  1. Hero 个人数字身份装置（全屏背景层，随页面滚动进度进行章节化运镜与构图切换）
 *  2. Digital Creative Workspace（About 区域旁 3D 工作台：显示器/简历本/台灯真实交互彩蛋）
 *  3. AIGC Cube（能力立方体控制器：点击六面联动高亮技能与作品集，支持 Reset / Show All）
 * 离屏场景通过 IntersectionObserver 真正停止 requestAnimationFrame 循环以节省性能。
 */

const PORTFOLIO_URL = 'https://dinuhua.app.workbuddy.host/?sharecode=QEYALK4J46';

/* 简历核心数据（严禁改动任何既有文案内容） */
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
    pdfFile: 'assets/resume-zh.pdf?v=20260929',
    pdfDownloadName: '朱肖尚简历.pdf',
    nav: ['关于', '教育', '实习', '校园', '作品', '技能', '联系'],
    railNav: ['关于', '教育', '实习', '校园', '作品', '技能', '联系'],
    sectionTitles: {
      about: '关于我',
      workspace: '数字创作工作台',
      education: '教育背景',
      experience: '实习经历',
      projects: '校园经历',
      works: '作品集',
      cube: 'AIGC 能力立方',
      skills: '个人技能',
      contact: '联系我'
    },
    availability: '求职中',
    themeToDark: '切换至展厅暗色模式',
    themeToLight: '切换至画廊浅色模式',
    toastThemeDark: '台灯已点亮 · 展厅暗色模式',
    toastThemeLight: '画廊自然光 · 浅色画廊模式',
    toastEmailCopied: '已复制邮箱：',
    focusLensCaption: 'ATB 聚焦视角',
    focusLensOptions: {
      all: '全部',
      'design-tech': '设计与技术',
      'ops-business': '运营与商业'
    },
    particleTooltipOff: '唤醒微光',
    particleTooltipOn: '收起微光 (ESC)',
    toastParticleOn: '✦ 发现隐藏光影彩蛋 · 移动鼠标雕塑微光，按住聚拢，点击星核跳转重点',
    toastParticleOff: '✦ 已回到静谧展厅背景',
    orbitalTop: '↑ 顶部',
    orbitalHero: '首页',
    starCores: [
      { id: 'about', label: '01 · 岭南 ATB' },
      { id: 'works', label: '02 · 3D 作品集' },
      { id: 'cube', label: '03 · AIGC 能力' },
      { id: 'contact', label: '04 · 联系我' }
    ],
    pfOpen: '新标签页打开',
    pfClose: '关闭',
    pfRoleLabel: '担任角色',
    pfOutcomeLabel: '核心亮点',
    cubeFilterAll: '重置 / 显示全部',
    cubeFilterPrompt: '点击立方体任意面或下方标签，联动高亮相关技能与作品',
    cubeFilterActive: '当前聚焦',
    cubeJumpWorks: '查看联动作品 ↑',
    cubeJumpSkills: '查看联动技能 ↓',
    matchedBadge: '能力匹配',
    cubeMatchSummary: '已聚焦 {face}：匹配 {skills} 项技能、{works} 件作品',
    workspaceLegend: {
      monitor: '显示器 → 作品预览',
      notebook: '简历本 → 简历 PDF',
      lamp: '台灯 → 明暗切换'
    },
    workspaceHint: '点击画面进入 3D 工作台 · 点击显示器/简历本/台灯触发彩蛋',
    enterWorkspace: '进入 3D 工作台',
    exitWorkspace: '退出 ✕',
    immersiveHint: '拖动 360° 环视 · 滚轮缩放 · 点击显示器/简历本/台灯触发彩蛋 · ESC 退出',
    cubeHint: '点击画面进入 · 拖动旋转 · 点击立方体六面联动筛选技能与作品',
    enterCube: '进入能力立方',
    cubeImmersiveHint: '拖动旋转 · 滚轮缩放 · 点击立方体面联动筛选技能与作品 · ESC 退出',
    comingSoon: '敬请期待',
    fallbackWorkspace: '数字创作工作台',
    fallbackCube: 'AIGC 能力立方 · 能力矩阵',
    deviceLabels: {
      desk: '数字工作台 · 关于我',
      monitor: '显示器 · 点击预览作品集',
      notebook: '简历本 · 点击打开简历 PDF',
      lamp: '台灯 · 点击切换明暗模式',
      camera: '影像与媒体 · 实习经历',
      tablet: '视觉设计 · 校园经历',
      keyboard: '创意工具 · 个人技能',
      phone: '互动体验 · 联系我',
      ai: 'AIGC · 个人技能'
    },
    sceneText: {
      screenWords: ['数字媒体', '互动体验', '视觉设计', 'AIGC', '动效影像', '视觉叙事'],
      tabletWords: ['视觉', '设计'],
      cubeFaces: {
        VISUAL: '视觉',
        AIGC: 'AIGC',
        INTERACTIVE: '互动',
        VIDEO: '影像',
        MOTION: '动效',
        DESIGN: '设计'
      }
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
    ],
    works: {
      enter: '进入作品 →',
      items: [
        {
          id: 'dinuhua',
          tag: '交互叙事 · 毕业设计',
          title: '帝女花',
          desc: '情景式互动叙事游戏：玩家以抉择推动粤剧《帝女花》剧情走向，融合分支叙事、影像演出与 AI 生成的视听语言。',
          cover: '❀',
          modalTitle: '帝女花 · 互动叙事作品集',
          url: 'https://dinuhua.app.workbuddy.host/?sharecode=QEYALK4J46'
        },
        {
          id: 'milkfrog',
          tag: '互动 SVG · 个人小作品',
          title: '牛奶蛙破風日記',
          desc: '纯手写 SVG + 原生 JavaScript 的互动骑行小场景：一只大肚奶蛙踩著「破風號」前進，可切换晴／雨／夜三种天气，并用冲刺、喂蚊、呱呱喇叭、翘孤轮等按钮触发实时动画，顶部还配了会跳动的骑行码表。',
          cover: '🐸',
          modalTitle: '牛奶蛙破風日記 · 互动 SVG 小场景',
          url: 'works/milk-frog-bike.html'
        },
        {
          id: 'tripcraft',
          tag: '智慧旅游 · 互动地图轻应用',
          title: '行策 · 智旅攻略',
          desc: '覆盖中国内地 28 座热门旅游城市与港澳地区的旅行攻略规划轻应用：支持单城深度与多城跨城联游编排、高德/OSM 互动路线巡航地图、预算拆解、繁简英三语实时切换、专属网址分享与旅人邮戳护照彩蛋。',
          cover: '🧭',
          modalTitle: '行策 · 智旅攻略 · 中国旅游路线规划',
          url: 'https://xingce-tripcraft.netlify.app'
        },
        {
          id: 'lingnan-nova',
          tag: 'Three.js 3D · 建筑可视化',
          title: 'NOVA 岭南站 · 3D 商业地标',
          desc: '基于 Vite + Three.js 打造的佛山岭南站交互式 3D 建筑可视化：包含流线型物理玻璃幕墙、多楼层挑空中庭与交叉扶梯、110 位实时行人流模拟与奢尚品牌灯箱，支持多视角平滑转场、日间／黄昏蓝调光照过渡，以及「圣诞奇幻季／平日商业版」一键主题切换。',
          cover: '🏙️',
          modalTitle: 'NOVA 岭南站 · 3D 交互式建筑可视化',
          url: 'works/lingnan-station-nova/index.html'
        }
      ]
    }
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
    pdfFile: 'assets/resume-en.pdf?v=20260929',
    pdfDownloadName: 'Zhu_Xiaoshang_Resume_EN.pdf',
    nav: ['About', 'Education', 'Internships', 'Campus', 'Works', 'Skills', 'Contact'],
    railNav: ['ABOUT', 'EDUCATION', 'INTERNSHIPS', 'CAMPUS', 'WORKS', 'SKILLS', 'CONTACT'],
    sectionTitles: {
      about: 'About Me',
      workspace: 'Digital Creative Workspace',
      education: 'Education',
      experience: 'Internships',
      projects: 'Campus Experience',
      works: 'Featured Works',
      cube: 'AIGC Cube',
      skills: 'Skills',
      contact: 'Contact Me'
    },
    availability: 'Open to Work',
    themeToDark: 'Switch to Dark Exhibition Mode',
    themeToLight: 'Switch to Light Gallery Mode',
    toastThemeDark: 'Desk Lamp On · Dark Exhibition Mode',
    toastThemeLight: 'Gallery Daylight · Light Gallery Mode',
    toastEmailCopied: 'Email copied: ',
    focusLensCaption: 'ATB Focus Lens',
    focusLensOptions: {
      all: 'All',
      'design-tech': 'Design & Tech',
      'ops-business': 'Ops & Business'
    },
    particleTooltipOff: 'Awaken Particles',
    particleTooltipOn: 'Exit Atelier (ESC)',
    toastParticleOn: '✦ Particle Atelier awakened · Move to sculpt light, hold to gather, click star cores to jump',
    toastParticleOff: '✦ Returned to ambient gallery backdrop',
    orbitalTop: '↑ TOP',
    orbitalHero: 'TOP',
    starCores: [
      { id: 'about', label: '01 · Lingnan ATB' },
      { id: 'works', label: '02 · 3D Works' },
      { id: 'cube', label: '03 · AIGC Cube' },
      { id: 'contact', label: '04 · Contact' }
    ],
    pfOpen: 'Open in new tab',
    pfClose: 'Close',
    pfRoleLabel: 'ROLE',
    pfOutcomeLabel: 'KEY HIGHLIGHTS',
    cubeFilterAll: 'Reset / Show All',
    cubeFilterPrompt: 'Click any cube face or tag below to highlight linked skills & works',
    cubeFilterActive: 'Active Focus',
    cubeJumpWorks: 'View Works ↑',
    cubeJumpSkills: 'View Skills ↓',
    matchedBadge: 'MATCHED',
    cubeMatchSummary: 'Focused on {face}: {skills} skills & {works} works matched',
    workspaceLegend: {
      monitor: 'Monitor → Portfolio',
      notebook: 'Notebook → Resume PDF',
      lamp: 'Desk Lamp → Light / Dark'
    },
    workspaceHint: 'Click to enter 3D workspace · click Monitor / Notebook / Lamp for shortcuts',
    enterWorkspace: 'Enter 3D Workspace',
    exitWorkspace: 'Exit ✕',
    immersiveHint: 'Drag for 360° view · scroll to zoom · click Monitor / Notebook / Lamp · ESC to exit',
    cubeHint: 'Click to enter · drag to rotate · click a face to highlight linked skills & works',
    enterCube: 'Enter AIGC Cube',
    cubeImmersiveHint: 'Drag for 360° view · scroll to zoom · click a face to filter skills & works · ESC to exit',
    comingSoon: 'COMING SOON',
    fallbackWorkspace: 'Digital Creative Workspace',
    fallbackCube: 'AIGC Cube · Capability Matrix',
    deviceLabels: {
      desk: 'DIGITAL WORKSPACE · ABOUT',
      monitor: 'MONITOR · OPEN PORTFOLIO',
      notebook: 'NOTEBOOK · OPEN RESUME PDF',
      lamp: 'DESK LAMP · TOGGLE THEME',
      camera: 'VIDEO / MEDIA · INTERNSHIPS',
      tablet: 'VISUAL DESIGN · CAMPUS',
      keyboard: 'CREATIVE TOOLS · SKILLS',
      phone: 'INTERACTIVE · CONTACT',
      ai: 'AIGC · SKILLS'
    },
    sceneText: {
      screenWords: ['DIGITAL MEDIA', 'INTERACTIVE', 'DESIGN', 'AIGC', 'MOTION', 'VISUAL'],
      tabletWords: ['VISUAL', 'DESIGN'],
      cubeFaces: {
        VISUAL: 'VISUAL',
        AIGC: 'AIGC',
        INTERACTIVE: 'INTERACTIVE',
        VIDEO: 'VIDEO',
        MOTION: 'MOTION',
        DESIGN: 'DESIGN'
      }
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
    ],
    works: {
      enter: 'Enter work →',
      items: [
        {
          id: 'dinuhua',
          tag: 'Interactive Narrative · Capstone',
          title: 'The Flower Princess',
          desc: 'A branching interactive narrative game built on the Cantonese opera "The Flower Princess": your choices steer the story, blending narrative design, cinematic staging and AI-generated audiovisuals.',
          cover: '❀',
          modalTitle: 'The Flower Princess · Interactive Narrative',
          url: 'https://dinuhua.app.workbuddy.host/?sharecode=QEYALK4J46'
        },
        {
          id: 'milkfrog',
          tag: 'Interactive SVG · Side Project',
          title: 'Milk Frog Road Cycling',
          desc: 'A hand-coded SVG + vanilla JavaScript cycling vignette: a chubby milk frog rides the "Breakwind" road bike. Switch between sunny, rainy and night weather, and trigger sprint, bug-feeding, croak-horn and wheelie animations — all wired to a live cycling computer at the top.',
          cover: '🐸',
          modalTitle: 'Milk Frog Road Cycling · Interactive SVG Scene',
          url: 'works/milk-frog-bike.html'
        },
        {
          id: 'tripcraft',
          tag: 'Smart Travel · Interactive Map App',
          title: 'TripCraft · China Guide',
          desc: 'An interactive travel itinerary planner covering 28 top cities across Mainland China, Hong Kong & Macau: supports single- and multi-city loops, Amap/OSM route-tour maps, budget breakdown, Traditional/Simplified Chinese & English switching, shareable trip URLs, and a stamp passport with hidden Easter eggs.',
          cover: '🧭',
          modalTitle: 'TripCraft · China Travel Itinerary Planner',
          url: 'https://xingce-tripcraft.netlify.app'
        },
        {
          id: 'lingnan-nova',
          tag: 'Three.js 3D · ArchViz',
          title: 'NOVA Lingnan Station · 3D Landmark',
          desc: 'An interactive 3D architectural visualization of Foshan Lingnan Station (NOVA) built with Vite + Three.js: streamlined physical glass facade, multi-level atrium with crisscrossed escalators, 110 animated instanced pedestrians, illuminated luxury billboards, smooth camera presets, Daylight/Blue-Hour lighting, and real-time Christmas/Everyday theme switching.',
          cover: '🏙️',
          modalTitle: 'NOVA Lingnan Station · 3D Architectural Visualization',
          url: 'works/lingnan-station-nova/index.html'
        }
      ]
    }
  }
};

/* 作品集结构化元数据（Bento 卡片 Pills 与弹窗速览栏） */
const WORK_META = {
  dinuhua: {
    featured: true,
    cursor: 'PLAY',
    role: { zh: '主创 · 交互叙事设计', en: 'Lead · Interactive Narrative' },
    stack: ['Branching Story', 'AIGC Audiovisuals', 'Interactive Web'],
    outcome: {
      zh: '将粤剧《帝女花》重构为分支抉择体验，融合影像演出与 AI 生成视听语言。',
      en: 'Reimagines Cantonese opera "The Flower Princess" into a branching choice game with AI audiovisuals.'
    }
  },
  milkfrog: {
    featured: false,
    cursor: 'PLAY',
    role: { zh: '独立开发 · 互动 SVG', en: 'Solo Dev · Interactive SVG' },
    stack: ['Hand-coded SVG', 'Vanilla JS', 'Live Telemetry'],
    outcome: {
      zh: '纯手写 SVG 与原生 JS 实时骑行动画，集成晴/雨/夜三天气与跳动骑行码表。',
      en: 'Hand-coded SVG + vanilla JS cycling animation with 3 weather states & live cycling computer.'
    }
  },
  tripcraft: {
    featured: false,
    cursor: 'EXPLORE',
    role: { zh: '产品策划 · 地图交互', en: 'Product · Map Interaction' },
    stack: ['Amap / OSM', 'Trilingual UI', 'Route Planner'],
    outcome: {
      zh: '覆盖内地 28 城及港澳地区，支持多城联游巡航地图、预算拆解与繁简英三语切换。',
      en: 'Covers 28 Mainland cities + HK/Macau with multi-city routing, budget breakdown & trilingual UI.'
    }
  },
  'lingnan-nova': {
    featured: true,
    cursor: 'VIEW 3D',
    role: { zh: '3D 场景与交互开发', en: '3D Scene & Interactive Dev' },
    stack: ['Vite', 'Three.js', 'PBR Glass'],
    outcome: {
      zh: '物理玻璃幕墙、110 位实时行人流模拟、日间/黄昏蓝调光照与主题一键切换。',
      en: 'Physical glass facade, 110 instanced pedestrians, Daylight/Blue-Hour lighting & theme toggle.'
    }
  }
};

/* AIGC Cube 六面 → 技能索引（0-based）与作品集 ID 联动映射 */
const CUBE_FACE_MAPPING = {
  VISUAL: { skillIndices: [5, 6, 7, 10], workIds: ['lingnan-nova', 'dinuhua'] },
  AIGC: { skillIndices: [6, 9, 10, 11], workIds: ['dinuhua', 'tripcraft'] },
  INTERACTIVE: { skillIndices: [5, 6, 9], workIds: ['dinuhua', 'milkfrog', 'tripcraft', 'lingnan-nova'] },
  VIDEO: { skillIndices: [8, 9, 11], workIds: ['dinuhua'] },
  MOTION: { skillIndices: [7, 8, 9, 11], workIds: ['milkfrog', 'lingnan-nova'] },
  DESIGN: { skillIndices: [5, 7, 10], workIds: ['lingnan-nova', 'tripcraft', 'milkfrog'] }
};

const CUBE_FACE_ORDER = ['VISUAL', 'AIGC', 'INTERACTIVE', 'VIDEO', 'MOTION', 'DESIGN'];

/* ATB 双重视角聚焦映射（非破坏性高亮） */
const FOCUS_LENS_MAP = {
  highlights: {
    0: ['design-tech'],
    1: ['ops-business', 'design-tech'],
    2: ['design-tech'],
    3: ['design-tech'],
    4: ['design-tech', 'ops-business']
  },
  education: {
    0: ['ops-business', 'design-tech'],
    1: ['design-tech']
  },
  experience: {
    0: ['ops-business', 'design-tech'],
    1: ['ops-business'],
    2: ['design-tech']
  },
  projects: {
    0: ['ops-business']
  },
  works: {
    dinuhua: ['design-tech'],
    milkfrog: ['design-tech'],
    tripcraft: ['ops-business'],
    'lingnan-nova': ['design-tech', 'ops-business']
  },
  skills: {
    0: ['ops-business'],
    1: ['ops-business'],
    2: ['ops-business'],
    3: ['ops-business'],
    4: ['ops-business'],
    5: ['design-tech'],
    6: ['design-tech'],
    7: ['design-tech'],
    8: ['design-tech', 'ops-business'],
    9: ['design-tech'],
    10: ['design-tech', 'ops-business'],
    11: ['ops-business', 'design-tech']
  }
};

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ============================================================
 * 状态与主题系统
 * ============================================================ */
const cloneData = (data) => JSON.parse(JSON.stringify(data));

const state = {
  language: 'zh',
  theme: 'light',
  activeCubeFace: null,
  focusLens: 'all',
  particleAtelier: false,
  resumeData: cloneData(defaultResumeData)
};

function getText() {
  return state.resumeData[state.language];
}

const sceneTextRefreshers = [];
function onSceneTextRefresh(fn) {
  if (typeof fn === 'function') sceneTextRefreshers.push(fn);
}
function refreshSceneText() {
  sceneTextRefreshers.forEach((fn) => {
    try { fn(); } catch (error) { /* 忽略未初始化场景 */ }
  });
}

const themeChangeListeners = [];
function onThemeChange(fn) {
  if (typeof fn === 'function') themeChangeListeners.push(fn);
}

const cubeVisualRefreshers = [];
function onCubeVisualRefresh(fn) {
  if (typeof fn === 'function') cubeVisualRefreshers.push(fn);
}

function getSceneText(key, fallback) {
  const sceneText = getText().sceneText || {};
  return sceneText[key] || fallback;
}

function getCubeFaceText(faceKey) {
  const faces = getSceneText('cubeFaces', {});
  return faces[faceKey] || faceKey;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* ============================================================
 * 浮动 Toast 通知
 * ============================================================ */
let toastTimer = 0;
function showToast(message, durationMs) {
  const toast = document.getElementById('atelierToast');
  if (!toast || !message) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toast.setAttribute('aria-hidden', 'false');
  toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
    toast.setAttribute('aria-hidden', 'true');
  }, durationMs || 2600);
}

/* ============================================================
 * 双主题切换（Light Gallery Mode ↔ Dark Exhibition Mode）
 * ============================================================ */
function updateThemeToggleUI() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeToggleIcon');
  const text = getText();
  const isDark = state.theme === 'dark';
  if (icon) icon.textContent = isDark ? '☀' : '◐';
  if (btn) {
    const label = isDark ? text.themeToLight : text.themeToDark;
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
    btn.setAttribute('aria-pressed', String(isDark));
  }
}

function applyTheme(nextTheme, options) {
  const opts = options || {};
  const normalized = nextTheme === 'dark' ? 'dark' : 'light';
  state.theme = normalized;
  document.documentElement.dataset.theme = normalized;
  updateThemeToggleUI();

  themeChangeListeners.forEach((fn) => {
    try { fn(normalized); } catch (error) { /* 忽略场景未就绪 */ }
  });
  refreshSceneText();

  if (!opts.silent) {
    const text = getText();
    showToast(normalized === 'dark' ? text.toastThemeDark : text.toastThemeLight);
  }
}

function toggleTheme(silent) {
  applyTheme(state.theme === 'light' ? 'dark' : 'light', { silent: !!silent });
}

/* ============================================================
 * 渲染主简历内容
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

  const availText = document.getElementById('availabilityText');
  if (availText) availText.textContent = text.availability;

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
  text.highlights.forEach((item, idx) => {
    const span = el('span', 'highlight-item', item);
    span.dataset.highlightIndex = String(idx);
    highlights.appendChild(span);
  });

  // 教育背景
  const educationList = document.getElementById('educationList');
  educationList.innerHTML = '';
  text.education.forEach((item, idx) => {
    const row = el('div', 'list-item');
    row.dataset.eduIndex = String(idx);
    row.appendChild(el('strong', null, item.degree + ' — ' + item.school));
    row.appendChild(el('p', 'meta', item.period));
    if (item.note) row.appendChild(el('p', 'desc', item.note));
    educationList.appendChild(row);
  });

  // 实习经历
  const experienceList = document.getElementById('experienceList');
  experienceList.innerHTML = '';
  text.experience.forEach((item, idx) => {
    const article = el('article', 'article interactive-item');
    article.dataset.expIndex = String(idx);
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

  // 校园经历
  const projectsList = document.getElementById('projectsList');
  projectsList.innerHTML = '';
  text.projects.forEach((item, idx) => {
    const row = el('div', 'list-item');
    row.dataset.projIndex = String(idx);
    row.appendChild(el('strong', null, item.name));
    row.appendChild(el('p', 'desc', item.description));
    projectsList.appendChild(row);
  });

  // 个人技能（记录 0-based index 以便与 AIGC Cube 联动）
  const skillsGrid = document.getElementById('skillsGrid');
  skillsGrid.innerHTML = '';
  text.skills.forEach((skill, idx) => {
    const pill = el('span', 'skill-pill', skill);
    pill.dataset.skillIndex = String(idx);
    skillsGrid.appendChild(pill);
  });

  // 联系方式
  const contactGrid = document.getElementById('contactGrid');
  contactGrid.innerHTML = '';
  text.links.forEach((link) => {
    const item = el('div', 'contact-item');
    item.appendChild(el('span', 'label', link.label));
    if (link.href) {
      const a = el('a', link.pdf ? 'pdf-trigger' : null, link.value);
      a.href = link.href;
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

  // 作品集 Bento Grid + 辅助控制条
  renderWorks(text.works);
  renderWorkspaceLegend();
  applyCubeFilterUI();
  renderFocusLensUI();
  applyFocusLensUI();
  scheduleOrbitalLayout();
  renderStarCores();
  updateParticleTriggerUI();
  updateThemeToggleUI();

  // 如果作品弹窗已打开，同步切换语言后的速览信息
  if (pfCurrentWorkId) {
    const modal = document.getElementById('pfModal');
    if (modal && modal.classList.contains('open')) {
      syncPortfolioModalMeta(pfCurrentWorkId);
    }
  }

  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('footerName').textContent = text.name;
  document.getElementById('footerTag').textContent = text.footerTag;
  document.title = text.name + ' · Digital Creative Portfolio';

  refreshSceneText();
}

/* 工作台彩蛋捷径条（可点击直接体验，与 3D 场景点击完全等价） */
function renderWorkspaceLegend() {
  const container = document.getElementById('workspaceLegend');
  if (!container) return;
  const legend = getText().workspaceLegend || {};
  container.textContent = '';

  const actions = [
    { key: 'monitor', label: legend.monitor, onClick: () => openPortfolio('dinuhua') },
    { key: 'notebook', label: legend.notebook, onClick: () => openResumePdf() },
    { key: 'lamp', label: legend.lamp, onClick: () => toggleTheme(false) }
  ];

  actions.forEach((item) => {
    if (!item.label) return;
    const chip = el('button', 'legend-chip', item.label);
    chip.type = 'button';
    chip.dataset.easterEgg = item.key;
    chip.addEventListener('click', item.onClick);
    container.appendChild(chip);
  });
}

/* 作品集 Bento 网格渲染 */
function renderWorks(works) {
  const list = document.getElementById('worksList');
  if (!list || !works || !Array.isArray(works.items)) return;
  list.textContent = '';
  const lang = state.language;

  works.items.forEach((item, index) => {
    const meta = WORK_META[item.id] || {};
    const card = el('article', 'work-card');
    if (meta.featured) card.classList.add('work-card--featured');
    card.dataset.workId = item.id;
    card.dataset.cursorLabel = meta.cursor || 'EXPLORE';

    const cover = el('button', 'work-cover work-cover--' + item.id);
    cover.type = 'button';
    cover.dataset.work = item.id;
    cover.setAttribute('aria-label', item.modalTitle);

    const idxBadge = el('span', 'work-cover-index', '0' + (index + 1));
    idxBadge.setAttribute('aria-hidden', 'true');
    cover.appendChild(idxBadge);

    const emoji = el('span', 'work-cover-emoji', item.cover);
    emoji.setAttribute('aria-hidden', 'true');
    cover.appendChild(emoji);
    cover.appendChild(el('span', 'work-cover-cta', works.enter));

    const info = el('div', 'work-info');
    const tagRow = el('div', 'work-tag-row');
    tagRow.appendChild(el('span', 'work-tag', item.tag));
    const matchBadge = el('span', 'work-match-badge', getText().matchedBadge);
    matchBadge.hidden = true;
    tagRow.appendChild(matchBadge);
    info.appendChild(tagRow);

    info.appendChild(el('h3', 'work-title', item.title));

    // Monospace 角色与技术栈标签
    const metaPills = el('div', 'work-meta-pills');
    const roleText = meta.role ? (meta.role[lang] || meta.role.zh) : '';
    if (roleText) {
      metaPills.appendChild(el('span', 'work-pill work-pill--role', roleText));
    }
    if (Array.isArray(meta.stack)) {
      meta.stack.forEach((tech) => {
        metaPills.appendChild(el('span', 'work-pill work-pill--tech', tech));
      });
    }
    info.appendChild(metaPills);

    info.appendChild(el('p', 'work-desc', item.desc));
    const enter = el('button', 'btn work-enter-btn', works.enter);
    enter.type = 'button';
    enter.dataset.work = item.id;
    info.appendChild(enter);

    card.appendChild(cover);
    card.appendChild(info);
    list.appendChild(card);
  });
}

/* ============================================================
 * AIGC Cube 联动控制器（技能高亮 + 作品筛选 + Reset / Show All）
 * ============================================================ */
function setCubeFilter(faceKey, options) {
  const opts = options || {};
  const normalized = CUBE_FACE_MAPPING[faceKey] ? faceKey : null;
  if (!normalized || state.activeCubeFace === normalized) {
    resetCubeFilter();
    return;
  }
  state.activeCubeFace = normalized;
  applyCubeFilterUI();

  if (!opts.silent) {
    const mapping = CUBE_FACE_MAPPING[normalized];
    const text = getText();
    const summary = (text.cubeMatchSummary || '')
      .replace('{face}', getCubeFaceText(normalized))
      .replace('{skills}', String(mapping.skillIndices.length))
      .replace('{works}', String(mapping.workIds.length));
    if (summary) showToast(summary, 2800);
  }
}

function resetCubeFilter() {
  state.activeCubeFace = null;
  applyCubeFilterUI();
}

function buildFilterStatusBar(targetEl, faceKey, jumpSelector, jumpLabel) {
  if (!targetEl) return;
  const text = getText();
  if (!faceKey || !CUBE_FACE_MAPPING[faceKey]) {
    targetEl.hidden = true;
    targetEl.textContent = '';
    return;
  }

  targetEl.hidden = false;
  targetEl.textContent = '';

  const info = el('div', 'filter-bar-info');
  info.appendChild(el('span', 'filter-bar-badge', getCubeFaceText(faceKey)));
  info.appendChild(el('span', null, text.cubeFilterActive));

  const actions = el('div', 'filter-bar-actions');
  if (jumpSelector && jumpLabel) {
    const jumpBtn = el('button', 'filter-jump-btn', jumpLabel);
    jumpBtn.type = 'button';
    jumpBtn.addEventListener('click', () => {
      const target = document.querySelector(jumpSelector);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    actions.appendChild(jumpBtn);
  }

  const resetBtn = el('button', 'filter-reset-btn', text.cubeFilterAll);
  resetBtn.type = 'button';
  resetBtn.addEventListener('click', resetCubeFilter);
  actions.appendChild(resetBtn);

  targetEl.appendChild(info);
  targetEl.appendChild(actions);
}

function applyCubeFilterUI() {
  const text = getText();
  const faceKey = state.activeCubeFace;
  const mapping = faceKey ? CUBE_FACE_MAPPING[faceKey] : null;

  // 1. 技能胶囊高亮 / 降噪
  document.querySelectorAll('#skillsGrid .skill-pill').forEach((pill) => {
    const idx = Number(pill.dataset.skillIndex);
    if (!mapping) {
      pill.classList.remove('is-highlighted', 'is-dimmed');
    } else {
      const match = mapping.skillIndices.includes(idx);
      pill.classList.toggle('is-highlighted', match);
      pill.classList.toggle('is-dimmed', !match);
    }
  });

  // 2. 作品集卡片高亮 / 降噪
  document.querySelectorAll('#worksList .work-card').forEach((card) => {
    const workId = card.dataset.workId;
    const badge = card.querySelector('.work-match-badge');
    if (!mapping) {
      card.classList.remove('is-highlighted', 'is-dimmed');
      if (badge) badge.hidden = true;
    } else {
      const match = mapping.workIds.includes(workId);
      card.classList.toggle('is-highlighted', match);
      card.classList.toggle('is-dimmed', !match);
      if (badge) {
        badge.textContent = text.matchedBadge;
        badge.hidden = !match;
      }
    }
  });

  // 3. #works 与 #skills 顶部的联动提示与 Reset 条
  buildFilterStatusBar(document.getElementById('worksFilterBar'), faceKey, '#skills', text.cubeJumpSkills);
  buildFilterStatusBar(document.getElementById('skillsFilterBar'), faceKey, '#works', text.cubeJumpWorks);

  // 4. #cube 底部的控制面板
  const bar = document.getElementById('cubeControllerBar');
  if (bar) {
    bar.textContent = '';
    const pillsWrap = el('div', 'cube-face-pills');
    CUBE_FACE_ORDER.forEach((key) => {
      const btn = el('button', 'cube-face-btn', getCubeFaceText(key));
      btn.type = 'button';
      btn.dataset.cubeFace = key;
      btn.classList.toggle('active', faceKey === key);
      btn.setAttribute('aria-pressed', String(faceKey === key));
      btn.addEventListener('click', () => setCubeFilter(key));
      pillsWrap.appendChild(btn);
    });
    bar.appendChild(pillsWrap);

    const actions = el('div', 'filter-bar-actions');
    if (faceKey) {
      const jumpWorks = el('button', 'filter-jump-btn', text.cubeJumpWorks);
      jumpWorks.type = 'button';
      jumpWorks.addEventListener('click', () => {
        const w = document.getElementById('works');
        if (w) w.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      actions.appendChild(jumpWorks);

      const jumpSkills = el('button', 'filter-jump-btn', text.cubeJumpSkills);
      jumpSkills.type = 'button';
      jumpSkills.addEventListener('click', () => {
        const s = document.getElementById('skills');
        if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      actions.appendChild(jumpSkills);

      const resetBtn = el('button', 'filter-reset-btn', text.cubeFilterAll);
      resetBtn.type = 'button';
      resetBtn.addEventListener('click', resetCubeFilter);
      actions.appendChild(resetBtn);
    } else {
      actions.appendChild(el('span', null, text.cubeFilterPrompt));
    }
    bar.appendChild(actions);
  }

  // 5. 通知 3D Cube 重绘选中面光效
  cubeVisualRefreshers.forEach((fn) => {
    try { fn(faceKey); } catch (error) { /* 忽略 */ }
  });
  scheduleOrbitalLayout();
}

function pulseCard(node) {
  node.classList.remove('pulsing');
  void node.offsetWidth;
  node.classList.add('pulsing');
}

/* ============================================================
 * 交互：语言切换 / 主题切换 / 复制邮箱 / 磁性按钮 / 自定义光标
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

function bindThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', () => toggleTheme(false));
  }
}

function bindCopyEmail() {
  document.getElementById('copyEmail').addEventListener('click', () => {
    const text = getText();
    const button = document.getElementById('copyEmail');
    const done = () => {
      button.textContent = text.copied;
      showToast(text.toastEmailCopied + text.email);
      setTimeout(() => { button.textContent = getText().copy; }, 1400);
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

/* 磁性按钮轻微吸附动效（仅桌面精细指针且非减弱动效模式） */
function bindMagneticButtons() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reduced) return;

  ['copyEmail', 'pdfBtn'].forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('mousemove', (event) => {
      const rect = btn.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const pullX = Math.max(-1, Math.min(1, dx)) * 6;
      const pullY = Math.max(-1, Math.min(1, dy)) * 5;
      btn.style.transform = `translate3d(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px, 0)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* 作品集悬停定制语境光标（仅悬停期间运行插值 rAF，触屏自动忽略） */
function bindCustomCursor() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cursor = document.getElementById('customCursor');
  const labelEl = document.getElementById('customCursorLabel');
  const list = document.getElementById('worksList');
  if (reduced || !cursor || !labelEl || !list) return;

  let active = false;
  let rafId = 0;
  let tx = -100, ty = -100;
  let cx = -100, cy = -100;

  function renderFrame() {
    if (!active) { rafId = 0; return; }
    cx += (tx - cx) * 0.24;
    cy += (ty - cy) * 0.24;
    cursor.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0) translate(-50%, -50%)`;
    rafId = requestAnimationFrame(renderFrame);
  }

  function showCursor(label, x, y) {
    labelEl.textContent = label;
    tx = x;
    ty = y;
    if (!active) {
      cx = x;
      cy = y;
      cursor.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0) translate(-50%, -50%)`;
      active = true;
      cursor.classList.add('visible');
      document.body.classList.add('cursor-work-active');
      if (!rafId) rafId = requestAnimationFrame(renderFrame);
    }
  }

  function hideCursor() {
    active = false;
    cursor.classList.remove('visible');
    document.body.classList.remove('cursor-work-active');
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  }

  function handlePointer(event) {
    if (event.pointerType === 'touch') return;
    if (document.body.classList.contains('is-pf-open') || document.body.classList.contains('is-pdf-open')) {
      hideCursor();
      return;
    }
    const card = event.target.closest('.work-card');
    if (!card) {
      hideCursor();
      return;
    }
    const label = card.dataset.cursorLabel || 'EXPLORE';
    showCursor(label, event.clientX, event.clientY);
  }

  list.addEventListener('pointerover', handlePointer);
  list.addEventListener('pointermove', handlePointer);
  list.addEventListener('mousemove', handlePointer);
  list.addEventListener('pointerleave', hideCursor);
  list.addEventListener('mouseleave', hideCursor);
  window.addEventListener('scroll', hideCursor, { passive: true });
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
 * 作品集浮层：iframe 内嵌所选作品 + Quick-Brief 元信息栏
 * ============================================================ */
let pfPrevFocus = null;
let pfCurrentWorkId = null;

function getWork(workId) {
  const works = getText().works;
  if (!works || !Array.isArray(works.items)) return null;
  return works.items.find((item) => item.id === workId) || works.items[0] || null;
}

function syncPortfolioModalMeta(workId) {
  const work = getWork(workId);
  if (!work) return;
  const text = getText();
  const lang = state.language;
  const meta = WORK_META[work.id] || {};

  const title = document.getElementById('pfModalTitle');
  if (title) title.textContent = work.modalTitle;
  const openTab = document.getElementById('pfOpenTab');
  if (openTab) {
    openTab.href = work.url;
    openTab.textContent = text.pfOpen;
  }
  const closeBtn = document.getElementById('pfClose');
  if (closeBtn) closeBtn.setAttribute('aria-label', text.pfClose);

  const roleLabel = document.getElementById('pfBriefRoleLabel');
  const roleValue = document.getElementById('pfBriefRole');
  const outcomeLabel = document.getElementById('pfBriefOutcomeLabel');
  const outcomeValue = document.getElementById('pfBriefOutcome');
  if (roleLabel) roleLabel.textContent = text.pfRoleLabel;
  if (outcomeLabel) outcomeLabel.textContent = text.pfOutcomeLabel;
  if (roleValue) {
    roleValue.textContent = meta.role ? (meta.role[lang] || meta.role.zh) : work.tag;
  }
  if (outcomeValue) {
    outcomeValue.textContent = meta.outcome ? (meta.outcome[lang] || meta.outcome.zh) : work.desc;
  }
}

function openPortfolio(workId) {
  const modal = document.getElementById('pfModal');
  if (!modal) return;
  const work = getWork(workId);
  if (!work) return;
  pfCurrentWorkId = work.id;

  syncPortfolioModalMeta(work.id);

  const frame = document.getElementById('pfFrame');
  frame.title = work.modalTitle;
  if (frame.dataset.src !== work.url) {
    frame.src = work.url;
    frame.dataset.src = work.url;
  }
  pfPrevFocus = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-pf-open');
  document.body.classList.remove('cursor-work-active');
  const cursor = document.getElementById('customCursor');
  if (cursor) cursor.classList.remove('visible');
  const closeBtn = document.getElementById('pfClose');
  if (closeBtn) closeBtn.focus();
}

function closePortfolio() {
  const modal = document.getElementById('pfModal');
  if (!modal || !modal.classList.contains('open')) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-pf-open');
  const frame = document.getElementById('pfFrame');
  try {
    if (frame.contentWindow && typeof frame.contentWindow.stop === 'function') {
      frame.contentWindow.stop();
    }
  } catch (error) { /* 跨域 iframe 忽略 */ }
  frame.src = 'about:blank';
  delete frame.dataset.src;
  if (pfPrevFocus && typeof pfPrevFocus.focus === 'function') pfPrevFocus.focus();
}

function bindPortfolioModal() {
  const modal = document.getElementById('pfModal');
  if (!modal) return;

  const list = document.getElementById('worksList');
  if (list) {
    list.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-work]');
      if (!trigger) return;
      event.preventDefault();
      openPortfolio(trigger.dataset.work);
    });
  }

  document.getElementById('pfClose').addEventListener('click', closePortfolio);
  modal.querySelectorAll('[data-pf-close]').forEach((node) => {
    node.addEventListener('click', closePortfolio);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePortfolio();
  });
}

/* ============================================================
 * 3D 倾斜卡片与滚动渐显
 * ============================================================ */
function bindTilt() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll('[data-tilt]').forEach((node) => {
    const maxTilt = node.classList.contains('hero-name') ? 7 : 4;

    node.addEventListener('mouseenter', () => { node.style.willChange = 'transform'; });
    node.addEventListener('mousemove', (event) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.transform = `perspective(1100px) rotateY(${x * maxTilt * 2}deg) rotateX(${-y * maxTilt * 2}deg) translateZ(6px)`;
    });

    node.addEventListener('mouseleave', () => {
      node.style.transform = 'perspective(1100px) rotateY(0deg) rotateX(0deg) translateZ(0)';
      node.style.willChange = 'auto';
    });
  });
}

function bindReveal() {
  const cards = Array.from(document.querySelectorAll('.card'));
  if (!cards.length) return;

  function revealInView() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    let remaining = 0;
    cards.forEach((card) => {
      if (card.classList.contains('revealed')) return;
      const rect = card.getBoundingClientRect();
      if (rect.top < vh + 80 && rect.bottom > -40) {
        card.classList.add('revealed');
      } else {
        remaining += 1;
      }
    });
    if (remaining === 0) {
      window.removeEventListener('scroll', onScrollReveal);
      window.removeEventListener('resize', revealInView);
    }
  }

  let revealTicking = false;
  function onScrollReveal() {
    if (revealTicking) return;
    revealTicking = true;
    requestAnimationFrame(() => {
      revealTicking = false;
      revealInView();
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '80px 0px' });
    cards.forEach((card) => observer.observe(card));
  }

  window.addEventListener('scroll', onScrollReveal, { passive: true });
  window.addEventListener('resize', revealInView, { passive: true });
  window.addEventListener('hashchange', () => {
    const id = (window.location.hash || '').slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target && target.classList.contains('card')) target.classList.add('revealed');
    setTimeout(revealInView, 450);
  });
  document.querySelectorAll('.quick a').forEach((link) => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        const target = document.getElementById(href.slice(1));
        if (target && target.classList.contains('card')) target.classList.add('revealed');
      }
      setTimeout(revealInView, 500);
    });
  });
  revealInView();
}

/* ============================================================
 * 3D 场景公共工具（含真实 IntersectionObserver rAF 启停控制器）
 * ============================================================ */
const SCENE_LOOPS = {};

function createSceneLoop(elementId, key, renderFrame, isImmersiveFn) {
  const target = document.getElementById(elementId);
  let visible = !('IntersectionObserver' in window);
  let rafId = 0;

  const ctrl = {
    isRunning: () => rafId !== 0,
    isVisible: () => visible,
    sync: () => {
      const shouldRun = !document.hidden && (visible || (isImmersiveFn && isImmersiveFn()));
      if (shouldRun && !rafId) {
        rafId = requestAnimationFrame(tick);
      } else if (!shouldRun && rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }
  };

  function tick(now) {
    if (document.hidden || (!visible && !(isImmersiveFn && isImmersiveFn()))) {
      rafId = 0;
      return;
    }
    renderFrame(now);
    rafId = requestAnimationFrame(tick);
  }

  if (target && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        visible = entry.isIntersecting;
        ctrl.sync();
      });
    }, { rootMargin: '120px' });
    observer.observe(target);
  }

  document.addEventListener('visibilitychange', () => ctrl.sync());
  SCENE_LOOPS[key] = ctrl;
  ctrl.sync();
  return ctrl;
}

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

function toNDC(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  return new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  );
}

const SCENE_FONT_STACK = '"JetBrains Mono", "Inter", "PingFang SC", "Microsoft YaHei", sans-serif';

function makeTextTexture(lines, options) {
  const opts = Object.assign({
    width: 512,
    height: 288,
    accent: '#1B6A82',
    muted: '#5D5B55',
    bg: '#F4F3EF',
    text: '#1A1A1A',
    grid: 'rgba(27, 106, 130, 0.10)',
    glow: 'transparent'
  }, options || {});
  const canvas = document.createElement('canvas');
  canvas.width = opts.width;
  canvas.height = opts.height;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  const target = { texture, canvas, ctx, opts };
  drawTextTexture(target, lines);
  return target;
}

function drawTextTexture(target, lines) {
  const { ctx, opts, texture } = target;
  if (!ctx) return;

  ctx.clearRect(0, 0, opts.width, opts.height);
  ctx.fillStyle = opts.bg;
  ctx.fillRect(0, 0, opts.width, opts.height);

  ctx.strokeStyle = opts.grid;
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
    ctx.fillStyle = isAccent ? opts.accent : opts.text;
    ctx.font = (isAccent ? '700 ' : '500 ') + (isAccent ? Math.round(step * 0.5) : Math.round(step * 0.38)) + 'px ' + SCENE_FONT_STACK;
    ctx.shadowColor = isAccent ? opts.glow : 'transparent';
    ctx.shadowBlur = isAccent && opts.glow !== 'transparent' ? 16 : 0;
    ctx.fillText(line, opts.width / 2, step * (i + 1));
  });
  ctx.shadowBlur = 0;
  if (texture) texture.needsUpdate = true;
}

/* ============================================================
 * 场景 1：Hero 个人数字身份装置 + 隐藏彩蛋「Particle Atelier」微光雕塑
 * ============================================================ */
let particleAtelierBridge = null;

function init3DScene() {
  const canvas = document.getElementById('bg3d');
  if (!canvas || !supports3D()) {
    if (canvas) canvas.style.display = 'none';
    return;
  }

  const prefersReduced = prefersReducedMotion();
  const isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xF4F3EF, 0.017);

  const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 14);

  const ambientLight = new THREE.AmbientLight(0xFFFDF8, 0.95);
  scene.add(ambientLight);

  const keyLight = new THREE.PointLight(0x5BBAD5, 1.15, 80);
  keyLight.position.set(9, 7, 12);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xC29A63, 0.75, 80);
  fillLight.position.set(-11, -4, 9);
  scene.add(fillLight);

  const identityGlow = new THREE.PointLight(0x1B6A82, 0.65, 24);
  identityGlow.position.set(0, 0.4, -1.5);
  scene.add(identityGlow);

  // ---- 基础环境微粒场 ----
  const particleCount = 1100;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const particleSeeds = [];
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 5;
    particleSeeds.push(Math.floor(Math.random() * 4));
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.085,
    vertexColors: true,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    blending: THREE.NormalBlending
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  function recolorParticles(theme) {
    const palette = theme === 'dark'
      ? [new THREE.Color(0x6FA8C9), new THREE.Color(0x8ED8F0), new THREE.Color(0xD8B986), new THREE.Color(0x43536B)]
      : [new THREE.Color(0x1B6A82), new THREE.Color(0x9A723E), new THREE.Color(0x6E6A61), new THREE.Color(0xA6A196)];
    const colAttr = particleGeo.getAttribute('color');
    for (let i = 0; i < particleCount; i++) {
      const c = palette[particleSeeds[i]];
      colAttr.setXYZ(i, c.r, c.g, c.b);
    }
    colAttr.needsUpdate = true;
  }

  // ---- Particle Atelier 动态流光粒子池（仅在彩蛋唤醒后生成并参与物理雕塑） ----
  const maxAtelierCount = isCoarsePointer ? 96 : 320;
  const atelierPos = new Float32Array(maxAtelierCount * 3);
  const atelierCol = new Float32Array(maxAtelierCount * 3);
  const atelierVel = new Float32Array(maxAtelierCount * 3);
  const atelierLife = new Float32Array(maxAtelierCount);
  const atelierMaxLife = new Float32Array(maxAtelierCount);
  const atelierBaseCol = new Float32Array(maxAtelierCount * 3);
  for (let i = 0; i < maxAtelierCount; i++) {
    atelierPos[i * 3 + 2] = 9999; // 初始置于相机后方不可见
  }

  // 生成柔和圆形发光 Sprite 贴图
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = 64;
  glowCanvas.height = 64;
  const glowCtx = glowCanvas.getContext('2d');
  const grad = glowCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.32, 'rgba(255, 255, 255, 0.72)');
  grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.16)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  glowCtx.fillStyle = grad;
  glowCtx.fillRect(0, 0, 64, 64);
  const atelierTex = new THREE.CanvasTexture(glowCanvas);

  const atelierGeo = new THREE.BufferGeometry();
  atelierGeo.setAttribute('position', new THREE.BufferAttribute(atelierPos, 3));
  atelierGeo.setAttribute('color', new THREE.BufferAttribute(atelierCol, 3));

  const atelierMat = new THREE.PointsMaterial({
    size: isCoarsePointer ? 0.38 : 0.44,
    map: atelierTex,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.NormalBlending
  });
  const atelierPoints = new THREE.Points(atelierGeo, atelierMat);
  atelierPoints.frustumCulled = false;
  scene.add(atelierPoints);

  let atelierCursor = 0;
  let vortexActive = false;
  const vortexWorld = new THREE.Vector3(0, 0, 2);
  const tmpProjVec = new THREE.Vector3();
  const tmpProjDir = new THREE.Vector3();

  function screenToWorld(clientX, clientY, targetVec) {
    const ndcX = (clientX / window.innerWidth) * 2 - 1;
    const ndcY = -(clientY / window.innerHeight) * 2 + 1;
    tmpProjVec.set(ndcX, ndcY, 0.5).unproject(camera);
    tmpProjDir.copy(tmpProjVec).sub(camera.position).normalize();
    const dist = Math.abs(tmpProjDir.z) > 0.001 ? (2.0 - camera.position.z) / tmpProjDir.z : 10;
    targetVec.copy(camera.position).addScaledVector(tmpProjDir, dist);
    return targetVec;
  }

  function getAtelierPalette() {
    if (state.theme === 'dark') {
      // 暗色展厅：高细腻度冷白星尘与极微弱虹彩渐变
      return [
        new THREE.Color(0xE8ECF5),
        new THREE.Color(0xD6E7F5),
        new THREE.Color(0xEAE2D6),
        new THREE.Color(0xDCD8F2)
      ];
    }
    // 浅色画廊：低饱和香槟金与暖银灰
    return [
      new THREE.Color(0xC5A880),
      new THREE.Color(0xB4976F),
      new THREE.Color(0x9A9EA6),
      new THREE.Color(0xB9B5AC)
    ];
  }

  function spawnAtelierParticle(wx, wy, wz, vx, vy, vz, lifeSec) {
    const idx = atelierCursor;
    atelierCursor = (atelierCursor + 1) % maxAtelierCount;
    const p3 = idx * 3;
    atelierPos[p3] = wx;
    atelierPos[p3 + 1] = wy;
    atelierPos[p3 + 2] = wz;
    atelierVel[p3] = vx;
    atelierVel[p3 + 1] = vy;
    atelierVel[p3 + 2] = vz;
    atelierLife[idx] = lifeSec;
    atelierMaxLife[idx] = lifeSec;

    const palette = getAtelierPalette();
    const c = palette[Math.floor(Math.random() * palette.length)];
    atelierBaseCol[p3] = c.r;
    atelierBaseCol[p3 + 1] = c.g;
    atelierBaseCol[p3 + 2] = c.b;
    atelierCol[p3] = c.r;
    atelierCol[p3 + 1] = c.g;
    atelierCol[p3 + 2] = c.b;
  }

  function emitStarCoreRipple(clientX, clientY) {
    if (!state.particleAtelier) return;
    const center = screenToWorld(clientX, clientY, new THREE.Vector3());
    const count = isCoarsePointer ? 18 : 34;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const spd = 0.045 + Math.random() * 0.03;
      spawnAtelierParticle(
        center.x + Math.cos(a) * 0.15,
        center.y + Math.sin(a) * 0.15,
        center.z + (Math.random() - 0.5) * 0.3,
        Math.cos(a) * spd,
        Math.sin(a) * spd,
        (Math.random() - 0.5) * 0.015,
        1.45 + Math.random() * 0.5
      );
    }
  }

  particleAtelierBridge = {
    setActive: (active) => {
      if (!active) vortexActive = false;
    },
    emitRipple: emitStarCoreRipple
  };

  // ---- 远景几何体（拥有「自由漂浮位」与「结构秩序排列位」双态，随滚动平滑插值） ----
  const shapes = [];
  const wireMat = (color, opacity) => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });
  const glassMat = (color, opacity) => new THREE.MeshPhongMaterial({ color, transparent: true, opacity: opacity || 0.28, shininess: 70, flatShading: true });

  function addShape(geo, material, floatPos, alignedPos, speed, kind) {
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(floatPos[0], floatPos[1], floatPos[2]);
    mesh.userData = {
      speed,
      kind,
      floatPos: new THREE.Vector3(floatPos[0], floatPos[1], floatPos[2]),
      alignedPos: new THREE.Vector3(alignedPos[0], alignedPos[1], alignedPos[2])
    };
    shapes.push(mesh);
    scene.add(mesh);
    return mesh;
  }

  addShape(new THREE.IcosahedronGeometry(2.1, 0), wireMat(0x8A857B, 0.28), [-11, 4, -8], [-9.5, 4.2, -9], 0.0030, 'wire');
  addShape(new THREE.TorusKnotGeometry(1.4, 0.36, 80, 12), glassMat(0xB8C5CE, 0.28), [11, -4, -9], [9.5, 4.2, -9], 0.0042, 'glass');
  addShape(new THREE.OctahedronGeometry(1.6, 0), wireMat(0x1B6A82, 0.26), [8, 6, -13], [9.5, 0, -10], 0.0038, 'wireAccent');
  addShape(new THREE.TorusGeometry(1.8, 0.28, 10, 48), wireMat(0x9A723E, 0.25), [-12, -6, -11], [-9.5, 0, -10], 0.0050, 'wireWarm');
  addShape(new THREE.DodecahedronGeometry(1.35, 0), glassMat(0xA6B5C2, 0.28), [1, -8, -10], [9.5, -4.2, -9], 0.0035, 'glass');
  addShape(new THREE.ConeGeometry(1.25, 2.5, 5), wireMat(0x8A857B, 0.24), [-5, 9, -15], [-9.5, -4.2, -9], 0.0046, 'wire');

  // ---- 个人数字身份装置 ----
  const identity = new THREE.Group();
  identity.position.set(0, 0.4, -4);
  scene.add(identity);

  const fadeIn = { value: 0 };

  const mainGlass = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.6, 1),
    new THREE.MeshPhongMaterial({ color: 0xD3E3EA, transparent: true, opacity: 0, shininess: 95, flatShading: true })
  );
  identity.add(mainGlass);

  const mainWire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.74, 1),
    wireMat(0x1B6A82, 0)
  );
  identity.add(mainWire);

  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.9, 0),
    new THREE.MeshBasicMaterial({ color: 0x1B6A82, transparent: true, opacity: 0 })
  );
  identity.add(core);

  const initial = (defaultResumeData.en.name || 'Z').trim().charAt(0).toUpperCase();
  const letterCanvas = document.createElement('canvas');
  letterCanvas.width = 256;
  letterCanvas.height = 256;
  const letterCtx = letterCanvas.getContext('2d');
  const letterTexture = new THREE.CanvasTexture(letterCanvas);

  function redrawIdentityLetter(theme) {
    const isDark = theme === 'dark';
    letterCtx.clearRect(0, 0, 256, 256);
    letterCtx.textAlign = 'center';
    letterCtx.textBaseline = 'middle';
    letterCtx.font = '600 168px "Cormorant Garamond", Georgia, serif';
    letterCtx.fillStyle = isDark ? '#F5F4F0' : '#1A1A1A';
    letterCtx.shadowColor = isDark ? 'rgba(142, 216, 240, 0.85)' : 'rgba(27, 106, 130, 0.28)';
    letterCtx.shadowBlur = isDark ? 26 : 10;
    letterCtx.fillText(initial, 128, 136);
    letterCtx.shadowBlur = 0;
    letterTexture.needsUpdate = true;
  }

  const letterPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.8, 1.8),
    new THREE.MeshBasicMaterial({ map: letterTexture, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false })
  );
  letterPlane.position.set(0, 0.05, 2.68);
  identity.add(letterPlane);

  const metalMat = new THREE.MeshPhongMaterial({ color: 0x9A723E, shininess: 120, specular: 0xF5E7CE, transparent: true, opacity: 0 });
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.045, 16, 96), metalMat.clone());
  ringA.rotation.set(1.15, 0.3, 0);
  identity.add(ringA);

  const ringB = new THREE.Mesh(new THREE.TorusGeometry(4.05, 0.028, 16, 96), metalMat.clone());
  ringB.rotation.set(1.6, -0.5, 0.4);
  identity.add(ringB);

  const satellites = [];
  for (let i = 0; i < 3; i++) {
    const sat = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), glassMat(0x1B6A82, 0));
    sat.userData.orbit = {
      radius: i === 0 ? 3.5 : 4.05,
      speed: 0.22 + i * 0.08,
      phase: (i / 3) * Math.PI * 2,
      ring: i === 0 ? ringA : ringB
    };
    satellites.push(sat);
    identity.add(sat);
  }

  function applySceneTheme(theme) {
    const isDark = theme === 'dark';
    scene.fog.color.setHex(isDark ? 0x0D0E12 : 0xF4F3EF);
    ambientLight.color.setHex(isDark ? 0xBFD4E2 : 0xFFFDF8);
    ambientLight.intensity = isDark ? 0.68 : 0.95;
    keyLight.color.setHex(isDark ? 0x8ED8F0 : 0x5BBAD5);
    fillLight.color.setHex(isDark ? 0x5B79A8 : 0xC29A63);
    identityGlow.color.setHex(isDark ? 0x8ED8F0 : 0x1B6A82);

    mainGlass.material.color.setHex(isDark ? 0x16202E : 0xD3E3EA);
    mainWire.material.color.setHex(isDark ? 0x8ED8F0 : 0x1B6A82);
    core.material.color.setHex(isDark ? 0x8ED8F0 : 0x1B6A82);
    ringA.material.color.setHex(isDark ? 0xC9CFD8 : 0x9A723E);
    ringB.material.color.setHex(isDark ? 0xD8B986 : 0x4E6E7D);
    satellites.forEach((sat) => sat.material.color.setHex(isDark ? 0x9FD8EF : 0x1B6A82));

    shapes.forEach((mesh) => {
      const k = mesh.userData.kind;
      if (k === 'glass') mesh.material.color.setHex(isDark ? 0x2C3A4C : 0xB8C5CE);
      else if (k === 'wireAccent') mesh.material.color.setHex(isDark ? 0x5FA8C7 : 0x1B6A82);
      else if (k === 'wireWarm') mesh.material.color.setHex(isDark ? 0xD8B986 : 0x9A723E);
      else mesh.material.color.setHex(isDark ? 0x43536B : 0x8A857B);
    });

    atelierMat.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
    atelierMat.opacity = isDark ? 0.95 : 0.82;
    atelierMat.needsUpdate = true;

    recolorParticles(theme);
    redrawIdentityLetter(theme);
  }

  onThemeChange(applySceneTheme);
  applySceneTheme(state.theme);

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const drag = { active: false, lastX: 0, lastY: 0, rotY: 0, rotX: 0, moved: 0 };
  let scrollProgress = 0;
  let smoothScroll = 0;
  let identityHover = 0;
  let pulsePower = 0;

  const Z_AXIS = new THREE.Vector3(0, 0, 1);
  const tmpDevicePos = new THREE.Vector3();
  const tmpDir = new THREE.Vector3();
  const tmpLetterPos = new THREE.Vector3();
  const tmpQParent = new THREE.Quaternion();
  const tmpQTarget = new THREE.Quaternion();
  const tmpSpawnPos = new THREE.Vector3();

  window.addEventListener('mousemove', (event) => {
    pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;

    const dx = event.clientX - window.innerWidth / 2;
    const dy = event.clientY - window.innerHeight / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const hovered = distance < Math.min(window.innerWidth, window.innerHeight) * 0.28;
    identityHover += ((hovered ? 1 : 0) - identityHover) * 0.08;

    if (state.particleAtelier && !document.body.classList.contains('is-pdf-open') && !document.body.classList.contains('is-pf-open')) {
      screenToWorld(event.clientX, event.clientY, tmpSpawnPos);
      if (vortexActive) vortexWorld.copy(tmpSpawnPos);
      const count = (prefersReduced || isCoarsePointer) ? 1 : 3;
      for (let i = 0; i < count; i++) {
        spawnAtelierParticle(
          tmpSpawnPos.x + (Math.random() - 0.5) * 0.32,
          tmpSpawnPos.y + (Math.random() - 0.5) * 0.32,
          tmpSpawnPos.z + (Math.random() - 0.5) * 0.45,
          (Math.random() - 0.5) * 0.022,
          (Math.random() - 0.5) * 0.022 + 0.004,
          (Math.random() - 0.5) * 0.014,
          (prefersReduced ? 0.9 : 1.5) + Math.random() * 0.9
        );
      }
    }
  }, { passive: true });

  function isInteractiveTarget(target) {
    return !!(target && target.closest &&
      target.closest('a, button, summary, details, input, textarea, select, .card, .top-bar, .pdf-modal, .pf-modal, .orbital-dial, .focus-lens-bar, .star-cores-layer, canvas#wsCanvas, canvas#cubeCanvas'));
  }

  window.addEventListener('pointerdown', (event) => {
    if (state.particleAtelier) {
      if (event.button === 0 && !event.target.closest('a, button, summary, details, input, textarea, select, .pdf-modal, .pf-modal, .top-bar, .orbital-dial, .star-cores-layer')) {
        vortexActive = true;
        screenToWorld(event.clientX, event.clientY, vortexWorld);
      }
      return;
    }
    if (isInteractiveTarget(event.target)) return;
    if (event.pointerType === 'mouse' && event.cancelable) event.preventDefault();
    drag.active = true;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.moved = 0;
    document.body.classList.add('is-dragging');
  });

  window.addEventListener('pointermove', (event) => {
    if (state.particleAtelier && vortexActive) {
      screenToWorld(event.clientX, event.clientY, vortexWorld);
      return;
    }
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
    if (vortexActive) {
      vortexActive = false;
      // 松手时给予微粒柔和的丝绸散开初速度
      for (let i = 0; i < maxAtelierCount; i++) {
        if (atelierLife[i] <= 0) continue;
        const p3 = i * 3;
        const dx = atelierPos[p3] - vortexWorld.x;
        const dy = atelierPos[p3 + 1] - vortexWorld.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.2;
        if (dist < 4.5) {
          atelierVel[p3] += (dx / dist) * 0.028;
          atelierVel[p3 + 1] += (dy / dist) * 0.028;
        }
      }
    }
    if (drag.active && drag.moved < 6) {
      pulsePower = 1;
    }
    drag.active = false;
    document.body.classList.remove('is-dragging');
  };

  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  function updateScrollProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();
  let prevElapsed = 0;

  function renderBgFrame() {
    const t = clock.getElapsedTime();
    const dt = Math.min(0.05, Math.max(0.008, t - prevElapsed));
    prevElapsed = t;

    if (fadeIn.value < 1) {
      fadeIn.value = Math.min(1, fadeIn.value + 0.015);
      const f = fadeIn.value;
      mainGlass.material.opacity = (state.theme === 'dark' ? 0.42 : 0.34) * f;
      mainWire.material.opacity = 0.38 * f;
      core.material.opacity = 0.85 * f;
      letterPlane.material.opacity = f;
      ringA.material.opacity = 0.88 * f;
      ringB.material.opacity = 0.85 * f;
      satellites.forEach((sat) => { sat.material.opacity = 0.78 * f; });
    }

    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    smoothScroll += (scrollProgress - smoothScroll) * 0.06;

    const expWeight = Math.max(0, Math.sin(Math.min(1, Math.max(0, (smoothScroll - 0.18) / 0.48)) * Math.PI));
    const portWeight = Math.max(0, Math.sin(Math.min(1, Math.max(0, (smoothScroll - 0.52) / 0.38)) * Math.PI));

    identity.position.x = -expWeight * 2.1 + portWeight * 2.3;
    identity.position.y = 0.4 - smoothScroll * 0.6;
    identity.position.z = -4 + portWeight * 1.1;

    const motionMul = prefersReduced ? 0.18 : 1;
    camera.position.x = pointer.x * 1.45 * motionMul + expWeight * 1.15 - portWeight * 1.05;
    camera.position.y = -pointer.y * 1.05 * motionMul - smoothScroll * 2.8;
    camera.position.z = 14 - smoothScroll * 2.6 - portWeight * 1.2;
    camera.lookAt(pointer.x * 0.5 * motionMul + identity.position.x * 0.2, -pointer.y * 0.4 * motionMul - smoothScroll * 2.4, -1.2);

    scene.rotation.y = drag.rotY;
    scene.rotation.x = drag.rotX;

    if (!prefersReduced) {
      particles.rotation.y = t * 0.016 + smoothScroll * 0.22;
      particles.rotation.x = Math.sin(t * 0.1) * 0.03;

      shapes.forEach((mesh, i) => {
        const alignT = expWeight * 0.78;
        const targetPos = mesh.userData.floatPos.clone().lerp(mesh.userData.alignedPos, alignT);
        targetPos.y += Math.sin(t * 0.55 + i * 1.7) * (0.28 * (1 - alignT * 0.65));
        mesh.position.lerp(targetPos, 0.05);
        mesh.rotation.x += mesh.userData.speed * (1 - alignT * 0.45);
        mesh.rotation.y += mesh.userData.speed * 1.25;
      });

      identity.rotation.y = t * 0.06 + smoothScroll * 1.15;
      identity.rotation.x = Math.sin(t * 0.12) * 0.05 + portWeight * 0.14;
    } else {
      identity.rotation.y = 0.4;
    }

    if (pulsePower > 0.001) pulsePower *= 0.965;
    else pulsePower = 0;

    const breathe = 1 + (prefersReduced ? 0 : Math.sin(t * 0.7) * 0.015) + pulsePower * 0.25;
    core.scale.setScalar(breathe);

    identity.updateWorldMatrix(true, false);
    identity.getWorldQuaternion(tmpQParent);
    identity.getWorldPosition(tmpDevicePos);
    tmpDir.subVectors(camera.position, tmpDevicePos).normalize();
    tmpQTarget.setFromUnitVectors(Z_AXIS, tmpDir);
    tmpQTarget.premultiply(tmpQParent.invert());
    letterPlane.quaternion.slerp(tmpQTarget, 0.06);
    tmpLetterPos.copy(tmpDevicePos).addScaledVector(tmpDir, 2.78);
    tmpLetterPos.y += prefersReduced ? 0 : Math.sin(t * 0.8) * 0.06;
    identity.worldToLocal(tmpLetterPos);
    letterPlane.position.copy(tmpLetterPos);

    if (!prefersReduced) {
      const spinBoost = pulsePower * 0.05;
      ringA.rotation.z += 0.0012 + spinBoost;
      ringB.rotation.z -= 0.0008 + spinBoost * 0.7;
      ringA.rotation.x += 0.0004 + spinBoost * 0.5;
      ringB.rotation.x -= 0.0003 + spinBoost * 0.5;

      const speedMul = 1 + identityHover * 0.6 + pulsePower * 2.5;
      const radiusMul = 1 - identityHover * 0.12 - pulsePower * 0.06 - portWeight * 0.06;
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

    // ---- Particle Atelier 流体物理与旋涡聚拢更新 ----
    let hasAtelierUpdates = false;
    const isDark = state.theme === 'dark';
    const bgR = isDark ? 13 / 255 : 244 / 255;
    const bgG = isDark ? 14 / 255 : 243 / 255;
    const bgB = isDark ? 18 / 255 : 239 / 255;

    for (let i = 0; i < maxAtelierCount; i++) {
      if (atelierLife[i] <= 0) continue;
      hasAtelierUpdates = true;
      const p3 = i * 3;
      atelierLife[i] -= dt * (state.particleAtelier ? 1 : 2.8);
      if (atelierLife[i] <= 0) {
        atelierLife[i] = 0;
        atelierPos[p3 + 2] = 9999;
        continue;
      }

      if (vortexActive && state.particleAtelier) {
        const dx = vortexWorld.x - atelierPos[p3];
        const dy = vortexWorld.y - atelierPos[p3 + 1];
        const dz = vortexWorld.z - atelierPos[p3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
        if (dist < 8.5) {
          const pull = 0.0032 * (1 + (8.5 - dist) * 0.22);
          atelierVel[p3] += (dx / dist) * pull - (dy / dist) * 0.0042;
          atelierVel[p3 + 1] += (dy / dist) * pull + (dx / dist) * 0.0042;
          atelierVel[p3 + 2] += (dz / dist) * pull * 0.5;
          atelierLife[i] = Math.min(atelierMaxLife[i], atelierLife[i] + dt * 0.65);
        }
      } else if (!prefersReduced) {
        atelierVel[p3] += Math.sin(t * 1.8 + atelierPos[p3 + 1] * 1.4) * 0.00028;
        atelierVel[p3 + 1] += Math.cos(t * 1.6 + atelierPos[p3] * 1.4) * 0.00028;
      }

      atelierPos[p3] += atelierVel[p3];
      atelierPos[p3 + 1] += atelierVel[p3 + 1];
      atelierPos[p3 + 2] += atelierVel[p3 + 2];
      atelierVel[p3] *= 0.965;
      atelierVel[p3 + 1] *= 0.965;
      atelierVel[p3 + 2] *= 0.965;

      const fade = Math.max(0, Math.min(1, atelierLife[i] / atelierMaxLife[i]));
      if (isDark) {
        atelierCol[p3] = atelierBaseCol[p3] * fade;
        atelierCol[p3 + 1] = atelierBaseCol[p3 + 1] * fade;
        atelierCol[p3 + 2] = atelierBaseCol[p3 + 2] * fade;
      } else {
        // 浅色模式用混合向背景淡出，确保无生硬黑边
        atelierCol[p3] = bgR + (atelierBaseCol[p3] - bgR) * fade;
        atelierCol[p3 + 1] = bgG + (atelierBaseCol[p3 + 1] - bgG) * fade;
        atelierCol[p3 + 2] = bgB + (atelierBaseCol[p3 + 2] - bgB) * fade;
      }
    }

    if (hasAtelierUpdates) {
      atelierGeo.getAttribute('position').needsUpdate = true;
      atelierGeo.getAttribute('color').needsUpdate = true;
    }

    const hoverBoost = identityHover * 1.1;
    identityGlow.intensity = (isDark ? 0.85 : 0.55) * fadeIn.value + hoverBoost + pulsePower * 2.0 + portWeight * 0.65;
    keyLight.intensity = (isDark ? 1.45 : 1.1) + (prefersReduced ? 0 : Math.sin(t * 0.8) * 0.12) + portWeight * 0.55;
    fillLight.intensity = (isDark ? 0.8 : 0.7) + (prefersReduced ? 0 : Math.sin(t * 0.6 + 2) * 0.1);

    renderer.render(scene, camera);
  }

  createSceneLoop('bg3d', 'bg', renderBgFrame, () => true);
}

/* ============================================================
 * 场景 2：Digital Creative Workspace（About 区域旁）
 * 彩蛋交互：
 *  - 点击 显示器 / 屏幕 → 打开作品集弹窗 (#pfModal)
 *  - 点击 简历笔记本 (Notebook) → 打开简历 PDF 弹窗 (#pdfModal)
 *  - 点击 台灯 (Desk Lamp) → 切换 Light Gallery / Dark Exhibition 模式并联动 3D 光照
 * ============================================================ */
function initWorkspaceScene() {
  const stage = document.getElementById('workspaceStage');
  const canvas = document.getElementById('wsCanvas');
  if (!stage || !canvas || !supports3D()) {
    const text = getText();
    const chipTargets = ['#about', '#experience', '#projects', '#skills', '#contact'];
    const chips = (text.sceneText.screenWords || []).slice(0, chipTargets.length);
    showSceneFallback('workspaceStage', 'workspaceFallback', text.fallbackWorkspace,
      chips,
      (chip) => {
        const target = document.querySelector(chipTargets[chips.indexOf(chip)]);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    return;
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 2, 0.1, 60);
  camera.position.set(0, 3.1, 9.2);
  camera.lookAt(0, 0.7, 0);

  const ambientLight = new THREE.AmbientLight(0xFFFBF2, 0.92);
  scene.add(ambientLight);
  const keyLight = new THREE.PointLight(0xFFF6E6, 1.05, 40);
  keyLight.position.set(4, 6, 7);
  scene.add(keyLight);
  const fillLight = new THREE.PointLight(0x7FA8BE, 0.45, 40);
  fillLight.position.set(-6, 2, 5);
  scene.add(fillLight);

  const world = new THREE.Group();
  scene.add(world);

  // 材质库（支持 Light 画廊石材桌面 ↔ Dark 黑曜石工作台联动）
  const deskMat = new THREE.MeshPhongMaterial({ color: 0xDDD8CE, shininess: 22, flatShading: true });
  const deviceMat = new THREE.MeshPhongMaterial({ color: 0x2F3540, shininess: 35, flatShading: true });
  const accentBodyMat = new THREE.MeshPhongMaterial({ color: 0x222730, shininess: 24, flatShading: true });
  const metalMat = new THREE.MeshPhongMaterial({ color: 0x9AA6B5, shininess: 110, specular: 0xECEEF2 });
  const glassMat = new THREE.MeshPhongMaterial({ color: 0x4E728A, transparent: true, opacity: 0.36, shininess: 90, flatShading: true });
  const accentMat = new THREE.MeshBasicMaterial({ color: 0x1B6A82, transparent: true, opacity: 0.9 });

  function box(w, h, d, mat, x, y, z, ry) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    if (ry) mesh.rotation.y = ry;
    world.add(mesh);
    return mesh;
  }

  // ---- 桌面 ----
  const deskGroup = new THREE.Group();
  world.add(deskGroup);
  const desk = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.22, 3.8), deskMat);
  deskGroup.add(desk);
  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.4, 0.18), accentBodyMat);
  legL.position.set(-4.2, -0.8, -1.5);
  deskGroup.add(legL);
  const legR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.4, 0.18), accentBodyMat);
  legR.position.set(4.2, -0.8, -1.5);
  deskGroup.add(legR);

  // ---- 显示器（点击打开作品集弹窗 #pfModal） ----
  const monitorGroup = new THREE.Group();
  monitorGroup.position.set(-0.75, 0, -0.55);
  world.add(monitorGroup);
  const monBase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.62, 0.06, 24), accentBodyMat);
  monBase.position.set(0, 0.14, 0.2);
  monitorGroup.add(monBase);
  const stand = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.9, 0.1), deviceMat);
  stand.position.set(0, 0.6, 0.2);
  monitorGroup.add(stand);
  const shell = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.05, 0.12), deviceMat);
  shell.position.set(0, 1.55, 0.1);
  monitorGroup.add(shell);

  let monitorWords = getSceneText('screenWords', ['DIGITAL MEDIA', 'INTERACTIVE', 'DESIGN', 'AIGC', 'MOTION', 'VISUAL']);
  const screen = makeTextTexture(monitorWords, { width: 512, height: 288 });
  const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.36, 1.86),
    new THREE.MeshBasicMaterial({ map: screen.texture })
  );
  screenMesh.position.set(0, 1.55, 0.17);
  monitorGroup.add(screenMesh);

  // ---- 键盘 ----
  const kbGroup = new THREE.Group();
  kbGroup.position.set(-0.75, 0.13, 0.96);
  kbGroup.rotation.y = -0.04;
  world.add(kbGroup);
  const kbBase = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.07, 0.62), accentBodyMat);
  kbGroup.add(kbBase);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 10; c++) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.03, 0.13), deviceMat);
      key.position.set(-0.78 + c * 0.165, 0.05, -0.2 + r * 0.19);
      kbGroup.add(key);
    }
  }

  // ---- 鼠标 ----
  const mouseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.15, 18, 14), deviceMat);
  mouseMesh.scale.set(1, 0.55, 1.45);
  mouseMesh.position.set(0.55, 0.16, 1.02);
  world.add(mouseMesh);

  // ---- 手机 ----
  const phoneGroup = new THREE.Group();
  phoneGroup.position.set(1.18, 0.12, 0.62);
  phoneGroup.rotation.y = -0.45;
  world.add(phoneGroup);
  const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.035, 0.62), accentBodyMat);
  phoneGroup.add(phoneBody);
  const phoneScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.56), accentMat.clone());
  phoneScreen.material.opacity = 0.55;
  phoneScreen.rotation.x = -Math.PI / 2;
  phoneScreen.position.y = 0.02;
  phoneGroup.add(phoneScreen);

  // ---- 简历笔记本（Notebook / Resume Document：点击打开 #pdfModal） ----
  const notebookGroup = new THREE.Group();
  notebookGroup.position.set(2.38, 0.12, 0.92);
  notebookGroup.rotation.y = 0.24;
  world.add(notebookGroup);

  const nbCover = new THREE.Mesh(
    new THREE.BoxGeometry(1.18, 0.05, 1.48),
    new THREE.MeshPhongMaterial({ color: 0x9A723E, shininess: 35, flatShading: true })
  );
  notebookGroup.add(nbCover);

  const nbPages = new THREE.Mesh(
    new THREE.BoxGeometry(1.08, 0.05, 1.38),
    new THREE.MeshPhongMaterial({ color: 0xF8F5EE, shininess: 18 })
  );
  nbPages.position.y = 0.035;
  notebookGroup.add(nbPages);

  // 简历本页面纹理（绘制“CV / RESUME”字样与排版线）
  const nbCanvas = document.createElement('canvas');
  nbCanvas.width = 256;
  nbCanvas.height = 320;
  const nbCtx = nbCanvas.getContext('2d');
  const nbTexture = new THREE.CanvasTexture(nbCanvas);
  function drawNotebookPage() {
    nbCtx.fillStyle = '#FAF8F3';
    nbCtx.fillRect(0, 0, 256, 320);
    nbCtx.strokeStyle = 'rgba(26, 26, 26, 0.15)';
    nbCtx.lineWidth = 2;
    nbCtx.strokeRect(12, 12, 232, 296);
    nbCtx.fillStyle = '#1B6A82';
    nbCtx.fillRect(26, 28, 68, 8);
    nbCtx.fillStyle = '#1A1A1A';
    nbCtx.font = '700 28px "JetBrains Mono", monospace';
    nbCtx.fillText('RESUME', 26, 68);
    nbCtx.fillStyle = 'rgba(26, 26, 26, 0.24)';
    for (let y = 96; y < 275; y += 22) {
      const w = (y % 44 === 0) ? 168 : 196;
      nbCtx.fillRect(26, y, w, 6);
    }
    nbCtx.fillStyle = '#9A723E';
    nbCtx.font = '600 14px "JetBrains Mono", monospace';
    nbCtx.fillText('PDF · CLICK', 26, 292);
    nbTexture.needsUpdate = true;
  }
  drawNotebookPage();

  const nbSheet = new THREE.Mesh(
    new THREE.PlaneGeometry(1.04, 1.34),
    new THREE.MeshBasicMaterial({ map: nbTexture })
  );
  nbSheet.rotation.x = -Math.PI / 2;
  nbSheet.position.y = 0.063;
  notebookGroup.add(nbSheet);

  const nbPen = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.05, 10), metalMat);
  nbPen.rotation.z = Math.PI / 2;
  nbPen.rotation.y = 0.45;
  nbPen.position.set(0.45, 0.09, 0.12);
  notebookGroup.add(nbPen);

  // ---- 数位板 ----
  const tabletGroup = new THREE.Group();
  tabletGroup.position.set(-2.95, 0.13, 0.72);
  tabletGroup.rotation.y = 0.35;
  world.add(tabletGroup);
  const tabletBody = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.05, 0.8), deviceMat);
  tabletGroup.add(tabletBody);
  const tabletTex = makeTextTexture(getSceneText('tabletWords', ['VISUAL', 'DESIGN']), { width: 256, height: 160 });
  const tabletScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.98, 0.62),
    new THREE.MeshBasicMaterial({ map: tabletTex.texture })
  );
  tabletScreen.rotation.x = -Math.PI / 2;
  tabletScreen.position.y = 0.03;
  tabletGroup.add(tabletScreen);

  // ---- 摄像机 ----
  const cameraGroup = new THREE.Group();
  cameraGroup.position.set(2.45, 0.32, -0.45);
  cameraGroup.rotation.y = -0.42;
  world.add(cameraGroup);
  const camBody = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.42, 0.34), accentBodyMat);
  cameraGroup.add(camBody);
  const lensOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.22, 20), deviceMat);
  lensOuter.rotation.x = Math.PI / 2;
  lensOuter.position.set(0, 0.02, 0.26);
  cameraGroup.add(lensOuter);
  const lensGlass = new THREE.Mesh(new THREE.CircleGeometry(0.11, 20), glassMat);
  lensGlass.position.set(0, 0.02, 0.38);
  cameraGroup.add(lensGlass);
  const recDot = new THREE.Mesh(new THREE.CircleGeometry(0.025, 10), accentMat.clone());
  recDot.position.set(0.28, 0.16, 0.18);
  cameraGroup.add(recDot);

  // ---- 耳机 ----
  const hpGroup = new THREE.Group();
  hpGroup.position.set(3.45, 0.1, -1.05);
  hpGroup.rotation.y = 0.55;
  world.add(hpGroup);
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.045, 12, 32, Math.PI), deviceMat);
  band.rotation.x = Math.PI / 2;
  hpGroup.add(band);
  const cupL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 20), deviceMat);
  cupL.position.set(-0.34, 0.03, 0);
  cupL.rotation.z = Math.PI / 2;
  hpGroup.add(cupL);
  const cupR = cupL.clone();
  cupR.position.x = 0.34;
  hpGroup.add(cupR);

  // ---- 小型硬盘 ----
  box(0.6, 0.1, 0.42, accentBodyMat, 0.78, 0.11, -0.82, 0.3);
  const hddLed = new THREE.Mesh(new THREE.CircleGeometry(0.025, 10), accentMat.clone());
  hddLed.rotation.x = -Math.PI / 2;
  hddLed.position.set(0.92, 0.165, -0.73);
  world.add(hddLed);

  // ---- 文件夹 ----
  box(0.72, 0.035, 0.52, deviceMat, -1.85, 0.09, -1.0, -0.25);
  const folderB = box(0.68, 0.03, 0.48, new THREE.MeshPhongMaterial({ color: 0x3A546A, shininess: 24, flatShading: true }), -1.85, 0.12, -1.0, -0.25);
  folderB.rotation.z = 0.02;

  // ---- 台灯（点击切换明暗主题：Light Gallery ↔ Dark Exhibition） ----
  const lampGroup = new THREE.Group();
  lampGroup.position.set(-3.65, 0, -0.75);
  world.add(lampGroup);
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.06, 24), accentBodyMat);
  lampBase.position.set(0, 0.05, 0);
  lampGroup.add(lampBase);
  const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 1.02, 10), metalMat);
  arm1.position.set(0.12, 0.56, 0);
  arm1.rotation.z = 0.25;
  lampGroup.add(arm1);
  const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.82, 10), metalMat);
  arm2.position.set(0.38, 1.13, 0);
  arm2.rotation.z = 1.15;
  lampGroup.add(arm2);
  const lampHead = new THREE.Mesh(new THREE.ConeGeometry(0.21, 0.3, 20), deviceMat);
  lampHead.position.set(0.74, 1.18, 0);
  lampHead.rotation.z = -1.9;
  lampGroup.add(lampHead);
  const lampBulb = new THREE.Mesh(
    new THREE.CircleGeometry(0.12, 16),
    new THREE.MeshBasicMaterial({ color: 0xFFE4B5, transparent: true, opacity: 0.75, side: THREE.DoubleSide })
  );
  lampBulb.position.set(0.84, 1.14, 0);
  lampBulb.rotation.z = -2.1;
  lampGroup.add(lampBulb);
  const lampLight = new THREE.PointLight(0xFFD089, 0.45, 7.5);
  lampLight.position.set(0.88, 1.08, 0.22);
  lampGroup.add(lampLight);

  // 隐形宽容度拾取球，方便点击台灯头部
  const lampHitbox = new THREE.Mesh(
    new THREE.SphereGeometry(0.58, 10, 10),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  );
  lampHitbox.position.set(0.74, 1.16, 0);
  lampGroup.add(lampHitbox);

  // ---- AI 悬浮体 ----
  const aiGroup = new THREE.Group();
  aiGroup.position.set(0.4, 2.6, -0.2);
  world.add(aiGroup);
  const aiWire = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.3, 0),
    new THREE.MeshBasicMaterial({ color: 0x1B6A82, wireframe: true, transparent: true, opacity: 0.65 })
  );
  aiGroup.add(aiWire);
  const aiCore = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), accentMat.clone());
  aiGroup.add(aiCore);
  const aiLight = new THREE.PointLight(0x7FD6F2, 0.55, 4);
  aiGroup.add(aiLight);

  let lampPulse = 0;

  function applyWorkspaceTheme(theme) {
    const isDark = theme === 'dark';
    ambientLight.color.setHex(isDark ? 0x9BB7CC : 0xFFFBF2);
    ambientLight.intensity = isDark ? 0.42 : 0.92;
    keyLight.color.setHex(isDark ? 0x8ED8F0 : 0xFFF6E6);
    keyLight.intensity = isDark ? 0.72 : 1.05;
    fillLight.color.setHex(isDark ? 0x5B79A8 : 0x8FB4C9);
    fillLight.intensity = isDark ? 0.48 : 0.42;

    deskMat.color.setHex(isDark ? 0x1A1F29 : 0xDDD8CE);
    deviceMat.color.setHex(isDark ? 0x202734 : 0x2F3540);
    accentBodyMat.color.setHex(isDark ? 0x12161E : 0x222730);
    aiWire.material.color.setHex(isDark ? 0x8ED8F0 : 0x1B6A82);
    aiCore.material.color.setHex(isDark ? 0x8ED8F0 : 0x1B6A82);
    aiLight.color.setHex(isDark ? 0x8ED8F0 : 0x1B6A82);
    phoneScreen.material.color.setHex(isDark ? 0x8ED8F0 : 0x1B6A82);
    recDot.material.color.setHex(isDark ? 0x8ED8F0 : 0x1B6A82);
    hddLed.material.color.setHex(isDark ? 0x8ED8F0 : 0x1B6A82);

    // 暗色展厅模式下点亮暖金台灯，浅色画廊模式下呈现柔和自然光
    lampLight.color.setHex(isDark ? 0xFFD089 : 0xFFF5E0);
    lampBulb.material.color.setHex(isDark ? 0xFFE4B5 : 0xFFFFFF);
    lampBulb.material.opacity = isDark ? 0.96 : 0.45;

    screen.opts.bg = isDark ? '#0D1119' : '#F4F3EF';
    screen.opts.accent = isDark ? '#8ED8F0' : '#1B6A82';
    screen.opts.text = isDark ? 'rgba(242,244,246,0.88)' : '#1A1A1A';
    screen.opts.grid = isDark ? 'rgba(142,216,240,0.08)' : 'rgba(27,106,130,0.09)';
    screen.opts.glow = isDark ? 'rgba(142,216,240,0.55)' : 'transparent';

    tabletTex.opts.bg = isDark ? '#0D1119' : '#EFECE4';
    tabletTex.opts.accent = isDark ? '#8ED8F0' : '#1B6A82';
    tabletTex.opts.text = isDark ? 'rgba(242,244,246,0.88)' : '#1A1A1A';
    tabletTex.opts.grid = isDark ? 'rgba(142,216,240,0.08)' : 'rgba(27,106,130,0.09)';
  }

  onThemeChange(applyWorkspaceTheme);
  applyWorkspaceTheme(state.theme);

  onSceneTextRefresh(() => {
    monitorWords = getSceneText('screenWords', []);
    wordIndex = 0;
    lastWordSwap = 0;
    drawTextTexture(screen, monitorWords.slice());
    drawTextTexture(tabletTex, getSceneText('tabletWords', []));
  });

  // ---- 可点击设备注册表（含三大真实功能彩蛋） ----
  const deviceMap = [
    { key: 'monitor', group: monitorGroup, action: 'portfolio' },
    { key: 'notebook', group: notebookGroup, action: 'pdf' },
    { key: 'lamp', group: lampGroup, action: 'theme' },
    { key: 'desk', group: deskGroup, target: '#about' },
    { key: 'camera', group: cameraGroup, target: '#experience' },
    { key: 'tablet', group: tabletGroup, target: '#projects' },
    { key: 'keyboard', group: kbGroup, target: '#skills' },
    { key: 'phone', group: phoneGroup, target: '#contact' },
    { key: 'ai', group: aiGroup, target: '#skills' }
  ];
  const pickables = [];
  deviceMap.forEach((d) => {
    d.group.traverse((node) => {
      if (node.isMesh) {
        node.userData.deviceKey = d.key;
        pickables.push(node);
      }
    });
  });

  let immersive = false;
  let immT = 0;
  const camBase = { pos: new THREE.Vector3(0, 3.1, 9.2), look: new THREE.Vector3(0, 0.7, 0) };
  const camImm = { pos: new THREE.Vector3(0.9, 2.4, 5.6), look: new THREE.Vector3(-0.3, 0.9, -0.2) };
  const orbit = { yaw: 0, pitch: 0, zoom: 1, active: false, lastX: 0, lastY: 0, velYaw: 0, velPitch: 0, moved: 0 };

  const enterBtn = document.getElementById('workspaceEnter');
  const exitBtn = document.getElementById('workspaceExit');
  const immHint = document.getElementById('workspaceImmersiveHint');
  if (enterBtn && !enterBtn.textContent) enterBtn.textContent = getText().enterWorkspace;
  if (exitBtn && !exitBtn.textContent) exitBtn.textContent = getText().exitWorkspace;
  if (immHint && !immHint.textContent) immHint.textContent = getText().immersiveHint;

  const stageParent = stage.parentElement;
  const stageNext = stage.nextElementSibling;
  let wsLoopCtrl = null;

  function enterImmersive() {
    if (immersive) return;
    immersive = true;
    document.body.appendChild(stage);
    stage.classList.add('immersive');
    document.body.classList.add('ws-immersive');
    if (enterBtn) enterBtn.hidden = true;
    if (exitBtn) exitBtn.hidden = false;
    if (immHint) immHint.hidden = false;
    canvas.style.cursor = 'grab';
    resize();
    if (wsLoopCtrl) wsLoopCtrl.sync();
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
    if (wsLoopCtrl) wsLoopCtrl.sync();
  }

  if (enterBtn) enterBtn.addEventListener('click', enterImmersive);
  if (exitBtn) exitBtn.addEventListener('click', exitImmersive);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && immersive) exitImmersive();
  });

  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const raycaster = new THREE.Raycaster();
  let hoveredKey = null;

  canvas.addEventListener('pointermove', (event) => {
    if (orbit.active) { hoveredKey = null; hideTooltip(); return; }
    raycaster.setFromCamera(toNDC(event, canvas), camera);
    const hits = raycaster.intersectObjects(pickables, false);
    const key = hits.length ? hits[0].object.userData.deviceKey : null;
    const label = key ? (getText().deviceLabels[key] || key.toUpperCase()) : null;
    if (key !== hoveredKey) {
      hoveredKey = key;
      canvas.style.cursor = key ? 'pointer' : (immersive ? 'grab' : 'default');
    }
    if (label) showTooltip(event.clientX, event.clientY, label);
    else hideTooltip();
  });

  canvas.addEventListener('pointerleave', () => {
    hoveredKey = null;
    canvas.style.cursor = immersive ? 'grab' : 'default';
    hideTooltip();
  });

  canvas.addEventListener('pointerdown', (event) => {
    orbit.moved = 0;
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
    orbit.moved += Math.abs(dx) + Math.abs(dy);
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
    if (orbit.moved > 6) return;
    raycaster.setFromCamera(toNDC(event, canvas), camera);
    const hits = raycaster.intersectObjects(pickables, false);
    if (!hits.length) return;
    const key = hits[0].object.userData.deviceKey;
    const device = deviceMap.find((d) => d.key === key);
    if (!device) return;

    if (device.action === 'theme') {
      lampPulse = 1;
      toggleTheme(false);
      showTooltip(event.clientX, event.clientY, getText().deviceLabels.lamp);
      setTimeout(hideTooltip, 1200);
      return;
    }

    if (device.action === 'portfolio') {
      hideTooltip();
      if (immersive) {
        exitImmersive();
        setTimeout(() => openPortfolio('dinuhua'), 320);
      } else {
        openPortfolio('dinuhua');
      }
      return;
    }

    if (device.action === 'pdf') {
      hideTooltip();
      if (immersive) {
        exitImmersive();
        setTimeout(() => openResumePdf(), 320);
      } else {
        openResumePdf();
      }
      return;
    }

    const target = document.querySelector(device.target);
    const destName = getText().sectionTitles[device.target.slice(1)] || device.target;
    showTooltip(event.clientX, event.clientY, '→ ' + destName);
    setTimeout(hideTooltip, 1200);
    if (immersive) {
      setTimeout(() => {
        exitImmersive();
        setTimeout(() => { if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 360);
      }, 300);
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  const clock = new THREE.Clock();
  const parallax = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('mousemove', (event) => {
    parallax.tx = (event.clientX / window.innerWidth) * 2 - 1;
    parallax.ty = (event.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  let wordIndex = 0;
  let lastWordSwap = 0;

  function renderWorkspaceFrame() {
    const t = clock.getElapsedTime();

    deviceMap.forEach((d) => {
      const targetScale = d.key === hoveredKey ? 1.06 : 1;
      const s = d.group.scale.x + (targetScale - d.group.scale.x) * 0.14;
      d.group.scale.setScalar(s);
    });

    if (lampPulse > 0.001) {
      lampPulse *= 0.88;
      lampGroup.rotation.z = -Math.sin(lampPulse * Math.PI) * 0.08;
    } else {
      lampPulse = 0;
      lampGroup.rotation.z = 0;
    }

    if (t - lastWordSwap > 2.4 && monitorWords.length) {
      lastWordSwap = t;
      wordIndex = (wordIndex + 1) % monitorWords.length;
      const ordered = monitorWords.slice(wordIndex).concat(monitorWords.slice(0, wordIndex));
      drawTextTexture(screen, ordered);
    }

    immT += ((immersive ? 1 : 0) - immT) * 0.055;
    parallax.x += (parallax.tx - parallax.x) * 0.05;
    parallax.y += (parallax.ty - parallax.y) * 0.05;

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
    offset.setLength(offset.length() * (1 + (orbit.zoom - 1) * immT));
    camera.position.copy(look.clone().add(offset));
    camera.lookAt(look);

    const targetFov = 42 + immT * 6;
    if (Math.abs(camera.fov - targetFov) > 0.05) {
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
    }

    if (!prefersReducedMotion()) {
      aiGroup.rotation.y = t * 0.4;
      aiGroup.position.y = 2.6 + Math.sin(t * 0.9) * 0.12;
      aiCore.material.opacity = 0.6 + Math.sin(t * 2.2) * 0.25;
      aiLight.intensity = 0.55 + Math.sin(t * 2.2) * 0.2;
      phoneScreen.material.opacity = 0.45 + Math.sin(t * 1.4) * 0.12;
      recDot.material.opacity = 0.5 + Math.sin(t * 3) * 0.4;
    } else {
      aiGroup.position.y = 2.6;
    }

    const baseLampIntensity = state.theme === 'dark' ? 2.0 : 0.35;
    lampLight.intensity = baseLampIntensity + (prefersReducedMotion() ? 0 : Math.sin(t * 7.3) * 0.03) + lampPulse * 1.1;

    renderer.render(scene, camera);
  }

  wsLoopCtrl = createSceneLoop('wsCanvas', 'workspace', renderWorkspaceFrame, () => immersive);
}

/* ============================================================
 * 场景 3：AIGC Cube（交互能力控制器）
 * 点击六面联动高亮 #skills 标签与筛选 #works 作品，并支持 Reset
 * ============================================================ */
function initCubeScene() {
  const stage = document.getElementById('cubeStage');
  const canvas = document.getElementById('cubeCanvas');
  if (!stage || !canvas || !supports3D()) {
    const faceChips = CUBE_FACE_ORDER.map((key) => getCubeFaceText(key));
    showSceneFallback('cubeStage', 'cubeFallback', getText().fallbackCube, faceChips, (chip) => {
      const faceKey = CUBE_FACE_ORDER[faceChips.indexOf(chip)] || 'AIGC';
      setCubeFilter(faceKey);
    });
    return;
  }

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
  let cubeLoopCtrl = null;

  function enterImmersive() {
    if (immersive) return;
    immersive = true;
    document.body.appendChild(stage);
    stage.classList.add('immersive');
    document.body.classList.add('cube-immersive');
    if (enterBtn) enterBtn.hidden = true;
    if (exitBtn) exitBtn.hidden = false;
    if (immHint) immHint.hidden = false;
    canvas.style.cursor = 'grab';
    resize();
    if (cubeLoopCtrl) cubeLoopCtrl.sync();
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
    if (cubeLoopCtrl) cubeLoopCtrl.sync();
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

  const ambientLight = new THREE.AmbientLight(0xFFFDF8, 0.88);
  scene.add(ambientLight);
  const keyLight = new THREE.PointLight(0x5BBAD5, 1.15, 40);
  keyLight.position.set(4, 5, 6);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(0xC29A63, 0.65, 40);
  rimLight.position.set(-5, -3, -4);
  scene.add(rimLight);
  const centerGlow = new THREE.PointLight(0x1B6A82, 0.45, 10);
  scene.add(centerGlow);

  const cubeGroup = new THREE.Group();
  scene.add(cubeGroup);

  const size = 2.5;
  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(size, size, size),
    new THREE.MeshPhongMaterial({
      color: 0xD3E3EA,
      transparent: true,
      opacity: 0.24,
      shininess: 90,
      specular: 0xFFFFFF,
      side: THREE.DoubleSide,
      depthWrite: false
    })
  );
  cubeGroup.add(glass);

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size)),
    new THREE.LineBasicMaterial({ color: 0x1B6A82, transparent: true, opacity: 0.78 })
  );
  cubeGroup.add(edges);

  const cornerMat = new THREE.MeshPhongMaterial({ color: 0x9A723E, shininess: 110, specular: 0xF5E7CE });
  const cornerGeo = new THREE.SphereGeometry(0.07, 12, 10);
  const hs = size / 2;
  [[-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1], [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1]].forEach((s) => {
    const node = new THREE.Mesh(cornerGeo, cornerMat);
    node.position.set(s[0] * hs, s[1] * hs, s[2] * hs);
    cubeGroup.add(node);
  });

  const faceDefs = [
    { key: 'VISUAL', dir: [0, 0, 1] },
    { key: 'AIGC', dir: [0, 0, -1] },
    { key: 'INTERACTIVE', dir: [0, 1, 0] },
    { key: 'VIDEO', dir: [0, -1, 0] },
    { key: 'MOTION', dir: [1, 0, 0] },
    { key: 'DESIGN', dir: [-1, 0, 0] }
  ];
  const faceMeshes = [];
  const faceTextures = [];
  const off = hs + 0.02;

  function makeFaceTexture(text, index, isSelected) {
    const canvas2d = document.createElement('canvas');
    canvas2d.width = 256;
    canvas2d.height = 256;
    const ctx = canvas2d.getContext('2d');
    const texture = new THREE.CanvasTexture(canvas2d);
    const target = { canvas: canvas2d, ctx, texture };
    drawFaceTexture(target, text, index, isSelected);
    return target;
  }

  function drawFaceTexture(target, text, index, isSelected) {
    const { ctx } = target;
    if (!ctx) return;
    const isDark = state.theme === 'dark';
    const accentColor = isDark ? '#8ED8F0' : '#1B6A82';
    const textColor = isDark ? '#F5F4F0' : '#1A1A1A';

    ctx.clearRect(0, 0, 256, 256);

    if (isSelected) {
      ctx.fillStyle = isDark ? 'rgba(142, 216, 240, 0.18)' : 'rgba(27, 106, 130, 0.14)';
      ctx.fillRect(10, 10, 236, 236);
    }

    ctx.strokeStyle = isSelected ? accentColor : (isDark ? 'rgba(142, 216, 240, 0.35)' : 'rgba(27, 106, 130, 0.45)');
    ctx.lineWidth = isSelected ? 4 : 3;
    const m = 18, l = 26;
    ctx.beginPath();
    ctx.moveTo(m, m + l); ctx.lineTo(m, m); ctx.lineTo(m + l, m);
    ctx.moveTo(256 - m - l, m); ctx.lineTo(256 - m, m); ctx.lineTo(256 - m, m + l);
    ctx.moveTo(m, 256 - m - l); ctx.lineTo(m, 256 - m); ctx.lineTo(m + l, 256 - m);
    ctx.moveTo(256 - m - l, 256 - m); ctx.lineTo(256 - m, 256 - m); ctx.lineTo(256 - m, 256 - m - l);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isSelected ? accentColor : textColor;
    ctx.shadowColor = isDark ? 'rgba(142, 216, 240, 0.65)' : 'rgba(27, 106, 130, 0.16)';
    ctx.shadowBlur = isDark ? 16 : 6;
    let fontSize = 44;
    ctx.font = '700 ' + fontSize + 'px ' + SCENE_FONT_STACK;
    while (ctx.measureText(text).width > 196 && fontSize > 20) {
      fontSize -= 3;
      ctx.font = '700 ' + fontSize + 'px ' + SCENE_FONT_STACK;
    }
    ctx.fillText(text, 128, 126);
    ctx.shadowBlur = 0;
    ctx.fillStyle = accentColor;
    ctx.font = '600 15px ' + SCENE_FONT_STACK;
    ctx.fillText('0' + (index + 1), 128, 176);
    if (target.texture) target.texture.needsUpdate = true;
  }

  faceDefs.forEach((def, index) => {
    const tex = makeFaceTexture(getCubeFaceText(def.key), index, state.activeCubeFace === def.key);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(size * 0.82, size * 0.82),
      new THREE.MeshBasicMaterial({ map: tex.texture, transparent: true, opacity: 0.94, depthWrite: false })
    );
    plane.position.set(def.dir[0] * off, def.dir[1] * off, def.dir[2] * off);
    if (def.dir[2] === -1) plane.rotation.y = Math.PI;
    if (def.dir[1] === 1) plane.rotation.x = -Math.PI / 2;
    if (def.dir[1] === -1) plane.rotation.x = Math.PI / 2;
    if (def.dir[0] === 1) plane.rotation.y = Math.PI / 2;
    if (def.dir[0] === -1) plane.rotation.y = -Math.PI / 2;
    cubeGroup.add(plane);
    faceMeshes.push(plane);
    faceTextures.push(tex);
  });

  function redrawAllFaces() {
    faceDefs.forEach((def, index) => {
      drawFaceTexture(faceTextures[index], getCubeFaceText(def.key), index, state.activeCubeFace === def.key);
    });
  }

  function applyCubeTheme(theme) {
    const isDark = theme === 'dark';
    ambientLight.color.setHex(isDark ? 0xBFD4E2 : 0xFFFDF8);
    ambientLight.intensity = isDark ? 0.6 : 0.88;
    keyLight.color.setHex(isDark ? 0x8ED8F0 : 0x5BBAD5);
    rimLight.color.setHex(isDark ? 0x5B79A8 : 0xC29A63);
    centerGlow.color.setHex(isDark ? 0x8ED8F0 : 0x1B6A82);
    glass.material.color.setHex(isDark ? 0x1B2836 : 0xD3E3EA);
    glass.material.opacity = isDark ? 0.18 : 0.24;
    edges.material.color.setHex(isDark ? 0xC9D6E3 : 0x1B6A82);
    cornerMat.color.setHex(isDark ? 0xD8B986 : 0x9A723E);
    redrawAllFaces();
  }

  onThemeChange(applyCubeTheme);
  onSceneTextRefresh(redrawAllFaces);
  onCubeVisualRefresh(redrawAllFaces);
  applyCubeTheme(state.theme);

  const drag = { active: false, lastX: 0, lastY: 0, velX: 0.0032, velY: 0.0012, moved: 0 };
  const orbit = { yaw: 0, pitch: 0, active: false, lastX: 0, lastY: 0, velYaw: 0, velPitch: 0, moved: 0 };

  canvas.addEventListener('pointerdown', (event) => {
    drag.moved = 0;
    orbit.moved = 0;
    if (immersive) {
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
    if (orbit.active) {
      const dx = event.clientX - orbit.lastX;
      const dy = event.clientY - orbit.lastY;
      orbit.yaw -= dx * 0.005;
      orbit.pitch -= dy * 0.004;
      orbit.pitch = Math.max(-1.1, Math.min(1.1, orbit.pitch));
      orbit.velYaw = -dx * 0.005 * 0.4;
      orbit.velPitch = -dy * 0.004 * 0.4;
      orbit.moved += Math.abs(dx) + Math.abs(dy);
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
    drag.moved += Math.abs(dx) + Math.abs(dy);
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
  }, { passive: true });

  window.addEventListener('pointerup', () => {
    drag.active = false;
    orbit.active = false;
    canvas.style.cursor = immersive ? 'grab' : 'default';
  });

  const raycaster = new THREE.Raycaster();
  let hoveredFace = null;

  canvas.addEventListener('pointermove', (event) => {
    if (drag.active || orbit.active) { hoveredFace = null; hideTooltip(); return; }
    raycaster.setFromCamera(toNDC(event, canvas), camera);
    const hits = raycaster.intersectObjects(faceMeshes, false);
    const face = hits.length ? hits[0].object : null;
    if (face !== hoveredFace) {
      hoveredFace = face;
      canvas.style.cursor = face ? 'pointer' : (immersive ? 'grab' : 'default');
    }
    if (face) {
      showTooltip(event.clientX, event.clientY, getCubeFaceText(faceDefs[faceMeshes.indexOf(face)].key));
    } else {
      hideTooltip();
    }
  });

  canvas.addEventListener('pointerleave', () => {
    hoveredFace = null;
    canvas.style.cursor = immersive ? 'grab' : 'default';
    hideTooltip();
  });

  canvas.addEventListener('click', (event) => {
    if (drag.moved > 6 || orbit.moved > 6) return;
    raycaster.setFromCamera(toNDC(event, canvas), camera);
    const hits = raycaster.intersectObjects(faceMeshes, false);
    if (!hits.length) return;
    const faceIndex = faceMeshes.indexOf(hits[0].object);
    const faceKey = faceDefs[faceIndex].key;
    setCubeFilter(faceKey);
    showTooltip(event.clientX, event.clientY, getCubeFaceText(faceKey));
    setTimeout(hideTooltip, 1300);
    if (immersive) {
      setTimeout(() => exitImmersive(), 260);
    }
  });

  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const clock = new THREE.Clock();

  function renderCubeFrame() {
    const t = clock.getElapsedTime();

    immT += ((immersive ? 1 : 0) - immT) * 0.06;
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

    if (!drag.active && !prefersReducedMotion()) {
      cubeGroup.rotation.y += drag.velY;
      cubeGroup.rotation.x += drag.velX;
      cubeGroup.rotation.x = Math.max(-1.2, Math.min(1.2, cubeGroup.rotation.x));
      drag.velX += (0.0011 - drag.velX) * 0.02;
      drag.velY += (0.0032 - drag.velY) * 0.02;
    }

    faceMeshes.forEach((face, idx) => {
      const isSelected = state.activeCubeFace === faceDefs[idx].key;
      const targetScale = face === hoveredFace ? 1.14 : (isSelected ? 1.07 : 1);
      face.scale.x += (targetScale - face.scale.x) * 0.12;
      face.scale.y += (targetScale - face.scale.y) * 0.12;
    });

    const hoverBoost = hoveredFace ? 0.5 : 0;
    centerGlow.intensity = 0.45 + (prefersReducedMotion() ? 0 : Math.sin(t * 1.1) * 0.1) + hoverBoost;
    edges.material.opacity = 0.72 + (prefersReducedMotion() ? 0 : Math.sin(t * 1.4) * 0.08) + hoverBoost * 0.2;
    cubeGroup.position.y = prefersReducedMotion() ? 0 : Math.sin(t * 0.8) * 0.08;

    renderer.render(scene, camera);
  }

  cubeLoopCtrl = createSceneLoop('cubeCanvas', 'cube', renderCubeFrame, () => immersive);
}

/* ============================================================
 * 360° 轨道日晷滚动进度盘（等比章节节点 + 弧线进度 + 悬浮详情）与页面聚焦
 * ============================================================ */
const SVG_NS = 'http://www.w3.org/2000/svg';
const ORBITAL_RADIUS = 40;
const ORBITAL_CIRCUMFERENCE = 2 * Math.PI * ORBITAL_RADIUS;
const ORBITAL_SECTIONS = ['about', 'education', 'experience', 'projects', 'works', 'skills', 'contact'];
let orbitalNodeEls = [];
let orbitalRatios = [];
let orbitalLayoutRaf = 0;
let lastOrbitalProgress = 0;
let mobileScrollTimer = 0;

function scheduleOrbitalLayout() {
  if (orbitalLayoutRaf) return;
  orbitalLayoutRaf = requestAnimationFrame(() => {
    orbitalLayoutRaf = 0;
    layoutOrbitalNodes();
    updateOrbitalDial();
  });
}

function layoutOrbitalNodes() {
  const container = document.getElementById('orbitalNodes');
  if (!container) return;

  const text = getText();
  const labels = text.railNav || text.nav;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

  const rawRatios = ORBITAL_SECTIONS.map((secId) => {
    const sec = document.getElementById(secId);
    if (!sec) return 0;
    const top = Math.max(0, sec.getBoundingClientRect().top + window.scrollY - 76);
    return Math.max(0.02, Math.min(0.96, top / maxScroll));
  });

  // 保持真实位置比例的同时防止极窄视口下相邻圆点视觉重叠
  const minGap = 0.032;
  for (let i = 1; i < rawRatios.length; i++) {
    if (rawRatios[i] - rawRatios[i - 1] < minGap) {
      rawRatios[i] = Math.min(0.98, rawRatios[i - 1] + minGap);
    }
  }
  orbitalRatios = rawRatios;

  container.textContent = '';
  orbitalNodeEls = ORBITAL_SECTIONS.map((secId, index) => {
    const ratio = rawRatios[index];
    const angle = ratio * Math.PI * 2 - Math.PI / 2;
    const cx = 50 + ORBITAL_RADIUS * Math.cos(angle);
    const cy = 50 + ORBITAL_RADIUS * Math.sin(angle);
    const label = `0${index + 1} / ${labels[index] || secId}`;

    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class', 'orbital-node');
    g.setAttribute('role', 'button');
    g.setAttribute('tabindex', '0');
    g.setAttribute('aria-label', label);
    g.dataset.section = secId;
    g.dataset.index = String(index);

    const hit = document.createElementNS(SVG_NS, 'circle');
    hit.setAttribute('class', 'orbital-node-hit');
    hit.setAttribute('cx', cx.toFixed(2));
    hit.setAttribute('cy', cy.toFixed(2));
    hit.setAttribute('r', '6.5');

    const dot = document.createElementNS(SVG_NS, 'circle');
    dot.setAttribute('class', 'orbital-node-dot');
    dot.setAttribute('cx', cx.toFixed(2));
    dot.setAttribute('cy', cy.toFixed(2));
    dot.setAttribute('r', '2.1');

    g.appendChild(hit);
    g.appendChild(dot);

    const jumpToSection = (event) => {
      event.stopPropagation();
      event.preventDefault();
      hideTooltip();
      const target = document.getElementById(secId);
      if (target) {
        if (target.classList.contains('card')) target.classList.add('revealed');
        target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      }
    };

    g.addEventListener('click', jumpToSection);
    g.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') jumpToSection(event);
    });
    g.addEventListener('mouseenter', () => {
      const rect = g.getBoundingClientRect();
      showTooltip(rect.left + rect.width / 2, rect.top, label);
    });
    g.addEventListener('mouseleave', hideTooltip);

    container.appendChild(g);
    return g;
  });
}

function getActiveOrbitalSectionIndex() {
  const focusY = window.scrollY + window.innerHeight * 0.35;
  let activeIdx = -1;
  ORBITAL_SECTIONS.forEach((id, idx) => {
    const sec = document.getElementById(id);
    if (!sec) return;
    const top = sec.getBoundingClientRect().top + window.scrollY;
    if (focusY >= top - 40) activeIdx = idx;
  });
  return activeIdx;
}

function updateOrbitalDial() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
  lastOrbitalProgress = progress;

  const arc = document.getElementById('orbitalArc');
  if (arc) {
    arc.style.strokeDasharray = ORBITAL_CIRCUMFERENCE.toFixed(4);
    arc.style.strokeDashoffset = (ORBITAL_CIRCUMFERENCE * (1 - progress)).toFixed(4);
  }

  const bead = document.getElementById('orbitalBead');
  if (bead) {
    const angle = progress * Math.PI * 2 - Math.PI / 2;
    bead.setAttribute('cx', (50 + ORBITAL_RADIUS * Math.cos(angle)).toFixed(2));
    bead.setAttribute('cy', (50 + ORBITAL_RADIUS * Math.sin(angle)).toFixed(2));
  }

  const pctNum = Math.round(progress * 100);
  const pctEl = document.getElementById('orbitalPct');
  if (pctEl) pctEl.textContent = (pctNum < 10 ? '0' : '') + pctNum + '%';

  const activeIdx = getActiveOrbitalSectionIndex();
  const text = getText();
  const navLabels = text.nav || [];
  const secEl = document.getElementById('orbitalSec');
  if (secEl) {
    secEl.textContent = activeIdx >= 0 ? (navLabels[activeIdx] || ORBITAL_SECTIONS[activeIdx]) : text.orbitalHero;
  }

  const topBtn = document.getElementById('orbitalTopBtn');
  if (topBtn) {
    topBtn.textContent = text.orbitalTop;
    topBtn.hidden = window.scrollY < window.innerHeight * 0.45;
  }

  orbitalNodeEls.forEach((node, idx) => {
    const isActive = idx === activeIdx;
    node.classList.toggle('active', isActive);
    const dot = node.querySelector('.orbital-node-dot');
    if (dot) dot.setAttribute('r', isActive ? '3.1' : '2.1');
  });

  document.querySelectorAll('.quick a').forEach((link, j) => {
    link.classList.toggle('active', j === activeIdx);
  });
}

function bindOrbitalDial() {
  const topBtn = document.getElementById('orbitalTopBtn');
  if (topBtn) {
    topBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    });
  }

  const container = document.querySelector('.container');
  if (container && 'ResizeObserver' in window) {
    const ro = new ResizeObserver(() => scheduleOrbitalLayout());
    ro.observe(container);
  }

  const expList = document.getElementById('experienceList');
  if (expList) {
    expList.addEventListener('toggle', () => scheduleOrbitalLayout(), true);
  }

  window.addEventListener('load', scheduleOrbitalLayout);
  window.addEventListener('resize', scheduleOrbitalLayout, { passive: true });
  scheduleOrbitalLayout();
}

function initPageFlow() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hero = document.querySelector('section.hero');
  const cards = Array.from(document.querySelectorAll('.container section.card'));
  const pages = hero ? [hero].concat(cards) : cards;
  if (pages.length < 2) return;

  let current = -1;
  let locked = false;
  let lockTimer = 0;

  function blocked() {
    return document.body.classList.contains('ws-immersive') ||
      document.body.classList.contains('cube-immersive') ||
      document.body.classList.contains('is-pdf-open') ||
      document.body.classList.contains('is-pf-open');
  }

  function pageTop(i) {
    return pages[i].getBoundingClientRect().top + window.scrollY - 76;
  }

  function currentPageIndex() {
    const center = window.scrollY + window.innerHeight * 0.45;
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
    lockTimer = setTimeout(() => { locked = false; }, 900);
    window.scrollTo({ top: pageTop(i), behavior: 'smooth' });
    applyActive(i);
  }

  function applyActive(i) {
    if (i !== current) {
      current = i;
      pages.forEach((sec, j) => sec.classList.toggle('page-active', j === i));
    }
    updateOrbitalDial();
  }

  let ticking = false;
  function onScroll() {
    document.body.classList.add('is-scrolling');
    clearTimeout(mobileScrollTimer);
    mobileScrollTimer = setTimeout(() => document.body.classList.remove('is-scrolling'), 850);

    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      applyActive(currentPageIndex());
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  window.addEventListener('wheel', (event) => {
    if (reduced || !finePointer || blocked()) return;
    if (locked) { event.preventDefault(); return; }
    if (event.deltaY <= 24) return;
    if (currentPageIndex() !== 0) return;
    if (window.scrollY > 40) return;
    event.preventDefault();
    goToPage(1);
  }, { passive: false });

  window.addEventListener('resize', onScroll);
  applyActive(0);
  pages[0].classList.add('page-active');
  current = 0;
}

/* ============================================================
 * Phase 2：策展式 Preloader / ATB 视角聚焦 / Particle Atelier
 * ============================================================ */
function initPreloader(readyPromise) {
  const preloader = document.getElementById('atelierPreloader');
  const countEl = document.getElementById('preloaderCount');
  const barEl = document.getElementById('preloaderBarFill');
  if (!preloader) {
    document.body.classList.remove('is-preloading');
    return;
  }

  const dismiss = () => {
    if (countEl) countEl.textContent = '100%';
    if (barEl) barEl.style.width = '100%';
    preloader.classList.add('is-done');
    document.body.classList.remove('is-preloading');
    setTimeout(() => { preloader.hidden = true; }, prefersReducedMotion() ? 220 : 760);
  };

  if (prefersReducedMotion()) {
    dismiss();
    return;
  }

  const start = performance.now();
  let readyResolved = false;
  let closed = false;

  const waitReady = readyPromise && typeof readyPromise.then === 'function'
    ? readyPromise.then(() => { readyResolved = true; }).catch(() => { readyResolved = true; })
    : Promise.resolve().then(() => { readyResolved = true; });
  void waitReady;

  function step(now) {
    if (closed) return;
    const elapsed = now - start;
    const timePct = Math.min(96, Math.round((elapsed / 900) * 100));
    const pct = readyResolved && elapsed >= 480 ? 100 : timePct;
    if (countEl) countEl.textContent = (pct < 10 ? '0' : '') + pct + '%';
    if (barEl) barEl.style.width = pct + '%';

    if ((readyResolved && elapsed >= 520) || elapsed >= 1000) {
      closed = true;
      dismiss();
      return;
    }
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ATB 双重视角聚焦控制器 */
function renderFocusLensUI() {
  const text = getText();
  const caption = document.getElementById('focusLensCaption');
  if (caption) caption.textContent = text.focusLensCaption || 'ATB Focus Lens';

  const opts = text.focusLensOptions || {};
  document.querySelectorAll('.focus-lens-btn').forEach((btn) => {
    const mode = btn.dataset.lens;
    if (opts[mode]) btn.textContent = opts[mode];
    const active = state.focusLens === mode;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function applyLensGroup(selector, attrName, mapObj, mode) {
  document.querySelectorAll(selector).forEach((node) => {
    if (mode === 'all') {
      node.classList.remove('lens-match', 'lens-dim');
      return;
    }
    const key = node.getAttribute(attrName);
    const roles = mapObj[key] || [];
    const matched = roles.includes(mode);
    node.classList.toggle('lens-match', matched);
    node.classList.toggle('lens-dim', !matched);
  });
}

function applyFocusLensUI() {
  const mode = state.focusLens;
  applyLensGroup('#aboutHighlights .highlight-item', 'data-highlight-index', FOCUS_LENS_MAP.highlights, mode);
  applyLensGroup('#educationList .list-item', 'data-edu-index', FOCUS_LENS_MAP.education, mode);
  applyLensGroup('#experienceList .article', 'data-exp-index', FOCUS_LENS_MAP.experience, mode);
  applyLensGroup('#projectsList .list-item', 'data-proj-index', FOCUS_LENS_MAP.projects, mode);
  applyLensGroup('#worksList .work-card', 'data-work-id', FOCUS_LENS_MAP.works, mode);
  applyLensGroup('#skillsGrid .skill-pill', 'data-skill-index', FOCUS_LENS_MAP.skills, mode);
}

function setFocusLens(mode) {
  const valid = ['all', 'design-tech', 'ops-business'].includes(mode) ? mode : 'all';
  state.focusLens = valid;
  renderFocusLensUI();
  applyFocusLensUI();
  scheduleOrbitalLayout();
}

function bindFocusLens() {
  const bar = document.getElementById('focusLensBar');
  if (!bar) return;
  bar.addEventListener('click', (event) => {
    const btn = event.target.closest('.focus-lens-btn');
    if (!btn) return;
    setFocusLens(btn.dataset.lens);
  });
}

/* Particle Atelier 隐藏微光彩蛋与星核路标 */
function updateParticleTriggerUI() {
  const btn = document.getElementById('particleTrigger');
  const layer = document.getElementById('starCoresLayer');
  const text = getText();
  const active = state.particleAtelier;
  const tip = active ? text.particleTooltipOn : text.particleTooltipOff;
  if (btn) {
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
    btn.setAttribute('aria-label', tip);
    btn.dataset.tooltip = tip;
  }
  if (layer) {
    layer.classList.toggle('active', active);
    layer.setAttribute('aria-hidden', String(!active));
  }
}

function renderStarCores() {
  const layer = document.getElementById('starCoresLayer');
  if (!layer) return;
  const cores = getText().starCores || [];
  layer.textContent = '';

  cores.forEach((core, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'star-core-btn';
    btn.dataset.core = String(idx);
    btn.dataset.target = core.id;
    btn.setAttribute('aria-label', core.label);

    const orb = el('span', 'star-core-orb');
    orb.setAttribute('aria-hidden', 'true');
    const label = el('span', 'star-core-label', core.label);
    btn.appendChild(orb);
    btn.appendChild(label);

    btn.addEventListener('click', () => {
      const rect = btn.getBoundingClientRect();
      if (particleAtelierBridge && typeof particleAtelierBridge.emitRipple === 'function') {
        particleAtelierBridge.emitRipple(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      const target = document.getElementById(core.id);
      if (target) {
        if (target.classList.contains('card')) target.classList.add('revealed');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.remove('card--star-glow');
        void target.offsetWidth;
        target.classList.add('card--star-glow');
        setTimeout(() => target.classList.remove('card--star-glow'), 2050);
      }
    });

    layer.appendChild(btn);
  });
}

function toggleParticleAtelier(forceState) {
  const next = typeof forceState === 'boolean' ? forceState : !state.particleAtelier;
  if (next === state.particleAtelier) return;
  state.particleAtelier = next;
  updateParticleTriggerUI();
  if (particleAtelierBridge && typeof particleAtelierBridge.setActive === 'function') {
    particleAtelierBridge.setActive(next);
  }
  const text = getText();
  showToast(next ? text.toastParticleOn : text.toastParticleOff, next ? 4200 : 2200);
}

function bindParticleAtelier() {
  const triggerBtn = document.getElementById('particleTrigger');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => toggleParticleAtelier());
  }

  // 隐秘触发 A1：连击 3 次品牌图标 DA
  const brandMark = document.getElementById('brandMark');
  if (brandMark) {
    let clicks = 0;
    let clickTimer = 0;
    brandMark.addEventListener('click', () => {
      clicks += 1;
      clearTimeout(clickTimer);
      if (clicks >= 3) {
        clicks = 0;
        toggleParticleAtelier();
      } else {
        clickTimer = setTimeout(() => { clicks = 0; }, 650);
      }
    });
  }

  // 隐秘触发 A2：双击空白背景区域
  document.addEventListener('dblclick', (event) => {
    if (event.target.closest && event.target.closest('a, button, summary, details, input, textarea, select, .card, .top-bar, .pdf-modal, .pf-modal, .orbital-dial, .focus-lens-bar, .star-cores-layer, canvas#wsCanvas, canvas#cubeCanvas')) {
      return;
    }
    toggleParticleAtelier();
  });

  // ESC 退出（仅当无弹窗或 3D 全屏沉浸占用时生效）
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !state.particleAtelier) return;
    if (document.body.classList.contains('is-pdf-open') ||
      document.body.classList.contains('is-pf-open') ||
      document.body.classList.contains('ws-immersive') ||
      document.body.classList.contains('cube-immersive')) {
      return;
    }
    toggleParticleAtelier(false);
  });
}

/* ============================================================
 * 启动入口
 * ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme('light', { silent: true });
  renderResume();
  bindLanguageToggle();
  bindThemeToggle();
  bindFocusLens();
  bindParticleAtelier();
  bindOrbitalDial();
  bindCopyEmail();
  bindPdfModal();
  bindPortfolioModal();
  bindTilt();
  bindReveal();
  bindMagneticButtons();
  bindCustomCursor();
  initPageFlow();

  window.addEventListener('scroll', hideTooltip, { passive: true });

  const start3D = () => {
    init3DScene();
    initWorkspaceScene();
    initCubeScene();
  };

  const readyPromise = window.THREE
    ? Promise.resolve(true).then(start3D)
    : (window.__threeReady && typeof window.__threeReady.then === 'function'
      ? window.__threeReady.then(start3D)
      : Promise.resolve().then(start3D));

  initPreloader(readyPromise);
});

window.__atelier = {
  getState: () => ({
    language: state.language,
    theme: state.theme,
    focusLens: state.focusLens,
    particleAtelier: state.particleAtelier,
    activeCubeFace: state.activeCubeFace,
    orbitalProgress: Number(lastOrbitalProgress.toFixed(4)),
    orbitalNodeCount: orbitalNodeEls.length,
    orbitalRatios: orbitalRatios.map((r) => Number(r.toFixed(4))),
    loops: Object.fromEntries(
      Object.entries(SCENE_LOOPS).map(([k, ctrl]) => [k, { running: ctrl.isRunning(), visible: ctrl.isVisible() }])
    )
  }),
  toggleTheme,
  setFocusLens,
  toggleParticleAtelier,
  setCubeFilter,
  resetCubeFilter,
  openPortfolio,
  openResumePdf
};
