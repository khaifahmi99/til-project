import pgp from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.DB_CONN_STRING;
if (!URI) {
  throw Error('Empty DB_CONN_STRING passed in .env file');
}

const pg = pgp({});
export const Client = pg(URI);