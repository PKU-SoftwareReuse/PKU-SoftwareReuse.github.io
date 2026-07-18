---
layout: home
title: "软件复用研究组"
excerpt: "北京大学软件复用研究组，聚焦软件复用、智能化软件工程与软件知识建模。"
permalink: /
---

{% include base_path %}
{% assign custom_hero = site.static_files | where: "path", "/images/home/hero.webp" | first %}
{% unless custom_hero %}{% assign custom_hero = site.static_files | where: "path", "/images/home/hero.jpg" | first %}{% endunless %}
{% unless custom_hero %}{% assign custom_hero = site.static_files | where: "path", "/images/home/hero.png" | first %}{% endunless %}
{% assign latest_post = site.posts | sort: "date" | reverse | first %}
{% assign recent_publications = site.publications | sort: "year" | reverse %}

<section class="home-hero"{% if custom_hero %} style="--home-hero-image: url('{{ base_path }}{{ custom_hero.path }}')"{% endif %}>
  <div class="home-container home-hero__inner">
    <div class="home-hero__content">
      <p class="home-kicker"><span data-i18n-key="home.pku">北京大学</span> <span class="home-kicker__label" data-i18n-key="home.kicker">软件工程与人工智能研究</span></p>
      <h1 data-i18n-key="home.title">软件复用研究组</h1>
      <p class="home-hero__english">Software Reuse Research Group</p>
      <p class="home-hero__lead" data-i18n-key="home.lead">面向复杂软件系统，研究可复用、可演进、可验证的软件工程方法，推动人工智能与软件知识在真实工程场景中落地。</p>
      <div class="home-hero__actions">
        <a class="home-button home-button--primary" href="{{ base_path }}/research/">
          <span data-i18n-key="home.research">了解研究方向</span> <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </a>
        <a class="home-button home-button--secondary" href="{{ base_path }}/people/#join-us">
          <i class="fas fa-user-plus" aria-hidden="true"></i> <span data-i18n-key="home.join">加入我们</span>
        </a>
      </div>
      <dl class="home-stats" aria-label="课题组概况">
        <div><dt>{{ site.data.authors.size }}</dt><dd data-i18n-key="home.stats.group">团队成员</dd></div>
        <div><dt>{{ site.publications.size }}</dt><dd data-i18n-key="home.stats.papers">代表论文</dd></div>
        <div><dt>{{ site.patents.size }}</dt><dd data-i18n-key="home.stats.ip">专利软著</dd></div>
        <div><dt>3</dt><dd data-i18n-key="home.stats.areas">研究方向</dd></div>
      </dl>
      {% if latest_post %}
      <a class="home-hero__news" href="{{ base_path }}{{ latest_post.url }}">
        <span data-i18n-key="home.latest">最近动态</span>
        <time datetime="{{ latest_post.date | date_to_xmlschema }}">{{ latest_post.date | date: "%Y.%m.%d" }}</time>
        <strong>{{ latest_post.title }}</strong>
        <i class="fas fa-arrow-right" aria-hidden="true"></i>
      </a>
      {% endif %}
    </div>
  </div>
</section>

