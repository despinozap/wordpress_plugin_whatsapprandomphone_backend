const crypto = require("crypto");

const encrypt = (val) => {
  // Load KEY and IV from .env
  const KEY = process.env.CIPHER_KEY;
  const IV = process.env.CIPHER_IV;
  
  let cipher = crypto.createCipheriv("aes-256-cbc", KEY, IV);
  let encrypted = cipher.update(val, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrypt = (val) => {
  // Load KEY and IV from .env
  const KEY = process.env.CIPHER_KEY;
  const IV = process.env.CIPHER_IV;

  let decipher = crypto.createDecipheriv("aes-256-cbc", KEY, IV);
  let decrypted = decipher.update(val, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

module.exports = {
  encrypt, 
  decrypt
}