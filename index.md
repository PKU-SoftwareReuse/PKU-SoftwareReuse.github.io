---
layout: single
title: "软件复用研究组"
author_profile: false
---

{% include base_path %}

<div class="hero-panel">
  <p><strong>软件复用研究组（Software Reuse Research Group）</strong>致力于面向复杂软件系统的理论研究与工程实践，重点关注软件复用、智能化软件工程与知识建模等方向。我们以“可复用、可演进、可验证”为核心理念，推动前沿方法在真实软件场景中的落地。</p>
</div>

<p class="section-intro">我们坚持以科研问题驱动工程实践，通过跨方向合作构建可迁移、可复现的研究成果。</p>

<div class="quick-links">
  <a href="{{ base_path }}/people/">团队成员</a>
  <a href="{{ base_path }}/publications/">论文发表</a>
  <a href="{{ base_path }}/patents/">专利软著</a>
  <a href="{{ base_path }}/news/">最新动态</a>
</div>

## 研究方向

<div class="academic-grid">
  <article class="academic-card">
    <h3>软件复用与软件工程</h3>
    <p>关注构件复用、产品线工程、演化与维护方法，提升大规模系统开发效率与质量保障能力。</p>
  </article>
  <article class="academic-card">
    <h3>AI for Software Engineering</h3>
    <p>探索机器学习与大模型在代码理解、自动化开发、程序分析与工程协作中的应用路径。</p>
  </article>
  <article class="academic-card">
    <h3>知识图谱与智能系统</h3>
    <p>研究知识表示、图谱构建与推理机制，支撑知识增强的软件智能化方法。</p>
  </article>
</div>

## 团队概览

团队由教授/研究员、博士研究生、硕士研究生与本科生构成，围绕软件工程核心问题开展协同研究与联合培养。具体成员信息可在[团队成员页面]({{ base_path }}/people/)查看。

## 招生与合作

课题组长期欢迎具有软件工程、人工智能或相关背景的同学加入，支持本科科研训练、硕士与博士培养，也欢迎学术与产业合作交流。

## 最新动态

{% assign posts = site.posts | sort: "date" | reverse | limit: 6 %}
{% if posts.size > 0 %}
<ul class="news-list">
  {% for post in posts %}
    <li>
      <time>{{ post.date | date: "%Y-%m-%d" }}</time>
      <a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
{% else %}
<p>暂无最新动态。欢迎查看 <a href="{{ base_path }}/publications/">论文页面</a> 获取近期成果。</p>
{% endif %}

## 联系方式

- 邮箱：zouyz@pku.edu.cn
- 地址：北京大学理科一号楼

欢迎对课题组研究方向感兴趣的同学与同行联系交流。