<section class="home-section home-team">
  <div class="home-container">
    <div class="home-team__layout">
      <div class="home-team__intro">
        <p class="section-kicker" data-i18n-key="home.team.kicker">我们的团队</p>
        <h2 data-i18n-key="home.team.title">由谢冰教授、邹艳珍研究员指导</h2>
        <p data-i18n-key="home.team.description">研究组依托北京大学，长期开展软件工程理论研究与工程实践，围绕复杂软件系统演进、智能化开发和软件知识建模培养高水平研究人才。</p>
        <a class="text-link" href="{{ base_path }}/people/"><span data-i18n-key="home.team.link">认识团队成员</span> <i class="fas fa-arrow-right" aria-hidden="true"></i></a>

        <div class="home-leaders">
          {% assign leader_keys = "Bing Xie|Yanzhen Zou" | split: "|" %}
          {% for leader_key in leader_keys %}
            {% assign leader = site.data.authors[leader_key] %}
            {% assign leader_slug = leader.key | replace: " ", "-" %}
            <a class="home-leader home-leader--{{ leader_slug | downcase }}" href="{{ base_path }}/people/{{ leader_slug }}/">
              <img src="{{ base_path }}/avatars/{{ leader.avatar_small }}" alt="{{ leader.name }}">
              <span><strong data-i18n-zh="{{ leader.name | escape }}" data-i18n-en="{{ leader.name_en | default: leader.name | escape }}">{{ leader.name }}</strong><small data-identity-type-zh="{{ leader.identity_type | escape }}" data-identity-type-en="{{ leader.identity_type_en | default: leader.identity_type | escape }}" data-identity-note-zh="{{ leader.identity_type_note | default: '' | escape }}" data-identity-note-en="{{ leader.identity_type_note_en | default: leader.identity_type_note | escape }}" data-identity-separator=" · ">{{ leader.identity_type }}{% if leader.identity_type_note != '' %} · {{ leader.identity_type_note }}{% endif %}</small></span>
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          {% endfor %}
        </div>
      </div>

      <div class="home-team__visual">
        {% assign team_photo = site.static_files | where: "path", "/images/home/team-group.webp" | first %}
        {% unless team_photo %}{% assign team_photo = site.static_files | where: "path", "/images/home/team-group.jpg" | first %}{% endunless %}
        {% unless team_photo %}{% assign team_photo = site.static_files | where: "path", "/images/home/team-group.png" | first %}{% endunless %}
        {% assign team_gallery = site.static_files | where_exp: "item", "item.path contains '/images/home/team-gallery/'" | sort: "path" %}
        {% if team_gallery.size > 0 or team_photo %}
          <div class="home-team__photo-stack" data-photo-stack data-interval="5200" aria-label="团队活动照片">
            <div class="home-team__photo-stack__slides">
              {% if team_gallery.size > 0 %}
                {% for photo in team_gallery %}
                  <figure class="home-team__photo-slide{% if forloop.first %} is-active{% elsif forloop.index == 2 %} is-next{% endif %}" data-photo-slide data-photo-slide-index="{{ forloop.index0 }}" aria-hidden="{% unless forloop.first %}true{% else %}false{% endunless %}">
                    <img src="{{ base_path }}{{ photo.path }}" alt="软件复用研究组团队活动照片 {{ forloop.index }}">
                  </figure>
                {% endfor %}
              {% else %}
                <figure class="home-team__photo-slide is-active" data-photo-slide data-photo-slide-index="0" aria-hidden="false">
                  <img src="{{ base_path }}{{ team_photo.path }}" alt="软件复用研究组团队合影">
                </figure>
              {% endif %}
            </div>
            {% if team_gallery.size > 1 %}
              <div class="home-team__photo-stack__controls" role="tablist" aria-label="团队活动照片切换">
                {% for photo in team_gallery %}
                  <button type="button" data-photo-slide-button="{{ forloop.index0 }}" role="tab" aria-label="查看第 {{ forloop.index }} 张团队照片" aria-selected="{% if forloop.first %}true{% else %}false{% endif %}"></button>
                {% endfor %}
              </div>
            {% endif %}
          </div>
        {% else %}
          <div class="home-member-collage" aria-label="课题组成员照片">
            {% assign displayed_members = 0 %}
            {% for item in site.data.authors %}
              {% assign member = item[1] %}
              {% assign member_avatar = member.avatar_small %}
              {% if member_avatar == "profile.png" and member.avatar_big and member.avatar_big != "profile.png" %}
                {% assign member_avatar = member.avatar_big %}
              {% endif %}
              {% if member_avatar and member_avatar != "profile.png" and displayed_members < 7 %}
                <div class="home-member-collage__item">
                  <img src="{{ base_path }}/avatars/{{ member_avatar }}" alt="{{ member.name }}">
                  <span>{{ member.name }}</span>
                </div>
                {% assign displayed_members = displayed_members | plus: 1 %}
              {% endif %}
            {% endfor %}
          </div>
        {% endif %}
      </div>
    </div>
  </div>
</section>

