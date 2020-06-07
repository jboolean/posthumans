const now = new Date();

module.exports = {
  eleventyComputed: {
    isLive: p => p.date <= now && !p.draft && p.enclosure
  }
}