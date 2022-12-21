const express = require('express');
const newsRouter = express.Router()

let Parser = require("rss-parser");
let parser = new Parser();

newsRouter.get("/", (req, res) => {
 res.send("hey")
})

newsRouter.get("/api", async (req, res) => {
  let feed = await parser.parseURL(
    `https://www.formula1.com/${process.env.NEWS}.xml`
  );
  res.send(feed.items);
});



module.exports = newsRouter;