<section class="home-section home-vision">
  <div class="home-container home-vision__layout">
    <div class="home-vision__content">
      <p class="section-kicker" data-i18n-key="home.vision.kicker">研究理念</p>
      <h2 data-i18n-key="home.vision.title">让软件知识与工程能力持续复用</h2>
      <p data-i18n-key="home.vision.description">软件复用不只是代码复用，也包括架构、知识、经验与开发能力的沉淀。我们从复杂软件系统出发，研究如何让这些资产可理解、可组合并持续演进。</p>
      <div class="home-vision__principles">
        <article>
          <span>01</span>
          <div><h3 data-i18n-key="home.vision.knowledge">知识沉淀</h3><p data-i18n-key="home.vision.knowledge.description">将代码、架构和演进经验转化为可检索、可推理的软件知识资产。</p></div>
        </article>
        <article>
          <span>02</span>
          <div><h3 data-i18n-key="home.vision.evolution">智能演进</h3><p data-i18n-key="home.vision.evolution.description">结合程序分析与人工智能，支持复杂系统理解、修改和质量保障。</p></div>
        </article>
        <article>
          <span>03</span>
          <div><h3 data-i18n-key="home.vision.engineering">工程落地</h3><p data-i18n-key="home.vision.engineering.description">以方法、工具和平台承载研究成果，在真实软件场景中持续验证。</p></div>
        </article>
      </div>
      <a class="text-link" href="{{ base_path }}/research/"><span data-i18n-key="home.research">了解研究方向</span> <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
    </div>
  </div>
</section>

<section class="home-section home-research">
  <div class="home-container">
    <div class="section-heading section-heading--center">
      <p class="section-kicker" data-i18n-key="home.research.kicker">研究领域</p>
      <h2 data-i18n-key="home.research.title">从软件结构到智能开发</h2>
      <p data-i18n-key="home.research.description">以软件复用为基础，连接程序理解、人工智能与工程知识，研究面向真实复杂系统的方法和工具。</p>
    </div>
    <div class="home-research__grid">
      <a class="home-research-card" href="{{ base_path }}/research/">
        <span class="home-research-card__icon"><i class="fas fa-cubes" aria-hidden="true"></i></span>
        <span class="home-research-card__index">01</span>
        <h3 data-i18n-key="home.research.card1.title">软件复用与软件工程</h3>
        <p data-i18n-key="home.research.card1.description">研究构件复用、软件产品线、架构演化、软件维护与质量保障方法。</p>
        <span class="home-research-card__link"><span data-i18n-key="home.research.view">查看方向</span> <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
      </a>
      <a class="home-research-card" href="{{ base_path }}/research/">
        <span class="home-research-card__icon"><i class="fas fa-code" aria-hidden="true"></i></span>
        <span class="home-research-card__index">02</span>
        <h3 data-i18n-key="home.research.card2.title">AI for Software Engineering</h3>
        <p data-i18n-key="home.research.card2.description">探索大模型与机器学习在代码理解、自动开发、测试和缺陷定位中的应用。</p>
        <span class="home-research-card__link"><span data-i18n-key="home.research.view">查看方向</span> <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
      </a>
      <a class="home-research-card" href="{{ base_path }}/research/">
        <span class="home-research-card__icon"><i class="fas fa-diagram-project" aria-hidden="true"></i></span>
        <span class="home-research-card__index">03</span>
        <h3 data-i18n-key="home.research.card3.title">知识图谱与智能系统</h3>
        <p data-i18n-key="home.research.card3.description">构建软件知识的表示、抽取、融合、推理与检索方法，支撑知识增强的软件智能。</p>
        <span class="home-research-card__link"><span data-i18n-key="home.research.view">查看方向</span> <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
      </a>
    </div>
  </div>
</section>

