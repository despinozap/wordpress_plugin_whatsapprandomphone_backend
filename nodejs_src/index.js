const express = require('express');
const cors = require('cors');
require('dotenv').config()
const contactsRouter = require('./contollers/ContactsRouter');
const routeNotFoundMiddleware = require('./middlewares/RouteNotFoundMiddleware');

const app = express();

// For CORS
app.use(cors());

// For body-parser
app.use(express.json());

// Contacts controller
app.use('/api/contacts', contactsRouter);

// Route not found handler
app.use(routeNotFoundMiddleware);

const PORT = 3001;

const server = app.listen(
  PORT,
  () => {
    console.log(`Server running on port ${PORT}`);
  }
);

module.exports = {
  app,
  server
};