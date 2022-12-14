# Whatsapp random phone plugin for WordPress (backend)
Backend project for a WordPress plugin which requests a random whatsapp phone number (contact).

## Setup
01. Run: **docker-compose run --rm app npm install**
02. Create **.env** file (for development mode):
```
PORT=[SERVER_LISTENING_PORT]
MODE=[debug, production, test, etc.]
CIPHER_KEY=[PREDEFINED_CIPHER_KEY]
CIPHER_IV=[PREDEFINED_CIPHER_IV]
```
**Important**: **CIPHER_KEY** must be a hex value total length 32 and **CIPHER_IV** must be a hex value total length 16. They must be the same used for decryption by the consumer.

03. Load contacts information into the **contacts.json** file:
```
{
    "contacts": [
        {
            "name": "Contact 1",
            "phone": "1 234 567 8901",
            "chance": 33.33
        },
        {
            "name": "Contact 2",
            "phone": "2 345 678 9012",
            "chance": 33.33
        },
        {
            "name": "Contact 3",
            "phone": "3 456 789 0123",
            "chance": 33.33
        }
    ]
}
```
**Important**: For each contact, fields **name**, **phone** and **chance** are required. Field chance must be represented by a number from 0 to 100 (percent, float values accepted) and the sum of all contact's chance must be >= 0.99.
## Run
01. Run: **docker-compose up -d**
02. Run: **docker-compose exec app sh** (and keep executing commands in a new terminal)

**Important**: **[SERVER_LISTENING_PORT]** must be the same as PORT environment value.

## Deploy
Useful snippets for deployment.

### cPanel
01. Into the endpoint folder, add the following code to the **.htaccess** file:
```
<IfModule Litespeed>
    DirectoryIndex disabled
    RewriteEngine On
    
    # Send requests to local server through the app port
    RewriteRule ^$ http://127.0.0.1:[SERVER_LISTENING_PORT]/ [P,L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ http://127.0.0.1:[SERVER_LISTENING_PORT]/$1 [P, L]
</IfModule>
```

02. Create app
03. Click on button **Run NPM Install**
04. Click on button **Run JS Script** (**start** script)

**Important**: If a previous app is running, kill previous processes:
- Go to Terminal
- Run: **pkill -u [HOSTING_SERVICE_USERNAME]**
