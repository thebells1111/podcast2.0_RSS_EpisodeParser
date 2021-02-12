const parseEpisodes = require("./parseRssEpisodes");

const feedUrl = "http://mp3s.nashownotes.com/pc20rss.xml";

parseEpisodes
  .getEpisodesFromURL(feedUrl)
  .then((episodes) => console.log(episodes));
