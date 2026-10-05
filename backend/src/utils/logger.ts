/* eslint-disable no-console */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const colors: Record<LogLevel, string> = {
  info: '\x1b[36m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
  debug: '\x1b[35m',
};

const reset = '\x1b[0m';
const isDev = process.env.NODE_ENV !== 'production';

function formatMessage(level: LogLevel, message: string): string {
  const timestamp = new Date().toISOString();
  const color = colors[level];
  return `${color}[${level.toUpperCase()}]${reset} ${timestamp} - ${message}`;
}

export const logger = {
  info: (message: string, ...meta: unknown[]) => {
    console.log(formatMessage('info', message), ...meta);
  },
  warn: (message: string, ...meta: unknown[]) => {
    console.warn(formatMessage('warn', message), ...meta);
  },
  error: (message: string, ...meta: unknown[]) => {
    console.error(formatMessage('error', message), ...meta);
  },
  debug: (message: string, ...meta: unknown[]) => {
    if (isDev) console.debug(formatMessage('debug', message), ...meta);
  },
};
