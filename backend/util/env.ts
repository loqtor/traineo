let env;

/**
 * This is set so the environment is either taken from where the app is running
 * or when working locally from a `.env` file.
 */
if (process.env.ENVIRONMENT) {
  env = process.env;
} else {
  const path = require("path");
  const pathToFile = path.resolve(__dirname, "../../.env");
  const dotenv = require("dotenv");

  env = dotenv.config({
    path: pathToFile,
  }).parsed;
}

env.isDevelopment = env.ENVIRONMENT === "development";

export default env as any;
