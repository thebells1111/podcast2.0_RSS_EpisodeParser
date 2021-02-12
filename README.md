# podcast2.0_RSS_EpisodeParser

Parse an RSS Feed and return an array of objects similar to the the Podcasting Index Episode API

##Usage

```js
const parseEpisodes = require("./parseRssEpisodes");

const feedUrl = "http://mp3s.nashownotes.com/pc20rss.xml";

parseEpisodes
  .getEpisodesFromURL(feedUrl)
  .then((episodes) => console.log(episodes));
```
