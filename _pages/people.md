---
layout: archive
title: "课题组成员"
author_profile: false
permalink: /people/
---

{% include base_path %}

{% assign groups_order = "负责人,博士研究生,硕士研究生,本科生,已毕业学生" | split: "," %}
{% capture professor_types %}教授,研究员{% endcapture %}

{% for group_name in groups_order %}
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
    {% assign tuples = "" | split: "," %}
    {% for i in (0..group_keys.size) %}
      {% unless forloop.last %}
        {% assign key = group_keys[i] %}
        {% assign order = group_orders[i] %}
        {% assign tuple = order | append: "|" | append: key %}
        {% assign tuples = tuples | push: tuple %}
      {% endunless %}
    {% endfor %}
    {% assign sorted_tuples = tuples | sort %}

  <div class="person-role">
      <h2>{{ group_name }}</h2>
      <ul class="people-list">
        {% for tuple in sorted_tuples %}
          {% assign parts = tuple | split: "|" %}
          {% assign key = parts[1] %}
          {% assign data = site.data.authors[key] %}
          {% assign person_file = data.key | replace: " ", "-" %}
          {% assign first_char = data.name | slice: 0 %}

          <li class="person-list-item">
            <a href="{{ base_path }}/people/{{ person_file }}/">
              {% if data.avatar_small and data.avatar_small != "profile.png" and data.avatar_small != "" %}
                <img src="{{ base_path }}/avatars/{{ data.avatar_small }}" alt="{{ data.name }}" class="avatar">
              {% else %}
                <span class="avatar-fallback">{{ first_char }}</span>
              {% endif %}
            </a>
            <div>
              <p class="person-main">
                <a href="{{ base_path }}/people/{{ person_file }}/">{{ data.name }}</a>
              </p>
              <p class="person-meta">
                {% if data.identity_type_note and data.identity_type_note != "" %}
                  {{ data.identity_type }} · {{ data.identity_type_note }}
                {% else %}
                  {{ data.identity_type }}
                {% endif %}
                {% if data.grade and data.grade != "" %}
                  · {{ data.grade }}
                {% endif %}
              </p>
            </div>
          </li>
        {% endfor %}
      </ul>
    </div>

  {% endif %}
{% endfor %}
