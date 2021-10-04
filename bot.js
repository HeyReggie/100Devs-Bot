require("dotenv").config();
const Twitter = require("twitter-v2");

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_KEY_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const retweet = async () => {
  const params = {
    query: "#100Devs -is:retweet -is:quote",
  };

  const {
    data: tweets,
    meta,
    errors,
  } = await client.get("tweets/search/recent", params);

  if (errors) {
    console.log("Errors:", errors);
    return;
  }
  const retweetId = tweets[Math.floor(Math.random() * 2)].id;

  const response = await client.post(`users/${process.env.USER_ID}/retweets`, {
    tweet_id: retweetId,
  });

  console.log(response);
  console.log(meta);
};

retweet();

setInterval(retweet, 60000 * 5);
