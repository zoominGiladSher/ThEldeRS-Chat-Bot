import { SPACE, TWITCH_USER_TAG } from './constants';

export function hasEmoteMultiplier(args: string[]) {
  return typeof parseInt(args[0]!) === 'number';
}

export function hasArgs(args?: string[]) {
  return args?.length !== 0;
}

export function repeatEmote(emote: string, multiplier: number) {
  return emote.repeat(multiplier);
}

export function findUserTaggingInMessage(args: string[]) {
  return args.find(arg => arg.startsWith(TWITCH_USER_TAG));
}

export function removeUserTaggingFromMessage(args: string[]) {
  return args.filter(arg => !arg.startsWith(TWITCH_USER_TAG));
}

export function appendUserTagToMessage(message: string, userTag: string) {
  return message + SPACE + userTag;
}