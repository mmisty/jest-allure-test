import { CustomConsole, LogType, LogMessage } from '@jest/console';
import { dateStr } from "../src/date-utils";

function simpleFormatter(type: LogType, message: LogMessage): string {
  const TITLE_INDENT = '    ';
  const CONSOLE_INDENT = TITLE_INDENT + '  ';
  const date = dateStr();
  return message
    .split(/\n/)
    .map((line) => type + ' ' + date + CONSOLE_INDENT + line)
    .join('\n');
}

global.console = new CustomConsole(
  process.stdout,
  process.stderr,
  simpleFormatter,
);
