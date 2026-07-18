---
layout: archive
title: "课题组成员"
title_en: "People"
author_profile: false
permalink: /people/
---

{% include base_path %}

{%- comment -%}
分组顺序定义和 identity_type 映射
{%- endcomment -%}
{% assign groups_order = "负责人,博士研究生,硕士研究生,本科生,已毕业学生" | split: "," %}
{% assign type_to_group = "" | split: "," %}
{% assign type_to_group = type_to_group | push: "教授|研究员" | split: "" %}
{% assign type_to_group = type_to_group | push: "负责人" | split: "" %}

{%- comment -%}
创建 identity_type 到分组的映射
{%- endcomment -%}
{% capture professor_types %}教授,研究员{% endcapture %}
{% capture phd_types %}博士生{% endcapture %}
{% capture master_types %}硕士生{% endcapture %}
{% capture bachelor_types %}本科生{% endcapture %}
{% capture graduate_types %}已毕业{% endcapture %}

{% for group_name in groups_order %}

  {%- comment -%} 收集当前分组的成员 {%- endcomment -%}
  {% assign group_keys = "" | split: "," %}
  {% assign group_orders = "" | split: "," %}

  {% for item in site.data.authors %}
    {% assign key = item[0] %}
    {% assign data = item[1] %}
    {% assign should_add = false %}

    {% if group_name == "负责人" %}
      {% if professor_types contains data.identity_type %}
        {% assign should_add = true %}
      {% endif %}
    {% elsif group_name == "博士研究生" %}
      {% if data.identity_type == "博士生" %}
        {% assign should_add = true %}
      {% endif %}
    {% elsif group_name == "硕士研究生" %}
      {% if data.identity_type == "硕士生" %}
        {% assign should_add = true %}
      {% endif %}
    {% elsif group_name == "本科生" %}
      {% if data.identity_type == "本科生" %}
        {% assign should_add = true %}
      {% endif %}
    {% elsif group_name == "已毕业学生" %}
      {% if data.identity_type == "博士" or data.identity_type == "硕士" or data.identity_type == "已毕业" %}
        {% assign should_add = true %}
      {% endif %}
    {% endif %}

    {% if should_add %}
      {% assign group_keys = group_keys | push: key %}
      {% assign group_orders = group_orders | push: data.order %}
    {% endif %}
  {% endfor %}

  {% if group_keys.size > 0 %}
    {%- comment -%} 按 order 排序 {%- endcomment -%}
    {% assign tuples = "" | split: "," %}
    {% for i in (0..group_keys.size) %}
      {% unless forloop.last %}
        {% assign key = group_keys[i] %}
        {% assign order = group_orders[i] %}
        {% assign sortable_order = order | plus: 10000 %}
        {% assign tuple = sortable_order | append: "|" | append: key %}
        {% assign tuples = tuples | push: tuple %}
      {% endunless %}
    {% endfor %}
    {% assign sorted_tuples = tuples | sort %}

  {% assign group_name_en = group_name %}
  {% case group_name %}
    {% when "负责人" %}{% assign group_name_en = "Group leaders" %}
    {% when "博士研究生" %}{% assign group_name_en = "PhD students" %}
    {% when "硕士研究生" %}{% assign group_name_en = "Master's students" %}
    {% when "本科生" %}{% assign group_name_en = "Undergraduate students" %}
    {% when "已毕业学生" %}{% assign group_name_en = "Alumni" %}
  {% endcase %}

  <div class="people-section{% if group_name == '负责人' %} people-section--leaders{% endif %}">
      <h2 data-i18n-zh="{{ group_name | escape }}" data-i18n-en="{{ group_name_en | escape }}">{{ group_name }}</h2>
      <ul class="people-grid{% if group_name == '负责人' %} people-grid--leaders{% endif %}">
        {% for tuple in sorted_tuples %}
          {% assign parts = tuple | split: "|" %}
          {% assign key = parts[1] %}
          {% assign data = site.data.authors[key] %}
          {% assign person_file = data.key | replace: " ", "-" %}
          {% assign first_char = data.name | slice: 0 %}
          {% assign card_avatar = data.avatar_small %}
          {% if card_avatar == "profile.png" and data.avatar_big and data.avatar_big != "profile.png" %}
            {% assign card_avatar = data.avatar_big %}
          {% endif %}
          {% assign person_path = "/people/" | append: person_file | append: "/" %}
          {% assign person_href = person_path | prepend: base_path %}
          {% assign external_url_overrides_profile = false %}
          {% if data.external_url and data.external_url != "" and data.external_url_override == true %}
            {% assign person_href = data.external_url %}
            {% assign external_url_overrides_profile = true %}
          {% endif %}

          <li>
          <a href="{{ person_href | escape }}" class="person-card{% if group_name == '负责人' %} person-card--leader{% endif %}"{% if external_url_overrides_profile %} rel="external"{% endif %}>
            {%- comment -%} 使用 avatar 字段，若为空或 profile.png 则显示名字首字 {%- endcomment -%}
            {% if card_avatar and card_avatar != "profile.png" and card_avatar != "" %}
              <img src="{{ base_path }}/avatars/{{ card_avatar }}" alt="{{ data.name }}" class="person-avatar{% if group_name == '负责人' %} person-avatar--leader person-avatar--{{ person_file | downcase }}{% endif %}">
            {% else %}
              <div class="person-avatar-placeholder">{{ first_char }}</div>
            {% endif %}

            <div class="person-name" data-i18n-zh="{{ data.name | escape }}" data-i18n-en="{{ data.name_en | default: data.name | escape }}">{{ data.name }}</div>

            {%- comment -%} 显示 identity_type-identity_type_note，如无 identity_type_note 则不显示- {%- endcomment -%}
            <span class="person-identity" data-identity-type-zh="{{ data.identity_type | escape }}" data-identity-type-en="{{ data.identity_type_en | default: data.identity_type | escape }}" data-identity-note-zh="{{ data.identity_type_note | default: '' | escape }}" data-identity-note-en="{{ data.identity_type_note_en | default: data.identity_type_note | escape }}">
              {% if data.identity_type_note and data.identity_type_note != "" %}
                {{ data.identity_type }}-{{ data.identity_type_note }}
              {% else %}
                {{ data.identity_type }}
              {% endif %}
            </span>
            {% if data.grade and data.grade != "" %}
              <div class="person-grade">{{ data.grade }}</div>
            {% endif %}
          </a>
          </li>
        {% endfor %}
      </ul>
    </div>

  {% endif %}
{% endfor %}


<section id="join-us" class="join-panel">
  <h2 data-i18n-key="page.join.title">招生与合作</h2>
  <p data-i18n-key="page.join.description">课题组长期欢迎具有软件工程、人工智能或相关背景的同学加入，支持本科科研训练、硕士与博士培养，也欢迎学术与产业合作交流。</p>
  <p data-i18n-key="page.join.contact">欢迎对课题组研究方向感兴趣的同学与同行联系。</p>
  <div class="join-panel__contact">
    <span><i class="fas fa-envelope" aria-hidden="true"></i><a href="mailto:zouyz@pku.edu.cn">zouyz@pku.edu.cn</a></span>
    <span><i class="fas fa-location-dot" aria-hidden="true"></i>北京大学理科一号楼</span>
  </div>
</section>
