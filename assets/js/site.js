(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var nav = document.getElementById('site-nav');
  var toggle = nav && nav.querySelector('.site-nav__toggle');
  var links = nav && nav.querySelector('.site-nav__links');
  var masthead = document.querySelector('.masthead');
  var progress = document.querySelector('.site-scroll-progress span');
  var hero = document.querySelector('.home-hero');

  var languageCopy = {
    zh: {
      skip: '跳到主要内容',
      'brand.home': '软件复用研究组首页',
      'nav.label': '主导航',
      'nav.menu': '菜单',
      'nav.join': '加入我们',
      'home.pku': '北京大学',
      'home.kicker': '软件工程与人工智能研究',
      'home.title': '软件复用研究组',
      'home.lead': '面向复杂软件系统，研究可复用、可演进、可验证的软件工程方法，推动人工智能与软件知识在真实工程场景中落地。',
      'home.research': '了解研究方向',
      'home.join': '加入我们',
      'home.stats.group': '团队成员',
      'home.stats.papers': '代表论文',
      'home.stats.ip': '专利软著',
      'home.stats.areas': '研究方向',
      'home.latest': '最近动态',
      'home.team.kicker': '我们的团队',
      'home.team.title': '由谢冰教授、邹艳珍研究员指导',
      'home.team.description': '研究组依托北京大学，长期开展软件工程理论研究与工程实践，围绕复杂软件系统演进、智能化开发和软件知识建模培养高水平研究人才。',
      'home.team.link': '认识团队成员',
      'home.vision.kicker': '研究理念',
      'home.vision.title': '让软件知识与工程能力持续复用',
      'home.vision.description': '软件复用不只是代码复用，也包括架构、知识、经验与开发能力的沉淀。我们从复杂软件系统出发，研究如何让这些资产可理解、可组合并持续演进。',
      'home.vision.knowledge': '知识沉淀',
      'home.vision.knowledge.description': '将代码、架构和演进经验转化为可检索、可推理的软件知识资产。',
      'home.vision.evolution': '智能演进',
      'home.vision.evolution.description': '结合程序分析与人工智能，支持复杂系统理解、修改和质量保障。',
      'home.vision.engineering': '工程落地',
      'home.vision.engineering.description': '以方法、工具和平台承载研究成果，在真实软件场景中持续验证。',
      'home.research.kicker': '研究领域',
      'home.research.title': '从软件结构到智能开发',
      'home.research.description': '以软件复用为基础，连接程序理解、人工智能与工程知识，研究面向真实复杂系统的方法和工具。',
      'home.research.card1.title': '软件复用与软件工程',
      'home.research.card1.description': '研究构件复用、软件产品线、架构演化、软件维护与质量保障方法。',
      'home.research.card2.title': 'AI for Software Engineering',
      'home.research.card2.description': '探索大模型与机器学习在代码理解、自动开发、测试和缺陷定位中的应用。',
      'home.research.card3.title': '知识图谱与智能系统',
      'home.research.card3.description': '构建软件知识的表示、抽取、融合、推理与检索方法，支撑知识增强的软件智能。',
      'home.research.view': '查看方向',
      'home.projects.kicker': '代表性工作',
      'home.projects.title': '让研究进入真实软件场景',
      'home.projects.description': '围绕代码演进、低代码开发与软件知识，持续沉淀可复用的方法、系统和知识资产。',
      'home.output.kicker': '近期成果',
      'home.output.title': '论文发表',
      'home.output.all': '浏览全部论文',
      'home.news.kicker': '最新动态',
      'home.news.title': '研究组近况',
      'home.news.all': '查看全部动态',
      'home.contact.kicker': '招生与合作',
      'home.contact.title': '与我们一起研究复杂软件系统',
      'home.contact.description': '欢迎具有软件工程、人工智能或相关背景的同学加入，也期待与学术界和产业界开展合作。',
      'home.contact.email': '联系我们',
      'home.contact.join': '了解招生信息',
      'footer.description': '面向复杂软件系统，研究软件复用、智能化软件工程与软件知识建模。',
      'footer.contact': '联系我们',
      'page.publications.description': '以下列表按年份排序，展示课题组在会议与期刊发表的代表性成果。',
      'page.publications.filter': '按年份筛选论文',
      'page.publications.conferences': '会议论文',
      'page.publications.manuscripts': '期刊论文',
      'page.publications.all': '全部',
      'page.publications.before': '及以前',
      'page.publications.count': '篇论文',
      'page.publications.empty.conferences': '该年份暂无会议论文。',
      'page.publications.empty.manuscripts': '该年份暂无期刊论文。',
      'page.patents.description': '以下按类别与年份汇总课题组相关知识产权成果。',
      'page.patents.patents': '专利',
      'page.patents.software': '软件著作权',
      'page.research.title': '研究方向',
      'page.people.title': '课题组成员',
      'page.news.description': '本页面汇总课题组近期新闻与更新。',
      'page.news.empty': '暂无最新动态。',
      'page.join.title': '招生与合作',
      'page.join.description': '课题组长期欢迎具有软件工程、人工智能或相关背景的同学加入，支持本科科研训练、硕士与博士培养，也欢迎学术与产业合作交流。',
      'page.join.contact': '欢迎对课题组研究方向感兴趣的同学与同行联系。'
      , 'research.card1.description': '研究构件复用、软件产品线、架构演化、软件维护与质量保障方法，提升大规模复杂软件系统的开发效率和持续演进能力。'
      , 'research.card2.description': '探索机器学习与大模型在代码理解、程序分析、自动化开发、测试生成、缺陷定位与工程协作中的应用。'
      , 'research.card3.description': '围绕软件工程知识的表示、抽取、融合、推理与检索，构建知识增强的软件智能化方法与工具支撑。'
    },
    en: {
      skip: 'Skip to main content',
      'brand.home': 'Software Reuse Research Group home',
      'nav.label': 'Main navigation',
      'nav.menu': 'Menu',
      'nav.join': 'Join us',
      'home.pku': 'Peking University',
      'home.kicker': 'Software Engineering & AI Research',
      'home.title': 'Software Reuse Research Group',
      'home.lead': 'We study reusable, evolvable, and verifiable software engineering methods for complex software systems, connecting artificial intelligence and software knowledge with real-world engineering.',
      'home.research': 'Explore research',
      'home.join': 'Join us',
      'home.stats.group': 'Members',
      'home.stats.papers': 'Publications',
      'home.stats.ip': 'Patents & software',
      'home.stats.areas': 'Research areas',
      'home.latest': 'Latest update',
      'home.team.kicker': 'Our team',
      'home.team.title': 'Led by Professor Bing Xie and Researcher Yanzhen Zou',
      'home.team.description': 'Based at Peking University, we combine software engineering theory with engineering practice to study complex system evolution, intelligent development, and software knowledge modeling.',
      'home.team.link': 'Meet the team',
      'home.vision.kicker': 'Research vision',
      'home.vision.title': 'Making software knowledge and engineering capability reusable',
      'home.vision.description': 'Software reuse includes more than code. We study how architecture, knowledge, experience, and development capability can become understandable, composable, and continuously evolvable assets.',
      'home.vision.knowledge': 'Knowledge assets',
      'home.vision.knowledge.description': 'Turn code, architecture, and evolution experience into searchable and inferable software knowledge.',
      'home.vision.evolution': 'Intelligent evolution',
      'home.vision.evolution.description': 'Combine program analysis and artificial intelligence to understand, change, and assure complex systems.',
      'home.vision.engineering': 'Engineering impact',
      'home.vision.engineering.description': 'Carry research into methods, tools, and platforms, validating it continuously in real software settings.',
      'home.research.kicker': 'Research areas',
      'home.research.title': 'From software structure to intelligent development',
      'home.research.description': 'Built on software reuse, our work connects program understanding, artificial intelligence, and engineering knowledge for complex real-world systems.',
      'home.research.card1.title': 'Software reuse & engineering',
      'home.research.card1.description': 'Component reuse, software product lines, architecture evolution, maintenance, and quality assurance.',
      'home.research.card2.title': 'AI for Software Engineering',
      'home.research.card2.description': 'Applying large language models and machine learning to code understanding, development, testing, and defect localization.',
      'home.research.card3.title': 'Knowledge graphs & intelligent systems',
      'home.research.card3.description': 'Representing, extracting, integrating, reasoning over, and retrieving software knowledge for knowledge-enhanced development.',
      'home.research.view': 'View area',
      'home.projects.kicker': 'Selected work',
      'home.projects.title': 'Turning research into real software systems',
      'home.projects.description': 'We build reusable methods, systems, and knowledge assets around code evolution, low-code development, and software knowledge.',
      'home.output.kicker': 'Recent output',
      'home.output.title': 'Publications',
      'home.output.all': 'View all publications',
      'home.news.kicker': 'Latest news',
      'home.news.title': 'Group updates',
      'home.news.all': 'View all news',
      'home.contact.kicker': 'Join & collaborate',
      'home.contact.title': 'Study complex software systems with us',
      'home.contact.description': 'We welcome students with backgrounds in software engineering, artificial intelligence, or related fields, as well as academic and industry collaborations.',
      'home.contact.email': 'Contact us',
      'home.contact.join': 'Admissions',
      'footer.description': 'Researching software reuse, intelligent software engineering, and software knowledge modeling for complex systems.',
      'footer.contact': 'Contact us',
      'page.publications.description': 'Representative conference and journal publications, organized by year.',
      'page.publications.filter': 'Filter publications by year',
      'page.publications.conferences': 'Conference papers',
      'page.publications.manuscripts': 'Journal papers',
      'page.publications.all': 'All',
      'page.publications.before': 'and earlier',
      'page.publications.count': ' publications',
      'page.publications.empty.conferences': 'No conference papers for this year.',
      'page.publications.empty.manuscripts': 'No journal papers for this year.',
      'page.patents.description': 'Patents and software copyrights associated with the research group, organized by category and year.',
      'page.patents.patents': 'Patents',
      'page.patents.software': 'Software copyrights',
      'page.research.title': 'Research',
      'page.people.title': 'People',
      'page.news.description': 'Recent news and updates from the research group.',
      'page.news.empty': 'No recent updates.',
      'page.join.title': 'Join & collaborate',
      'page.join.description': 'We welcome students with backgrounds in software engineering, artificial intelligence, or related fields for undergraduate research, master\'s and doctoral study, as well as academic and industry collaboration.',
      'page.join.contact': 'Please contact us if you are interested in our research.'
      , 'research.card1.description': 'We study component reuse, software product lines, architecture evolution, maintenance, and quality assurance to improve the efficiency and evolution of large-scale software systems.'
      , 'research.card2.description': 'We explore machine learning and large language models for code understanding, program analysis, automated development, test generation, defect localization, and engineering collaboration.'
      , 'research.card3.description': 'We represent, extract, integrate, reason over, and retrieve software engineering knowledge to build knowledge-enhanced intelligent software methods and tools.'
    }
  };

  var nameTranslations = {
    '北京大学': 'Peking University',
    '刘昌盛': 'Changsheng Liu',
    '刘艳军': 'Yanjun Liu',
    '古亮': 'Liang Gu',
    '孙家骕': 'Jiasu Sun',
    '孙泽宇': 'Zeyu Sun',
    '孙立伟': 'Liwei Sun',
    '宋怀达': 'Huaida Song',
    '张良杰': 'Liangjie Zhang',
    '张顺廷': 'Shunting Zhang',
    '房路': 'Lu Fang',
    '李戈': 'Ge Li',
    '李琰': 'Yan Li',
    '梅宏': 'Hong Mei',
    '潘颖': 'Ying Pan',
    '王华': 'Hua Wang',
    '王涛': 'Tao Wang',
    '蔡斯博': 'Sibo Cai',
    '赵俊峰': 'Junfeng Zhao',
    '邵维忠': 'Weizhong Shao',
    '郭玉辉': 'Yuhui Guo',
    '郭耀': 'Yao Guo',
    '金靖': 'Jing Jin',
    '钱金蕾': 'Jinlei Qian',
    '麻志毅': 'Zhiyi Ma',
    '黄艺燕': 'Yiyan Huang'
  };

  var nameTranslationData = document.getElementById('site-name-translations');
  if (nameTranslationData) {
    try {
      Object.assign(nameTranslations, JSON.parse(nameTranslationData.textContent));
    } catch (error) {
      // Keep the built-in historical-name map if generated member data is unavailable.
    }
  }

  function translateNameList(value) {
    var translated = value;
    Object.keys(nameTranslations).sort(function (a, b) {
      return b.length - a.length;
    }).forEach(function (name) {
      translated = translated.split(name).join(nameTranslations[name]);
    });
    return translated;
  }

  function getLanguage() {
    try {
      return window.localStorage.getItem('site-language') === 'en' ? 'en' : 'zh';
    } catch (error) {
      return 'zh';
    }
  }

  function saveLanguage(language) {
    try {
      window.localStorage.setItem('site-language', language);
    } catch (error) {
      // Private browsing may disable localStorage; the current page still switches.
    }
  }

  function applyLanguage(language) {
    var copy = languageCopy[language] || languageCopy.zh;
    var identityTypes = {
      '教授': 'Professor',
      '研究员': 'Researcher',
      '博士': 'PhD alumni',
      '博士生': 'PhD student',
      '硕士': 'Master\'s alumni',
      '硕士生': 'Master\'s student',
      '本科生': 'Undergraduate',
      '已毕业': 'Alumni'
    };
    var identityNotes = {
      '杰青': 'Distinguished Young Scholar',
      '直博': 'Direct-entry PhD',
      '强军硕士': 'Military Graduate Program',
      '北京大学': 'Peking University'
    };
    root.dataset.language = language;
    root.lang = language === 'en' ? 'en' : 'zh-CN';

    document.querySelectorAll('[data-i18n-key]').forEach(function (element) {
      var value = copy[element.dataset.i18nKey];
      if (value !== undefined) element.textContent = value;
    });

    document.querySelectorAll('[data-i18n-zh][data-i18n-en]').forEach(function (element) {
      element.textContent = language === 'en' ? element.dataset.i18nEn : element.dataset.i18nZh;
    });

    document.querySelectorAll('[data-name-list]').forEach(function (element) {
      if (!element.dataset.nameOriginal) {
        element.dataset.nameOriginal = element.textContent.replace(/\s+/g, ' ').trim();
      }
      element.textContent = language === 'en' ? translateNameList(element.dataset.nameOriginal) : element.dataset.nameOriginal;
    });

    document.querySelectorAll('[data-identity-type]').forEach(function (element) {
      var type = element.dataset.identityType || '';
      var note = element.dataset.identityNote || '';
      var separator = element.dataset.identitySeparator || '-';
      if (language === 'en') {
        element.textContent = (identityTypes[type] || type) + (note ? ' · ' + (identityNotes[note] || note) : '');
      } else {
        element.textContent = type + (note ? separator + note : '');
      }
    });

    document.querySelectorAll('[data-i18n-aria-key]').forEach(function (element) {
      var value = copy[element.dataset.i18nAriaKey];
      if (value !== undefined) element.setAttribute('aria-label', value);
    });

    document.querySelectorAll('[data-publication-result-count][data-publication-visible-count]').forEach(function (status) {
      status.textContent = status.dataset.publicationVisibleCount + ' ' + (language === 'en' ? 'publications' : '篇论文');
    });

    var switcher = document.querySelector('[data-language-toggle]');
    if (switcher) {
      var label = switcher.querySelector('[data-language-label]');
      if (label) label.textContent = language === 'en' ? '中' : 'EN';
      switcher.setAttribute('aria-label', language === 'en' ? '切换到中文' : 'Switch to English');
      switcher.setAttribute('aria-pressed', String(language === 'en'));
    }

    document.title = language === 'en' ? document.title.replace(/软件复用研究组|软件复用小组|学术论文|专利与软件著作权|研究方向|课题组成员|最新动态/g, function (title) {
      return ({ '软件复用研究组': 'Software Reuse Research Group', '软件复用小组': 'Software Reuse Group', '学术论文': 'Publications', '专利与软件著作权': 'Patents & Software', '研究方向': 'Research', '课题组成员': 'People', '最新动态': 'News' })[title] || title;
    }) : document.title.replace(/Software Reuse Research Group|Software Reuse Group|Publications|Patents & Software|Research|People|News/g, function (title) {
      return ({ 'Software Reuse Research Group': '软件复用研究组', 'Software Reuse Group': '软件复用小组', Publications: '学术论文', 'Patents & Software': '专利与软件著作权', Research: '研究方向', People: '课题组成员', News: '最新动态' })[title] || title;
    });
  }

  var currentLanguage = getLanguage();
  applyLanguage(currentLanguage);
  var languageToggle = document.querySelector('[data-language-toggle]');
  if (languageToggle) {
    languageToggle.addEventListener('click', function () {
      currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
      saveLanguage(currentLanguage);
      applyLanguage(currentLanguage);
    });
  }

  root.classList.add('motion-ready');

  function setNav(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);

    var icon = toggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars', !open);
      icon.classList.toggle('fa-xmark', open);
    }
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('is-open'));
    });

    links.addEventListener('click', function (event) {
      if (event.target.closest('a')) setNav(false);
    });

    document.addEventListener('click', function (event) {
      if (nav.classList.contains('is-open') && !nav.contains(event.target)) setNav(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setNav(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) setNav(false);
    });
  }

  document.querySelectorAll('.author__urls-wrapper button').forEach(function (button) {
    button.addEventListener('click', function () {
      var list = button.parentElement.querySelector('.author__urls');
      if (!list) return;
      var open = list.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  function initPublicationYearFilter() {
    var filter = document.querySelector('[data-publication-year-filter]');
    if (!filter) return;

    var status = filter.querySelector('[data-publication-result-count]');
    var options = Array.from(filter.querySelectorAll('[data-publication-year-option]'));
    var items = Array.from(document.querySelectorAll('.publication-item[data-publication-year]'));
    var groups = Array.from(document.querySelectorAll('[data-publication-group]'));
    var recentYearCutoff = Number(filter.dataset.publicationYearCutoff);
    if (!status || !options.length || !items.length || !Number.isFinite(recentYearCutoff)) return;

    function applyYear(year) {
      var visibleCount = 0;

      items.forEach(function (item) {
        var itemYear = Number(item.dataset.publicationYear);
        var visible = year === 'all' ||
          (year === 'before' && itemYear < recentYearCutoff) ||
          item.dataset.publicationYear === year;
        item.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      options.forEach(function (option) {
        var active = option.dataset.publicationYearOption === year;
        option.classList.toggle('is-active', active);
        option.setAttribute('aria-pressed', String(active));
      });

      groups.forEach(function (group) {
        var empty = group.querySelector('[data-publication-empty]');
        if (empty) empty.hidden = Boolean(group.querySelector('.publication-item:not([hidden])'));
      });

      status.dataset.publicationVisibleCount = visibleCount;
      status.textContent = visibleCount + ' ' + (currentLanguage === 'en' ? 'publications' : '篇论文');
    }

    var url = new URL(window.location.href);
    var requestedYear = url.searchParams.get('year');
    var hasRequestedYear = options.some(function (option) {
      return option.dataset.publicationYearOption === requestedYear;
    });
    var selectedYear = hasRequestedYear ? requestedYear : 'all';

    applyYear(selectedYear);
    filter.hidden = false;

    options.forEach(function (option) {
      option.addEventListener('click', function () {
        selectedYear = option.dataset.publicationYearOption;
        applyYear(selectedYear);

        if (selectedYear === 'all') {
          url.searchParams.delete('year');
        } else {
          url.searchParams.set('year', selectedYear);
        }
        window.history.replaceState(null, '', url.toString());
      });
    });
  }

  initPublicationYearFilter();

  function initPhotoStacks() {
    document.querySelectorAll('[data-photo-stack]').forEach(function (stack) {
      var slides = Array.from(stack.querySelectorAll('[data-photo-slide]'));
      var controls = Array.from(stack.querySelectorAll('[data-photo-slide-button]'));
      if (slides.length < 2) return;

      var activeIndex = 0;
      var interval = Number(stack.dataset.interval) || 5200;
      var timer = null;

      function showSlide(index) {
        activeIndex = (index + slides.length) % slides.length;

        slides.forEach(function (slide, slideIndex) {
          var isActive = slideIndex === activeIndex;
          var isNext = slideIndex === (activeIndex + 1) % slides.length;
          var isPrevious = slideIndex === (activeIndex - 1 + slides.length) % slides.length;
          slide.classList.toggle('is-active', isActive);
          slide.classList.toggle('is-next', isNext);
          slide.classList.toggle('is-previous', isPrevious);
          slide.setAttribute('aria-hidden', String(!isActive));
        });

        controls.forEach(function (control, controlIndex) {
          control.setAttribute('aria-selected', String(controlIndex === activeIndex));
        });
      }

      function stop() {
        if (!timer) return;
        window.clearInterval(timer);
        timer = null;
      }

      function start() {
        if (reduceMotion) return;
        stop();
        timer = window.setInterval(function () {
          showSlide(activeIndex + 1);
        }, interval);
      }

      controls.forEach(function (control) {
        control.addEventListener('click', function () {
          showSlide(Number(control.dataset.photoSlideButton));
          start();
        });
      });

      stack.addEventListener('mouseenter', stop);
      stack.addEventListener('mouseleave', start);
      stack.addEventListener('focusin', stop);
      stack.addEventListener('focusout', function () {
        if (!stack.contains(document.activeElement)) start();
      });

      showSlide(0);
      start();
    });
  }

  initPhotoStacks();

  var scrollFrame = 0;
  var pointerX = 0;
  var pointerY = 0;

  function updateHeroPosition() {
    if (!hero || reduceMotion) return;
    var scrollShift = Math.min(window.scrollY * 0.055, 28);
    hero.style.setProperty('--hero-shift-x', pointerX.toFixed(2) + 'px');
    hero.style.setProperty('--hero-shift-y', (pointerY + scrollShift).toFixed(2) + 'px');
  }

  function updateScrollState() {
    scrollFrame = 0;
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = scrollRange > 0 ? Math.min(scrollTop / scrollRange, 1) : 0;

    if (masthead) masthead.classList.toggle('is-scrolled', scrollTop > 18);
    if (progress) progress.style.transform = 'scaleX(' + ratio + ')';
    updateHeroPosition();
  }

  window.addEventListener('scroll', function () {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollState);
  }, { passive: true });

  updateScrollState();

  if (hero && finePointer && !reduceMotion) {
    hero.addEventListener('pointermove', function (event) {
      var rect = hero.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
      updateHeroPosition();
    });

    hero.addEventListener('pointerleave', function () {
      pointerX = 0;
      pointerY = 0;
      updateHeroPosition();
    });
  }

  function addRevealItems(selector, stagger) {
    document.querySelectorAll(selector).forEach(function (element, index) {
      element.classList.add('reveal-item');
      element.style.setProperty('--reveal-delay', ((index % stagger) * 80) + 'ms');
    });
  }

  function attachTilt(selector, maxX, maxY) {
    document.querySelectorAll(selector).forEach(function (element) {
      element.addEventListener('pointermove', function (event) {
        var rect = element.getBoundingClientRect();
        var relativeX = (event.clientX - rect.left) / rect.width - 0.5;
        var relativeY = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty('--tilt-x', (-relativeY * maxX).toFixed(2) + 'deg');
        element.style.setProperty('--tilt-y', (relativeX * maxY).toFixed(2) + 'deg');
      });

      element.addEventListener('pointerleave', function () {
        element.style.setProperty('--tilt-x', '0deg');
        element.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  function animateCount(element) {
    if (element.dataset.counted === 'true') return;
    element.dataset.counted = 'true';
    var target = Number(element.dataset.countTarget || element.textContent.trim());
    if (!Number.isFinite(target)) return;
    var duration = 1150;
    var startTime = 0;

    function tick(time) {
      if (!startTime) startTime = time;
      var progressValue = Math.min((time - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progressValue, 3);
      element.textContent = String(Math.round(target * eased));
      if (progressValue < 1) window.requestAnimationFrame(tick);
    }

    window.requestAnimationFrame(tick);
  }

  if (!reduceMotion) {
    addRevealItems('.home-team__intro > .section-kicker, .home-team__intro > h2, .home-team__intro > p, .home-team__intro > .text-link', 4);
    addRevealItems('.home-team__visual', 1);
    addRevealItems('.home-leader', 2);
    addRevealItems('.home-member-collage__item', 7);
    addRevealItems('.home-vision__content > .section-kicker, .home-vision__content > h2, .home-vision__content > p, .home-vision__content > .text-link', 4);
    addRevealItems('.home-vision__principles article', 3);
    addRevealItems('.home-section .section-heading', 1);
    addRevealItems('.home-research-card', 3);
    addRevealItems('.home-project-card', 3);
    addRevealItems('.home-paper', 3);
    addRevealItems('.home-output__news', 1);
    addRevealItems('.home-contact__inner > div', 2);
    addRevealItems('.people-section, .academic-card, .publication-item, .news-item, .join-panel', 5);

    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

    document.querySelectorAll('.reveal-item').forEach(function (element) {
      revealObserver.observe(element);
    });

    var countObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.75 });

    document.querySelectorAll('.home-stats dt').forEach(function (element) {
      element.dataset.countTarget = element.textContent.trim();
      element.textContent = '0';
      countObserver.observe(element);
    });

    if (finePointer) {
      attachTilt('.home-research-card', 5, 6);
      attachTilt('.home-leader', 4, 5);
      document.querySelectorAll('.home-project-card__media').forEach(function (media) {
        var visual = media.querySelector('img, .home-project-card__placeholder');
        if (!visual) return;

        media.addEventListener('pointermove', function (event) {
          var rect = media.getBoundingClientRect();
          var x = ((event.clientX - rect.left) / rect.width - 0.5) * 9;
          var y = ((event.clientY - rect.top) / rect.height - 0.5) * 7;
          visual.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0) scale(1.055)';
        });

        media.addEventListener('pointerleave', function () {
          visual.style.transform = '';
        });
      });
    }
  }

  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      root.classList.add('motion-loaded');
    });
  });
})();
