const fs = require('fs');

// Write to log file
const logRequest = (content) => {
  fs.appendFile(
    'log_request.txt', 
    `${content}\n`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
}

module.exports = {logRequest};