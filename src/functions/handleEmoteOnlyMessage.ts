import { EMOTE_LIMIT } from '../constants';
import {
  appendUserTagToMessage,
  findUserTaggingInMessage,
  hasArgs,
  findEmoteMultiplier,
  removeUserTaggingFromMessage,
  repeatEmote,
  limitMultiplier,
  removeEmoteMultiplier
} from '../utils';

export function handleEmoteOnlyMessage(emote: string, args?: string[]) {
  let message: string = emote;
  if (hasArgs(args)) {
    const userTag = findUserTaggingInMessage(args!);
    if (userTag) {
      args = removeUserTaggingFromMessage(args!);
    }

    let multiplier: string | number | undefined = findEmoteMultiplier(args!);
    if (multiplier) {
      multiplier = Math.abs(parseInt(multiplier));
      multiplier = limitMultiplier(multiplier, EMOTE_LIMIT);
      message = repeatEmote(message, multiplier);
      message = removeEmoteMultiplier(message);
    }

    if (userTag) {
      message = appendUserTagToMessage(message, userTag);
    }
  }
  return message;
}