import client from '../index';

import {
  ALLOWED_COMMANDS,
  FunctionHandler
} from '../types';

import {
  BOT_PREFIX,
  BOT_PREFIX_LENGTH,
  COMMANDS,
  NO_HELP_TEXT,
  SPACE
} from '../constants';
import { hasArgs, stripCommandsFromMessage } from '../utils';

export const handleMessage: FunctionHandler<void> = async (
  channel,
  tags,
  message,
  self
) => {
  if (!(tags.mod || self || tags.username === process.env.CHANNEL_HOST_NAME) || (!message.toLowerCase().startsWith(BOT_PREFIX) || message.length === 1)) {
    return;
  }
  const messageContent = message.substr(BOT_PREFIX_LENGTH);
  let [command, ...args] = messageContent.split(SPACE);
  args = stripCommandsFromMessage(args);
  let emote = '';
  let messageToSend: string | null | undefined = null;
  switch (command) {
    case ALLOWED_COMMANDS.KISS:
    case ALLOWED_COMMANDS.JAM:
      emote = `${COMMANDS[command].emote} `;
      messageToSend = COMMANDS[command].handler(emote, args);
      handleEmptyMessage(channel, messageToSend);
      break;
    case ALLOWED_COMMANDS.CHEER_UP:
      emote = `${COMMANDS[command].emote} `;
      messageToSend = COMMANDS[command].handler(emote);
      handleEmptyMessage(channel, messageToSend);
      break;
    case ALLOWED_COMMANDS.HELP:
      const helpText = COMMANDS[command].handler(args);
      helpText === NO_HELP_TEXT
        ? client.say(channel, `@${tags['display-name']} ${helpText}`)
        : client.say(channel, helpText);
      break;
    case ALLOWED_COMMANDS.PYRAMID:
      COMMANDS[command].handler(channel, args);
      break;
    case ALLOWED_COMMANDS.EMOTE:
      if (!hasArgs(args)) {
        break;
      }
      emote = `${args?.join(SPACE)} `;
      messageToSend = COMMANDS[command].handler(emote, args);
      handleEmptyMessage(channel, messageToSend);
      break;
    case ALLOWED_COMMANDS.SEARCH_GAME:
      messageToSend = await COMMANDS[command].handler(args);
      handleEmptyMessage(channel, messageToSend);
      break;
    case ALLOWED_COMMANDS.LEADERBOARD:
    case ALLOWED_COMMANDS.WORLD_RECORD:
      messageToSend = await COMMANDS[command].handler(args);
      handleEmptyMessage(channel, messageToSend);
      break;
    default:
      // const asyncIterable = {
      //   [Symbol.asyncIterator]() {
      //     return {
      //       i: 0,
      //       next() {
      //         if (this.i < 100) {
      //           this.i++;
      //           return Promise.resolve({ value: handleEmptyMessage(channel, '#teamCapitalism'), done: false });
      //         }
      
      //         return Promise.resolve({ value: null, done: true });
      //       }
      //     };
      //   }
      // };
      // for await (const _ of asyncIterable) {
      //   console.log(_);
      // }
      break;
  }
};

const handleEmptyMessage = async (channel: string, message?: string) => {
  if (!message) {
    return;
  }
  await client.say(channel, message);
  return `Channel: ${channel}, message: ${message}`;
}