const util = require('util');

const now = new Date();
const isLive = p => p.date <= now && !p.data.draft;

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('inspect', (value) => {
    return util.inspect(value);
  });

  eleventyConfig.setTemplateFormats([
    'html',
    '11ty.js',
    'njk',
    'md',
    'm4a',
    'aac',
    'mp3',
    'jpg'
  ]);

  eleventyConfig.addCollection('episode', (collection) => {
    const episodes = collection.getFilteredByTag('episode');
    return episodes.filter(isLive);
  });

  // eleventyConfig.addPassthroughCopy("**/*.{aac,mp3}");

  return {
    dir: {
      layouts: '_layouts'
    }
  }
};
