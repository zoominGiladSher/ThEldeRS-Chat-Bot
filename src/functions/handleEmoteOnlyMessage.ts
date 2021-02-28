import { SPACE } from '../constants';
import {
  appendUserTagToMessage,
  findUserTaggingInMessage,
  hasArgs,
  hasEmoteMultiplier,
  removeUserTaggingFromMessage,
  repeatEmote
} from '../utils';

export function handleEmoteOnlyMessage(emote: string, args?: string[]) {
  let message: string = emote;
  if (hasArgs(args)) {
    const userTag = findUserTaggingInMessage(args!);
    if (userTag) {
      args = removeUserTaggingFromMessage(args!);
    }

    if (hasEmoteMultiplier(args!)) {
      const multiplier = args![0];
      message = repeatEmote(message, parseInt(multiplier!));
    }
    else {
      message = `${message} ${args!.join(SPACE)}`;
    }

    if (userTag) {
      message = appendUserTagToMessage(message, userTag);
    }
  }
  return message;
}