---
layout: archive
title: "课题组成员"
author_profile: false
permalink: /people/
---

{% include base_path %}

<style>
.people-section {
  margin-bottom: 50px;
}

.people-section h2 {
  font-size: 1.5rem;
  color: #333;
  padding-bottom: 10px;
  margin-bottom: 25px;
}

.people-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 25px;
  padding: 0;
  list-style: none;
}

.person-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 20px 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

.person-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
}

.person-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 3px solid #e8e8e8;
  background-color: #f0f0f0;
}

.person-avatar-placeholder {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 3px solid #e8e8e8;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.person-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.person-identity {
  display: inline-block;
  padding: 4px 12px;
  background: #f0f7ff;
  color: #4a90d9;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-bottom: 4px;
}

.person-grade {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
  margin-bottom: 4px;
}

.section-divider {
  margin: 15px 0;
  border: 0;
  border-top: 1px dashed #e0e0e0;
}
</style>

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
      {% if data.identity_type == "博士" or data.identity_type == "硕士" %}
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

  <div class="people-section">
      <h2>{{ group_name }}</h2>
      <ul class="people-grid">
        {% for tuple in sorted_tuples %}
          {% assign parts = tuple | split: "|" %}
          {% assign key = parts[1] %}
          {% assign data = site.data.authors[key] %}
          {% assign person_file = data.key | replace: " ", "-" %}
          {% assign first_char = data.name | slice: 0 %}
          {% assign person_path = "/people/" | append: person_file | append: "/" %}
          {% assign person_href = person_path | prepend: base_path %}
          {% if data.external_url and data.external_url != "" %}
            {% assign person_href = data.external_url %}
          {% endif %}

          <a href="{{ person_href | escape }}" class="person-card"{% if data.external_url and data.external_url != "" %} rel="external"{% endif %}>
            {%- comment -%} 使用 avatar 字段，若为空或 profile.png 则显示名字首字 {%- endcomment -%}
            {% if data.avatar_small and data.avatar_small != "profile.png" and data.avatar_small != "" %}
              <img src="{{ base_path }}/avatars/{{ data.avatar_small }}" alt="{{ data.name }}" class="person-avatar">
            {% else %}
              <div class="person-avatar-placeholder">{{ first_char }}</div>
            {% endif %}

            <div class="person-name">{{ data.name }}</div>

            {%- comment -%} 显示 identity_type-identity_type_note，如无 identity_type_note 则不显示- {%- endcomment -%}
            <span class="person-identity">
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
        {% endfor %}
      </ul>
    </div>

  {% endif %}
{% endfor %}


## 招生与合作

课题组长期欢迎具有软件工程、人工智能或相关背景的同学加入，支持本科科研训练、硕士与博士培养，也欢迎学术与产业合作交流。

## 联系方式

- 邮箱：zouyz@pku.edu.cn
- 地址：北京大学理科一号楼

欢迎对课题组研究方向感兴趣的同学与同行联系交流。
