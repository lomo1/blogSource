/**
 * Custom Hexo Helper Functions for Verse Theme
 */

// Reading time calculator
hexo.extend.helper.register('reading_time', function(content) {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]+>/g, ''); // Strip HTML tags

  // Count words (handle Chinese characters)
  const chineseChars = text.match(/[一-龥]/g) || [];
  const englishWords = text.match(/[a-zA-Z]+/g) || [];

  const totalWords = chineseChars.length + englishWords.length;
  const minutes = Math.ceil(totalWords / wordsPerMinute);

  const __ = this.__;
  return __('reading_time', minutes);
});

// Word count calculator
hexo.extend.helper.register('word_count', function(content) {
  const text = content.replace(/<[^>]+>/g, ''); // Strip HTML tags

  // Count words (handle Chinese characters)
  const chineseChars = text.match(/[一-龥]/g) || [];
  const englishWords = text.match(/[a-zA-Z]+/g) || [];

  return chineseChars.length + englishWords.length;
});

// Truncate text helper
hexo.extend.helper.register('truncate_html', function(content, length) {
  const text = content.replace(/<[^>]+>/g, '');
  if (text.length <= length) return content;
  return text.substring(0, length) + '...';
});

// Active menu helper
hexo.extend.helper.register('is_menu_active', function(menuPath) {
  const currentPath = this.path;

  if (menuPath === '/' && this.is_home()) {
    return true;
  }

  if (menuPath !== '/' && currentPath.indexOf(menuPath.replace('/', '')) === 0) {
    return true;
  }

  return false;
});

// Get excerpt helper
hexo.extend.helper.register('get_excerpt', function(post, length) {
  if (post.excerpt) {
    return post.excerpt;
  }

  const text = post.content.replace(/<[^>]+>/g, '');
  return text.substring(0, length || 200) + '...';
});

// Format number with commas
hexo.extend.helper.register('number_format', function(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

// Get first image from content
hexo.extend.helper.register('get_first_image', function(content) {
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : null;
});

// Check if post has TOC
hexo.extend.helper.register('has_toc', function(content) {
  const headings = content.match(/<h[1-6][^>]*>/gi);
  return headings && headings.length > 0;
});

// Relative time helper
hexo.extend.helper.register('relative_time', function(time) {
  const __ = this.__;
  const now = new Date();
  const past = new Date(time);
  const diff = Math.floor((now - past) / 1000); // seconds

  if (diff < 60) {
    return __('just_now');
  } else if (diff < 3600) {
    return __('minutes_ago', Math.floor(diff / 60));
  } else if (diff < 86400) {
    return __('hours_ago', Math.floor(diff / 3600));
  } else if (diff < 604800) {
    return __('days_ago', Math.floor(diff / 86400));
  } else if (diff < 2592000) {
    return __('weeks_ago', Math.floor(diff / 604800));
  } else {
    return __('months_ago', Math.floor(diff / 2592000));
  }
});

// Config helper - safely access theme config
hexo.extend.helper.register('theme_config', function(path, defaultValue) {
  const keys = path.split('.');
  let value = this.theme;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }

  return value !== undefined ? value : defaultValue;
});
