const express = require('express');
const newsRouter = express.Router()



let Parser = require("rss-parser");
let parser = new Parser();


newsRouter.get("/api", async (req, res) => {
  let feed = await parser.parseURL(process.env.NEWS_URL);
  res.send(feed.items);
});

module.exports = newsRouter;