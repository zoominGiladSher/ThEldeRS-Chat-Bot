import { hasArgs, limitMultiplier, repeatEmote } from '../utils';
import client from '../index';
import { DEFAULT_PYRAMID_BASE, PYRAMID_BASE_LIMIT } from '../constants';

export async function handlePyramid(channel: string, args?: string[]) {
  if (!hasArgs(args)) {
    return;
  }
  const emote = `${args![0]} `;
  let pyramidBase = parseInt(args![1]!) || DEFAULT_PYRAMID_BASE;
  pyramidBase = limitMultiplier(pyramidBase, PYRAMID_BASE_LIMIT);
  const pyramidWidth = pyramidBase * 2;
  for (let i = 1; i < pyramidWidth; i++) {
    if (i === 1) {
      await client.say(channel, emote);
    }
    else if (i <= pyramidBase) {
      await client.say(channel, repeatEmote(emote, i));
    }
    else {
      await client.say(channel, repeatEmote(emote, pyramidWidth - i));
    }
  }
}