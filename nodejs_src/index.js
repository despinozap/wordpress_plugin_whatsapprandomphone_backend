const express = require('express');
const cors = require('cors');
const contactsRouter = require('./contollers/ContactsRouter');
const routeNotFoundMiddleware = require('./middlewares/RouteNotFoundMiddleware');

// Get NODE environment mode
const ENV_MODE = process.env.NODE_ENV || 'development';

// Load dotenv on development mode
if(ENV_MODE === 'development')
{
  require('dotenv').config();
}

// Validate required environment variables
const validateEnvVariables = () => {
  return process.env.PORT && process.env.MODE && process.env.CIPHER_KEY && process.env.CIPHER_IV;
}

let app = null;
let server = null;

/**
 * Run app only if all required
 * environment variables are present.
 */
if(validateEnvVariables())
{
  // Express
  app = express();

  // For CORS
  app.use(cors());

  // For body-parser
  app.use(express.json());

  // Contacts controller
  app.use('/api/contacts', contactsRouter);

  // Route not found handler
  app.use(routeNotFoundMiddleware);

  const PORT = process.env.PORT;
  server = app.listen(
    PORT,
    () => {
      console.log(`Server running on port ${PORT}`);
    }
  );
}
else
{
  throw new Error('Required ENV variables are not present.');
}

module.exports = {
  app,
  server
};