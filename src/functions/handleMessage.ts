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

export const handleMessage: FunctionHandler<void> = (
  channel,
  tags,
  message,
  self
) => {
  if (!message.toLowerCase().startsWith(BOT_PREFIX) || message.length === 1) {
    return;
  }
  const messageContent = message.substr(BOT_PREFIX_LENGTH);
  const [command, ...args] = messageContent.split(SPACE);
  let emote = '';
  switch (command) {
    case ALLOWED_COMMANDS.KISS:
    case ALLOWED_COMMANDS.JAM:
      emote = `${COMMANDS[command].emote} `;
      client.say(channel, COMMANDS[command].handler(emote, args));
      break;
    case ALLOWED_COMMANDS.CHEER_UP:
      emote = `${COMMANDS[command].emote} `;
      client.say(channel, COMMANDS[command].handler(emote));
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
    default:
      break;
  }
};