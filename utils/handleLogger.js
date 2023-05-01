const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
const { IncomingWebhook } = require("@slack/webhook");

const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp(),
    printf((info) => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.Stream({
      stream: {
        write: (message) => {
          webHook.send({ text: message });
        },
      },
    }),
  ],
});

module.exports = logger;
