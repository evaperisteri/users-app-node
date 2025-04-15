
//FIRST EXAMPLE
// const winston = require('winston');
// const logger = winston.createLogger(
//   {
//     format: winston.format.json(),
//     transports: [
//       new winston.transports.Console()
//     ]
//   }
// )

//SECOND EXAMPLE
// const {format, createLogger, transports} = require('winston');
// const {combine, timestamp, label, printf} = format
// const CATEGORY = "Products app logs"
// const customFormat = printf(({level, message, label, timestamp}) =>{
//   return `${timestamp}[${label}: ${level}, ${message}]`
// })
// const logger = createLogger({
//   // level: "warn",
//   format: combine(
//     label({label: CATEGORY}),
//     timestamp(),
//     customFormat
//   ),
//   transports: [new transports.Console()]
// })

// for jest test
//require('dotenv').config();

//THIRD EXAMPLE
require('winston-daily-rotate-file');
require('winston-mongodb')
const {format, createLogger, transports} = require('winston');
const {combine, timestamp, label, printf, prettyPrint} = format;
const CATEGORY = "Products app logs";
const fileRotateTransport = new transports.DailyRotateFile({
  filename: "./logs/rotate-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "14d"
})

const logger = createLogger({
  format: combine(
    label({label: "MY LABEL FOR PRODUCTS APP"}),
    timestamp({format:"DD-MM-YYYY HH:mm:ss"}),
    format.json()
    // prettyPrint()
  ),
  transports: [
    new transports.Console(),
    fileRotateTransport,
    new transports.File(
      {
        filename:'logs/example.log'
      }
    ),
    new transports.File(
      {
        level: "warn",
        filename: 'logs/warn.log'
      }
    ),
    new transports.File(
      {
        level: "info",
        filename: 'logs/info.log'
      }
    ),
    new transports.MongoDB({
      level: "warn",
      db: process.env.MONGODB_URI,
      collection: 'server_logs',
      format: format.combine(
          format.timestamp(),
          format.json()
      )
    })
  ]
})

module.exports = logger;