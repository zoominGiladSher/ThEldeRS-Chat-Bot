import { Client, Options } from 'tmi.js';
import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

import { handleMessage } from './functions/handleMessage';
import { PROXY_LEADERBOARD_ROUTE, PROXY_SEARCH_ROUTE, SPACE } from './constants';
import { searchSpeedrun } from './middlewares/searchSpeedrun';
import { getSpeedrunsCategories } from './middlewares/getSpeedrunsCategories';

config();
const app = express();
app.use(cors());
const port = process.env.PORT!;

app.get(`/${PROXY_SEARCH_ROUTE}`, searchSpeedrun);
app.get(`/${PROXY_LEADERBOARD_ROUTE}`, getSpeedrunsCategories);

const options: Options = {
  channels: ['nixxo'],
  connection: { reconnect: true },
  identity: {
    username: process.env.USER_NAME,
    password: `oauth:${process.env.USER_SECRET}`
  }
};
const client = new Client(options);

(async () => {
  await client.connect();
  console.log(`Connected to channels: ${options.channels?.join(SPACE)}`);
  client.on('message', handleMessage);
})();

app.listen(port, () => console.log(`Proxy running on http://localhost:${port}`));

export default client;