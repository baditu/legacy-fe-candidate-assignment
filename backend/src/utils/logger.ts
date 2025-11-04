import pino from "pino";
import pinoHttp from "pino-http";
import pretty from "pino-pretty";
import { config } from "../config/env";

const stream = pretty({
  colorize: true,
  levelFirst: true,
});

const logger = pino(
  {
    level: config.NODE_ENV === "development" ? "debug" : "info",
  },
  stream
);

export const pinoHttpLogger = pinoHttp({
  logger,
  autoLogging: true,
});