<section id="projects" class="home-section home-projects">
  <div class="home-container">
    <div class="section-heading section-heading--light">
      <p class="section-kicker" data-i18n-key="home.projects.kicker">代表性工作</p>
      <h2 data-i18n-key="home.projects.title">让研究进入真实软件场景</h2>
      <p data-i18n-key="home.projects.description">围绕代码演进、低代码开发与软件知识，持续沉淀可复用的方法、系统和知识资产。</p>
    </div>
    <div class="home-projects__grid">
      {% for project in site.data.home.projects %}
        {% assign project_image = site.static_files | where: "path", project.image | first %}
        {% assign project_jpg_path = project.image | replace: ".webp", ".jpg" %}
        {% assign project_png_path = project.image | replace: ".webp", ".png" %}
        {% unless project_image %}{% assign project_image = site.static_files | where: "path", project_jpg_path | first %}{% endunless %}
        {% unless project_image %}{% assign project_image = site.static_files | where: "path", project_png_path | first %}{% endunless %}
        <article class="home-project-card">
          <a class="home-project-card__media" href="{{ base_path }}{{ project.url }}" aria-label="查看 {{ project.title }}">
            {% if project_image %}
              <img src="{{ base_path }}{{ project_image.path }}" alt="{{ project.title }}项目界面">
            {% else %}
              <span class="home-project-card__placeholder">
                <i class="fas {{ project.icon }}" aria-hidden="true"></i>
                <strong>{{ project.title }}</strong>
              </span>
            {% endif %}
          </a>
          <div class="home-project-card__body">
            <p data-i18n-zh="{{ project.label | escape }}" data-i18n-en="{{ project.label_en | default: project.label | escape }}">{{ project.label }}</p>
            <h3 data-i18n-zh="{{ project.title | escape }}" data-i18n-en="{{ project.title_en | default: project.title | escape }}">{{ project.title }}</h3>
            <div data-i18n-zh="{{ project.description | escape }}" data-i18n-en="{{ project.description_en | default: project.description | escape }}">{{ project.description }}</div>
            <a href="{{ base_path }}{{ project.url }}" aria-label="查看 {{ project.title }}相关成果"><i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          </div>
        </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="home-section home-output">
  <div class="home-container">
    <div class="home-output__layout">
      <div class="home-output__papers">
        <div class="section-heading">
          <p class="section-kicker" data-i18n-key="home.output.kicker">近期成果</p>
          <h2 data-i18n-key="home.output.title">论文发表</h2>
        </div>
        <div class="home-paper-list">
          {% for paper in recent_publications limit: 3 %}
          <article class="home-paper">
            <span class="home-paper__year">{{ paper.year }}</span>
            <div>
              <p>{{ paper.venue }}</p>
              <h3>
                {% if paper.doi and paper.doi != '' %}
                  <a href="https://doi.org/{{ paper.doi }}" target="_blank" rel="noopener">{{ paper.title }}</a>
                {% else %}
                  <a href="{{ base_path }}/publications/">{{ paper.title }}</a>
                {% endif %}
              </h3>
              <small data-name-list>{{ paper.authors }}</small>
            </div>
            <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </article>
          {% endfor %}
        </div>
        <a class="text-link" href="{{ base_path }}/publications/"><span data-i18n-key="home.output.all">浏览全部论文</span> <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
      </div>

      <aside class="home-output__news" aria-labelledby="home-news-title">
        <p class="section-kicker" data-i18n-key="home.news.kicker">最新动态</p>
        <h2 id="home-news-title" data-i18n-key="home.news.title">研究组近况</h2>
        {% if latest_post %}
          <time datetime="{{ latest_post.date | date_to_xmlschema }}">{{ latest_post.date | date: "%Y年%m月%d日" }}</time>
          <h3><a href="{{ base_path }}{{ latest_post.url }}">{{ latest_post.title }}</a></h3>
          <p>{{ latest_post.excerpt | strip_html }}</p>
        {% else %}
          <p>研究组动态正在整理中。</p>
        {% endif %}
        <a class="home-button home-button--light" href="{{ base_path }}/news/"><span data-i18n-key="home.news.all">查看全部动态</span> <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
      </aside>
    </div>
  </div>
</section>

<section class="home-contact">
  <div class="home-container home-contact__inner">
    <div>
      <p class="section-kicker" data-i18n-key="home.contact.kicker">招生与合作</p>
      <h2 data-i18n-key="home.contact.title">与我们一起研究复杂软件系统</h2>
      <p data-i18n-key="home.contact.description">欢迎具有软件工程、人工智能或相关背景的同学加入，也期待与学术界和产业界开展合作。</p>
    </div>
    <div class="home-contact__actions">
      <a class="home-button home-button--primary" href="mailto:zouyz@pku.edu.cn"><i class="fas fa-envelope" aria-hidden="true"></i> <span data-i18n-key="home.contact.email">联系我们</span></a>
      <a class="home-button home-button--secondary" href="{{ base_path }}/people/#join-us"><span data-i18n-key="home.contact.join">了解招生信息</span> <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
    </div>
  </div>
</section>
