import { ChatUserstate } from 'tmi.js';

import { handleCheerup } from './functions/handleCheerup';
import { handleEmoteOnlyMessage } from './functions/handleEmoteOnlyMessage';
import { handleHelpCommand } from './functions/handleHelpCommand';
import { handlePyramid } from './functions/handlePyramid';

export enum ALLOWED_COMMANDS {
  KISS = 'kiss',
  CHEER_UP = 'cheerup',
  JAM = 'jam',
  HELP = 'help',
  PYRAMID = 'pyramid'
};

export enum TWITCH_EMOTES {
  KAPPA = 'Kappa'
}

export enum NIXXO_EMOTES {
  KISS = 'nixxoKiss',
  PET_NIXXO = 'PETTHENIXXO',
  CAT_JAM = 'catJAM'
};

export interface ICommandObject<T> {
  helpText: string;
  handler: T extends ALLOWED_COMMANDS.CHEER_UP
    ? typeof handleCheerup
    : T extends ALLOWED_COMMANDS.HELP
    ? typeof handleHelpCommand
    : T extends ALLOWED_COMMANDS.JAM | ALLOWED_COMMANDS.KISS
    ? typeof handleEmoteOnlyMessage
    : T extends ALLOWED_COMMANDS.PYRAMID
    ? typeof handlePyramid
    : Function;
  emote?: NIXXO_EMOTES | TWITCH_EMOTES;
}

export type FunctionHandler<T> = (
  channel: string,
  tags: ChatUserstate,
  message: string,
  self: boolean
) => T;

export type CommandsObject = {
  [command in ALLOWED_COMMANDS]: ICommandObject<command>;
};
