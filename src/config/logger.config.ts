import winston from "winston";
import { getCorrelationId } from "../utils/helpers/request.helpers";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'MM-DD-YYYY HH:mm:ss'}),
    winston.format.printf(({timestamp, level, message, ...data}) => {
      return JSON.stringify({
        level,
        message,
        timestamp,
        correlationId: getCorrelationId(),
        data
      });
    })
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'logs/%DATE%-app.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export default logger;
