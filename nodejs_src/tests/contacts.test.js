const { server, app } = require('../index');
const supertest = require('supertest');

// Contacts data
const { contacts } = require('../contacts.json');

const api = supertest(app);

test(
  'A random contact can be gotten',
  async () => {
    const response = await api.get('/api/contacts/random')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    // Clean contact data
    const cleanedContactList = contacts.map(
      (contact) => {
        return {
          name: contact.name,
          phone: contact.phone
        };
      }
    );

    // Gotten contact is in contacts list
    expect(cleanedContactList).toContainEqual(response.body);
  }
);

afterAll(
  () => {
    server.close();
  }
);