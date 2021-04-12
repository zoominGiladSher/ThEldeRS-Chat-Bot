import { ChatUserstate } from 'tmi.js';
import { Request, Response } from 'express';

import { handleCheerup } from './functions/handleCheerup';
import { handleEmoteOnlyMessage } from './functions/handleEmoteOnlyMessage';
import { handleHelpCommand } from './functions/handleHelpCommand';
import { handlePyramid } from './functions/handlePyramid';
import { handleSpeedrunSearch } from './functions/handleSpeedrunSearch';
import { handleLeaderboard } from './functions/handleLeaderboard';

export enum ALLOWED_COMMANDS {
  KISS = 'kiss',
  CHEER_UP = 'cheerup',
  JAM = 'jam',
  HELP = 'help',
  PYRAMID = 'pyramid',
  EMOTE = 'emote',
  SEARCH_GAME = 'searchGame',
  LEADERBOARD = 'leaderboard',
  WORLD_RECORD = 'wr'
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
    : T extends ALLOWED_COMMANDS.JAM | ALLOWED_COMMANDS.KISS | ALLOWED_COMMANDS.EMOTE
    ? typeof handleEmoteOnlyMessage
    : T extends ALLOWED_COMMANDS.PYRAMID
    ? typeof handlePyramid
    : T extends ALLOWED_COMMANDS.SEARCH_GAME
    ? typeof handleSpeedrunSearch
    : T extends ALLOWED_COMMANDS.LEADERBOARD | ALLOWED_COMMANDS.WORLD_RECORD
    ? typeof handleLeaderboard
    : Function;
  emote?: NIXXO_EMOTES | TWITCH_EMOTES;
}

export type FunctionHandler<T> = (
  channel: string,
  tags: ChatUserstate,
  message: string,
  self: boolean
) => Promise<T>;

export type CommandsObject = {
  [command in ALLOWED_COMMANDS]: ICommandObject<command>;
};

export interface SearchResponse {
  category: string;
  label: string;
  url: string;
}

export type ILeaders = { runnerName: string, loadlessTime: string };
export type IAdditionalCategories = { name: string, hash: string };

export interface ILeaderboardResponse {
  additionalCategories: IAdditionalCategories[];
  leaders?: ILeaders[];
}

export type IGenericErrorResponse = { message: string };

export type ISearchRequest = Request<any, any, any, {term: string}>;
export type ISearchResponse = Response<SearchResponse[] | IGenericErrorResponse>;

export type IGetSpeedrunsRequest = Request<any, any, any, {game: string, category?: string}>;
export type IGetSpeedrunsResponse = Response<ILeaderboardResponse | IGenericErrorResponse>;