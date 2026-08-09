# Hexo Theme Verse

> A clean, modern and elegant theme for Hexo

[中文文档](README_CN.md)

## ✨ Features

- 🎨 **Modern Design** - Clean and elegant UI with card-based layout
- 🌓 **Dark Mode** - Built-in dark mode with auto detection
- 📱 **Responsive** - Mobile-first design, works on all devices
- ⚡ **Fast** - Optimized performance with minimal dependencies
- 🎯 **SEO Friendly** - Open Graph, structured data, sitemap support
- 🔍 **Search** - Local search support
- 💬 **Comments** - Multiple comment systems (Valine, Disqus, Utterances, etc.)
- 🏷️ **Rich Widgets** - Categories, tags, tag cloud, archives, recent posts
- 📊 **Analytics** - Google Analytics, Baidu Analytics support
- 🎨 **Customizable** - Easy to customize via config file
- 🌐 **i18n** - Multi-language support (English, 简体中文, 繁體中文)

## 📦 Installation

### Method 1: npm (Recommended)

```bash
cd your-hexo-site
npm install hexo-theme-verse
```

### Method 2: Git Clone

```bash
cd your-hexo-site
git clone https://github.com/yourusername/hexo-theme-verse.git themes/verse
```

## 🚀 Usage

### 1. Enable Theme

Edit your site's `_config.yml`:

```yaml
theme: verse
```

### 2. Configure Theme

Copy the theme's `_config.yml` to your site's root directory as `_config.verse.yml`:

```bash
cp themes/verse/_config.yml _config.verse.yml
```

Then edit `_config.verse.yml` to customize your theme.

### 3. Create Pages

#### About Page

```bash
hexo new page about
```

Edit `source/about/index.md` and add:

```yaml
---
title: About
layout: page
---

Your content here...
```

#### Categories Page

```bash
hexo new page categories
```

Edit `source/categories/index.md`:

```yaml
---
title: Categories
layout: category
---
```

#### Tags Page

```bash
hexo new page tags
```

Edit `source/tags/index.md`:

```yaml
---
title: Tags
layout: tag
---
```

### 4. Generate and Run

```bash
hexo clean
hexo generate
hexo server
```

Visit `http://localhost:4000`

## ⚙️ Configuration

### Menu Navigation

Customize your navigation menu in `_config.verse.yml`:

```yaml
menu:
  Home: /
  Archives: /archives
  Categories: /categories
  Tags: /tags
  About: /about
```

### Dark Mode

```yaml
dark_mode:
  enable: true
  default: auto  # auto, light, dark
```

### Sidebar

```yaml
sidebar:
  enable: true
  position: right  # left or right
  display: post    # always, post, page, hide

widgets:
  - category
  - tag
  - tagcloud
  - archive
  - recent_posts
```

### Comments

#### Valine

```yaml
comments:
  enable: true
  provider: valine

valine:
  appId: your-app-id
  appKey: your-app-key
  placeholder: "Leave a comment..."
```

#### Disqus

```yaml
comments:
  enable: true
  provider: disqus

disqus:
  shortname: your-disqus-shortname
```

#### Utterances

```yaml
comments:
  enable: true
  provider: utterances

utterances:
  repo: username/repo
  issue_term: pathname
  theme: github-light
```

### Analytics

```yaml
# Google Analytics
google_analytics: UA-XXXXX-X

# Baidu Analytics
baidu_analytics: your-key
```

### Social Links

```yaml
social:
  github: https://github.com/yourusername
  twitter: https://twitter.com/yourusername
  email: your@email.com
```

## 📝 Writing Posts

### Front-matter

```yaml
---
title: Post Title
date: 2024-01-01 12:00:00
updated: 2024-01-02 12:00:00
categories:
  - Category
tags:
  - Tag1
  - Tag2
---

Post content...
```

### Excerpt

Use `<!-- more -->` to create excerpt:

```markdown
This is the excerpt.

<!-- more -->

This is the full content.
```

## 🎨 Customization

### Custom CSS

Create `source/css/_custom.styl` in your theme directory:

```stylus
// Your custom styles
.my-custom-class
  color: red
```

### Custom JavaScript

Create `source/js/custom.js` in your theme directory:

```javascript
// Your custom scripts
console.log('Hello Verse!');
```

## 🌐 Multi-language

Supported languages:

- English (en)
- Simplified Chinese (zh-CN)
- Traditional Chinese (zh-TW)

Set language in your site's `_config.yml`:

```yaml
language: zh-CN
```

## 📄 License

[MIT License](LICENSE)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💖 Support

If you like this theme, please give it a ⭐️ on [GitHub](https://github.com/yourusername/hexo-theme-verse)!

## 📮 Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your@email.com

## 📚 Resources

- [Hexo Documentation](https://hexo.io/docs/)
- [Theme Documentation](https://github.com/yourusername/hexo-theme-verse/wiki)
- [Issue Tracker](https://github.com/yourusername/hexo-theme-verse/issues)
