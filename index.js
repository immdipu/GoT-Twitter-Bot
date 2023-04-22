const { TwitterApi } = require("twitter-api-v2");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

const bearer = new TwitterApi(process.env.BEARER_TOKEN);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

const getQuotes = async () => {
  try {
    const res = await axios.get(
      "https://api.gameofthronesquotes.xyz/v1/random"
    );
    const result = res.data;
    let tweet = `${result.sentence}   
                                         -${result.character.name}`;
    return tweet;
  } catch (error) {
    console.log(error);
  }
};

const tweet = async () => {
  try {
    let text = await getQuotes();
    await twitterClient.v2.tweet(text);
  } catch (e) {
    console.log(e);
  }
};

tweet();
