import winston, { Logger } from "winston"
 
const AppLogger: Logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
  ],
});

export default AppLogger;