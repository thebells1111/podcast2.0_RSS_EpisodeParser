var parser = require('fast-xml-parser');
const fetch = require('node-fetch');

const getEpisodesFromURL = (exports.getEpisodesFromURL = async function (
  feedUrl
) {
  try {
    const res = await fetch(feedUrl);
    const feed = await res.text();
    if (!feed.includes('<rss')) reject(new Error('Not XML'));

    var parserOptions = {
      ignoreAttributes: false,
      attributeNamePrefix: '',
      trimValues: true,
      allowBooleanAttributes: true,
    };

    let rss = parser.parse(feed, parserOptions).rss;

    let channel = rss.channel;
    // console.log(JSON.stringify(json.item[0]));

    episodes = [];

    for (const item of channel.item) {
      if (typeof item.enclosure != 'undefined') {
        let episode = {};
        episode.chaptersUrl =
          (item['podcast:chapters'] && item['podcast:chapters'].url) || null;
        episode.dateCrawled = null;
        episode.datePublished = new Date(item.pubDate).getTime() / 1000;
        episode.datePublishedPretty = prettyFormatDate(item.pubDate);
        episode.description = item.description || '';
        episode.duration = item['itunes:duration'] || 0;
        episode.enclosureLength = item.enclosure.length || 0;
        episode.enclosureType = item.enclosure.type || null;
        episode.enclosureUrl = item.enclosure.url || null;
        episode.episode = item['podcast:episode'] || null;
        episode.episodeType = item['itunes:episodeType'] || null;
        episode.explicit = item['itunes:explicit'] || '';
        episode.feedId = null;
        episode.feedImage =
          (item['itunes:image'] && item['itunes:image'].href) || null;
        episode.feedItunesId = item['itunes:id'] || null;
        episode.feedLanguage = item.language || null;
        episode.guid = (item.guid && item.guid[`#text`]) || null;
        episode.id = item['podcast:id'] || null;
        episode.image = episode.feedImage;
        episode.link = item.link || null;
        episode.location = item['podcast:location'] || null;
        episode.person = item['podcast:person'] || null;
        episode.season = item['podcast:season'] || 0;
        episode.title = item.title;
        episode.transcriptUrl =
          (item['podcast:transcript'] && item['podcast:transcript'].url) ||
          null;

        episodes.push(episode);
      }
    }

    return episodes;
  } catch (err) {
    throw err;
  }
});

function prettyFormatDate(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let d = new Date(date);
  const year = d.getFullYear();
  const day = d.getDate();
  const monthName = months[d.getMonth()];
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${monthName} ${day < 10 ? `0${day}` : day}, ${year} ${time}`;
}
