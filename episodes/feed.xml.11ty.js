const Podcast = require('podcast');
const striptags = require('striptags');
const path = require('path');
const axios = require('axios');

class FeedRenderer {
  data() {
    return {
      permalink: 'feed.xml',
      layout: false,
      eleventyExcludeFromCollections: true,
    }
  }

  async render(data) {   
    const publicPath = data.site.publicPath;

    const feed = new Podcast({
      title: data.title,
      description: data.description,
      language: data.language,
      feedUrl: data.site.publicPath + data.page.url,
      siteUrl: data.site.publicPath,
      imageUrl: publicPath + '/artwork.jpg',
      categories: data.categories,
      itunesCategory: data.itunesCategory,
      author: data.author,
      copyright: data.copyright,
      itunesAuthor: data.author,
      itunesSummary: data.description,
      itunesType: data.itunesType,
      itunesOwner: data.itunesOwner,
      itunesExplicit: data.itunesExplicit,
      itunesImage: publicPath + '/artwork.jpg',
      webMaster: data.webMaster,
    });

    for (const episode of data.collections.episode) {
      const url = data.site.filesPath + '/' + episode.data.enclosure.name;
      const headResp = await axios.head(url);
      const {
        'content-type': contentType,
        'content-length': contentLength
      } = headResp.headers;

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
          url,
          size: contentLength,
          type: contentType
        } : null
      });
    }

    return feed.buildXml('\t');
  }
}

module.exports = FeedRenderer;