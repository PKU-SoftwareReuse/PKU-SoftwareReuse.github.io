---
layout: archive
title: "最新动态"
title_en: "News"
author_profile: false
permalink: /news/
---

{% include base_path %}

<p data-i18n-key="page.news.description">本页面汇总课题组近期新闻与更新。</p>

{% assign posts = site.posts | sort: "date" | reverse %}
{% for post in posts %}
<div class="news-item">
  <p class="news-date">{{ post.date | date: "%Y-%m-%d" }}</p>
  <p class="news-title">
    {% if post.link %}
      <a href="{{ post.link }}" target="_blank">{{ post.title }}</a>
    {% else %}
      <a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a>
    {% endif %}
  </p>
  {% if post.excerpt %}
  <p class="news-excerpt">{{ post.excerpt }}</p>
  {% endif %}
</div>
{% endfor %}

{% if posts.size == 0 %}
<p data-i18n-key="page.news.empty">暂无最新动态。</p>
{% endif %}
