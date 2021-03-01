import { hasArgs } from '../utils';
import { ALLOWED_COMMANDS } from '../types';
import { BOT_PREFIX, COMMANDS, NO_HELP_TEXT } from '../constants';

export function handleHelpCommand(args?: string[]) {
  let message: string;
  const allowedCommands = Object.values(ALLOWED_COMMANDS);
  if (!hasArgs(args)) {
    message = `A list of all commands (each starts with a '${BOT_PREFIX}' ): `;
    allowedCommands.forEach((value, index) => {
      const lastIndex = allowedCommands.length - 1;
      message += `${value}${index !== lastIndex ? ', ' : '.'}`
    });
  }
  else {
    const commandName = args![0];
    const commandHelp = COMMANDS[commandName as ALLOWED_COMMANDS]?.helpText || NO_HELP_TEXT;
    message = commandHelp ;
  }
  return message;
}