// Update with your config settings.
require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    database: process.env.DB_SCHEMA_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  }
};
