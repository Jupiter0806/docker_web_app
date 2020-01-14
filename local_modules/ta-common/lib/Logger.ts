import * as winston from 'winston';

export { Logger } from 'winston';

export function getLogger(label: string): winston.Logger {
  return winston.createLogger({
    format: winston.format.combine(
      winston.format.label({ label }),
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.printf(({ level, message, label, timestamp, stack }) => 
        stack 
          ? `${timestamp} [${label}] ${level}: ${message}
              ${stack || ''}`
          : `${timestamp} [${label}] ${level}: ${message}`
      )
    ),
    transports: [ new winston.transports.Console() ]
  });
}