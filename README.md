
  # The Hostile Bot

  ## Table of Contents

  - [License](#license)
  - [Installation](#installation)
  - [Usage](#usage)
  - [DataUsage](#data)

  ## License
  ![badge](https://img.shields.io/badge/license-MIT-brightgreen)
  <br />
  This application is covered by the MIT license.

  ## Description

  This is a Discord bot powered by GPT3.

  If you would like to try the bot, you will need to install it locally as you cannot invite it to your server.
  
  (this bot is still in early development so keep in mind you might encounter bugs. This bot also has persistant data to maintain context in a conversation.)

  ## Installation
  
  If you would to run the bot locally, download the files from the [API](https://github.com/PhishWasHere/The-Hostile-Bot/tree/api) branch, then update the .env files.
  
  (you will need the following: npm, mongoDB, an OpenAI API key, and a Discord Bot token)

  ## Usage
  To start the bot, run: 
```bash
npm run build
# then
npm start  
```

  The bot will respond to any direct message, or any message sent in the server that starts with !!.

  ## Data Usage
  Hostile collects data to be used to maintain conversation context. By default, the past 7 prompts/responses will be sent to GPT to serve as context.
  Please dont send any personal/sensitive information.
  

  All propmts to GPT will follow this layout:
```bash
"username": "message"
```

