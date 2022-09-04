const contactsRouter = require('express').Router();

// Cipher
const { encrypt } = require('../contollers/CipherRouter');

// Contacts data
const { contacts } = require('../contacts.json');

contactsRouter.get(
  '/random',
  (req, res) => {

    let index = null;

    if(validateChances())
    {
      /**
       * Chances are valid in file
       * Get a random number and calc index by chances
       */
      index = getIndexByChance();
    }
    else
    {
      /**
       * Chances are not valid in file
       * then get a random index in array
       */
      index = randomInRange(0, contacts.length);
    }

    if(index !== null)
    {
      /**
       * Generate WhatsApp URL using the contact's phone
       * number with "+" symbol and spaces cleaned.
       */
      const url = `https://web.whatsapp.com/send?phone=${contacts[index].phone.replace('+', '').replaceAll(' ', '')}`
      
      /**
       * Build the response object containing 
       * the following encrypted data:
       * 
       *  - Environment mode
       *  - Contact's name
       *  - WhatsApp URL for contact
       */ 
      const contactData = {
        mode: encrypt(process.env.MODE),
        name: encrypt(contacts[index].name),
        url: encrypt(url)
      };

      res.status(200)
        .json(contactData);
    }
    else
    {
      res.status(500)
        .json(
          { 
            error: 'Fail on getting contact'
          }
        );
    }
  }
);

// Validates chances in file
const validateChances = () => {
  try
  {
    const totalChance = contacts.reduce(
      (carry, contactData) => {
        return carry + contactData.chance;
      },
      0
    );

    return totalChance >= 0.99;
  }
  catch(error)
  {
    return false;
  }
}

// Get an array index by chance
const getIndexByChance = () => {

  let index = null;

  // Get a random number between 0 and 100
  const randomNumber = Math.floor(Math.random() * 100);

  let acc = 0;
  for(let i = 0; i < contacts.length; i++)
  {
    acc += contacts[i].chance;

    // If random number is in current range, index is found
    if(randomNumber <= acc)
    {
      index = i;

      break;
    }
  }

  return index;
}

// Get a random number in a given range
const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = contactsRouter;