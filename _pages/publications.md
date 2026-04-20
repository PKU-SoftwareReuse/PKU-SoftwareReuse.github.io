---
layout: archive
title: "学术论文"
author_profile: false
permalink: /publications/
---

{% include base_path %}

<p>以下列表按年份排序，展示课题组在会议与期刊发表的代表性成果。</p>

<section class="publication-group">
  <h2>会议论文</h2>
  {% assign conference_papers = site.publications | where: "category", "conferences" | sort: "year" | reverse %}
  {% for post in conference_papers %}
    {% include archive-single-paper.html %}
  {% endfor %}
</section>

<section class="publication-group">
  <h2>期刊论文</h2>
  {% assign journal_papers = site.publications | where: "category", "manuscripts" | sort: "year" | reverse %}
  {% for post in journal_papers %}
    {% include archive-single-paper.html %}
  {% endfor %}
</section>
