import {
  appendUserTagToMessage,
  findUserTaggingInMessage,
  hasArgs,
  findEmoteMultiplier,
  removeUserTaggingFromMessage,
  repeatEmote,
  limitMultiplier
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
      multiplier = parseInt(multiplier);
      multiplier = limitMultiplier(multiplier, 25);
      message = repeatEmote(message, multiplier);
    }

    if (userTag) {
      message = appendUserTagToMessage(message, userTag);
    }
  }
  return message;
}