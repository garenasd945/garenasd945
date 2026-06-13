# 维护指南 / Maintenance Guide

这个主页大部分内容都可以**只改文本文件**完成，不需要写 HTML/CSS。
Most updates only require editing a text file — no HTML/CSS needed.

## 1. 增删论文 / Publications
编辑 **`_data/publications.yml`**。复制一段，改字段即可（`venue` 徽标、`title`
标题、`url` 链接、`title_zh` 中文标题、`authors` 作者、`highlights` 要点）。
卡片由 `_includes/pub_list.html` 自动渲染，**不要手写 `<div class="paper-box">`**。

Edit **`_data/publications.yml`**: copy a block, edit the fields. Cards are
rendered automatically by `_includes/pub_list.html`.

## 2. 更新新闻 / News
编辑 `_pages/includes/news.md`（普通 Markdown 列表）。

## 3. 个人简介 / Intro
编辑 `_pages/includes/intro.md`。

## 4. 团队成员 / Teammates
编辑 `_pages/includes/Student.md`。

## 5. 外观与主题 / Look & feel
所有「fancy」样式集中在两个独立文件里，和主题构建解耦，改起来安全：
All visual enhancements live in two decoupled files:

- **`assets/css/extra.css`** — 配色、圆角、阴影、卡片、暗色模式
  (colours, cards, shadows, **dark mode**). 顶部的 `:root` 变量可一键换色。
- **`assets/js/extra.js`** — 暗色切换、阅读进度条、回到顶部、滚动浮现、导航高亮
  (theme toggle, reading-progress bar, back-to-top, scroll-reveal, active nav).

想换主色，只改 `extra.css` 里的 `--accent` / `--accent-2` 两个变量即可。
To re-brand, change `--accent` / `--accent-2` at the top of `extra.css`.

## 6. 本地预览 / Local preview
```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000
```
> 若使用 Ruby 3.2+ 遇到 `tainted?` / `logger` 报错，请将 Ruby 切到 3.1，
> 或升级 `Gemfile` 中的 Jekyll。GitHub Pages 线上构建不受影响。
> On Ruby 3.2+ you may hit `tainted?`/`logger` errors from the old Jekyll
> pin; use Ruby 3.1 locally or bump Jekyll. GitHub Pages builds are fine.
