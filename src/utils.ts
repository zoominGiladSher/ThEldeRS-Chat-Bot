import { IGNORE_REGEX, SPACE, TWITCH_USER_TAG } from './constants';

export function findEmoteMultiplier(args: string[]) {
  return args.find(arg => parseInt(arg));
}

export function removeEmoteMultiplier(message: string) {
  return message.split(SPACE).filter(part => !parseInt(part)).join(SPACE);
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

export function limitMultiplier(current: number, limit: number) {
  return (current > limit) ? limit : current;
}

export function stripCommandsFromMessage(args: string[]) {
  return args.filter(arg => !arg.match(IGNORE_REGEX));
}