---
layout: archive
title: "专利与软件著作权"
title_en: "Patents & Software"
author_profile: false
permalink: /patents/
---

{% include base_path %}

<p data-i18n-key="page.patents.description">以下按类别与年份汇总课题组相关知识产权成果。</p>

<section class="patent-group">
  <h2 data-i18n-key="page.patents.patents">专利</h2>
  {% assign patents = site.patents | where: "category", "patents" | sort: "year" | reverse %}
  {% for post in patents %}
    {% include archive-single-patent.html %}
  {% endfor %}
</section>

<section class="patent-group">
  <h2 data-i18n-key="page.patents.software">软件著作权</h2>
  {% assign software = site.patents | where: "category", "software" | sort: "year" | reverse %}
  {% for post in software %}
    {% include archive-single-patent.html %}
  {% endfor %}
</section>
