const util = require('util');

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
    'mp3'
  ]);

  // eleventyConfig.addPassthroughCopy("**/*.{aac,mp3}");

  return {
    dir: {
      layouts: '_layouts'
    }
  }
};
