import { Client, Options } from 'tmi.js';
import { config } from 'dotenv';
import { handleMessage } from './functions/handleMessage';
import { SPACE } from './constants';

config();

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

export default client;