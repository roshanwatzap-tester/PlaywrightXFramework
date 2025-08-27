require('dotenv').config(); // Load environment variables from .env

// Pick environment dynamically from ENV variable, default to 'test'
const env = process.env.ENV || 'test';

// Configuration per environment
const config = {
  test: {
    // Application credentials
    baseURL: process.env.TEST_BASE_URL,
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,

    // Database credentials
    db: {
      host: process.env.TEST_DB_HOST,
      port: process.env.TEST_DB_PORT,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASS,
      database: process.env.TEST_DB_NAME
    }
  },
  stage: {
    baseURL: process.env.STAGE_BASE_URL,
    username: process.env.STAGE_USERNAME,
    password: process.env.STAGE_PASSWORD,
    db: {
      host: process.env.STAGE_DB_HOST,
      port: process.env.STAGE_DB_PORT,
      user: process.env.STAGE_DB_USER,
      password: process.env.STAGE_DB_PASS,
      database: process.env.STAGE_DB_NAME
    }
  },
  preprod: {
    baseURL: process.env.PREPROD_BASE_URL,
    username: process.env.PREPROD_USERNAME,
    password: process.env.PREPROD_PASSWORD,
    db: {
      host: process.env.PREPROD_DB_HOST,
      port: process.env.PREPROD_DB_PORT,
      user: process.env.PREPROD_DB_USER,
      password: process.env.PREPROD_DB_PASS,
      database: process.env.PREPROD_DB_NAME
    }
  }
}[env]; // pick the current environment

module.exports = config;
