import * as Sentry from "@sentry/nextjs";

const { logger: sentryLogger } = Sentry;

const formatContext = (context?: Record<string, unknown>) => (context ? ` | Context: ${JSON.stringify(context)}` : "");

const logger = {
  debug: (message: string, context?: Record<string, unknown>) => {
    console.debug(`Debug: ${message}${formatContext(context)}`);
    sentryLogger.debug(message, context);
  },
  error: (message: string, context?: Record<string, unknown>) => {
    console.error(`Error: ${message}${formatContext(context)}`);
    sentryLogger.error(message, context);
  },
  info: (message: string, context?: Record<string, unknown>) => {
    console.info(`Info: ${message}${formatContext(context)}`);
    sentryLogger.info(message, context);
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    console.warn(`Warn: ${message}${formatContext(context)}`);
    sentryLogger.warn(message, context);
  },
};

export default logger;

