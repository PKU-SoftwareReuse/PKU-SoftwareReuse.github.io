---
layout: archive
title: "学术论文"
author_profile: false
permalink: /publications/
---

{% include base_path %}

<p>以下列表按年份排序，展示课题组在会议与期刊发表的代表性成果。</p>

{% assign publication_years = site.publications | map: "year" | uniq | sort | reverse %}
{% assign current_year = site.time | date: "%Y" | plus: 0 %}
{% assign recent_year_cutoff = current_year | minus: 8 %}
{% assign older_year_label = recent_year_cutoff | minus: 1 %}
{% assign has_older_publications = false %}
{% for year in publication_years %}
  {% assign numeric_year = year | plus: 0 %}
  {% if numeric_year < recent_year_cutoff %}
    {% assign has_older_publications = true %}
  {% endif %}
{% endfor %}

<div class="publication-year-filter" role="group" aria-label="按年份筛选论文" data-publication-year-filter data-publication-year-cutoff="{{ recent_year_cutoff }}" hidden>
  <ul class="publication-year-filter__options">
    <li><button type="button" class="is-active" aria-pressed="true" aria-controls="conference-publications journal-publications" data-publication-year-option="all">全部</button></li>
    {% for year in publication_years %}
      {% assign numeric_year = year | plus: 0 %}
      {% if numeric_year >= recent_year_cutoff %}
        <li><button type="button" aria-pressed="false" aria-controls="conference-publications journal-publications" data-publication-year-option="{{ year }}">{{ year }}</button></li>
      {% endif %}
    {% endfor %}
    {% if has_older_publications %}
      <li><button type="button" aria-pressed="false" aria-controls="conference-publications journal-publications" data-publication-year-option="before">{{ older_year_label }} 及以前</button></li>
    {% endif %}
  </ul>
  <output class="publication-year-filter__status" aria-live="polite" data-publication-result-count>{{ site.publications.size }} 篇论文</output>
</div>

<section class="publication-group" id="conference-publications" data-publication-group>
  <h2>会议论文</h2>
  {% assign conference_papers = site.publications | where: "category", "conferences" | sort: "year" | reverse %}
  {% for post in conference_papers %}
    {% include archive-single-paper.html %}
  {% endfor %}
  <p class="publication-group__empty" data-publication-empty hidden>该年份暂无会议论文。</p>
</section>

<section class="publication-group" id="journal-publications" data-publication-group>
  <h2>期刊论文</h2>
  {% assign journal_papers = site.publications | where: "category", "manuscripts" | sort: "year" | reverse %}
  {% for post in journal_papers %}
    {% include archive-single-paper.html %}
  {% endfor %}
  <p class="publication-group__empty" data-publication-empty hidden>该年份暂无期刊论文。</p>
</section>
