const env = process.env;

const development = {
    "username": env.POSTGRES_USERNAME,
    "password": env.POSTGRES_PASSWORD,
    "database": env.POSTGRES_DATABASE,
    "host": "localhost",
    "dialect": "postgres",
    "storage": "./session.postgres",
}

const test = {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }

const production = {
  "use_env_variable": "DATABASE_URL",
  "dialect": "postgres",
  "storage": "./session.postgres",
  "dialectOptions": {
    "ssl": {
      "require": true,
      "rejectUnauthorized": false,
    }
  }
}

module.exports = {development, test, production}