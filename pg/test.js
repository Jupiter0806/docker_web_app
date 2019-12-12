const { createLogger, format, transports, addColors } = require('winston');

const myFormat = format.printf(({ level, message, label, timestamp, stack }) => {
  return `${timestamp} [${label}] ${level}: ${message}
  ${stack}`;
});

const logger = createLogger({
  format: format.combine(
    format.label({ label: 'right meow!' }),
    format.colorize(),
    format.timestamp(),
    format.errors({ stack: true }),
    myFormat,
  ),
  transports: [ new transports.Console() ]
});

addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green'
});

logger.info(new Error('error'))