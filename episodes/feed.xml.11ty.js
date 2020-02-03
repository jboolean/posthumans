const Podcast = require('podcast');
const striptags = require('striptags');
const path = require('path');

class FeedRenderer {
  data() {
    return {
      permalink: 'feed.xml',
      layout: false,
      eleventyExcludeFromCollections: true,
    }
  }

  render(data) {    
    const feed = new Podcast({
      title: data.title,
      description: data.description,
      feedUrl: data.site.publicPath + data.page.url,
      siteUrl: data.site.publicPath,
      categories: data.categories,
      itunesCategory: data.itunesCategory,
      author: data.author,
      copyright: data.copyright,
      itunesAuthor: data.author,
      itunesSummary: data.description,
      itunesType: data.itunesType,
      itunesOwner: data.itunesOwner,
      itunesExplicit: data.itunesExplicit,
      webMaster: data.webMaster,
    });
    
    data.collections.episode.forEach((episode) => {
      feed.addItem({
        title: episode.data.title,
        description: episode.templateContent,
        itunesSummary: striptags(episode.templateContent),
        url: data.site.publicPath + episode.url,
        guid: episode.fileSlug,
        author: episode.author,
        itunesAuthor: episode.author,
        date: episode.date,
        enclosure: episode.data.enclosure ? {
          url: data.site.publicPath + episode.url + episode.data.enclosure,
          file: path.join(episode.inputPath, '../', episode.data.enclosure)
        } : null
      });
    });

    return feed.buildXml('\t');
  }
}

module.exports = FeedRenderer;