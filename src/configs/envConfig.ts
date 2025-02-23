import dotenv from "dotenv";
import { hostname } from "os";

dotenv.config({
	path: process.env.NODE_ENV === "production" ? ".env" : ".env.local"
});

// eslint-disable-next-line no-unused-vars
const parseBool = (str, valueIfEmpty = false) => {
	if (typeof str === "string" && str.length) {
		return str.toLowerCase() === "true";
	}
	return valueIfEmpty;
};

const {
  NODE_ENV,

  CONFIG_APP_PORT,
  SUBDOMAIN,
  CONFIG_DB_CONNECTION
} = process.env;

export const envConfig = {
  ENV: NODE_ENV,
  HOSTNAME: hostname(),

  APP_PORT: parseFloat(CONFIG_APP_PORT || "3000"),
  SUBDOMAIN,
  DB_CONNECTION: CONFIG_DB_CONNECTION || "mongodb://127.0.0.1:27017/"
}