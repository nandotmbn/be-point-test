import winston, { Logger } from "winston"
 
const LoggerInfo: Logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'log/info.log', level: 'info' }),
  ],
});

export default LoggerInfo;