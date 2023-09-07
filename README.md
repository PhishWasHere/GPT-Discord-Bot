
  # The Hostile Bot

  ## Table of Contents

  - [License](#license)
  - [Installation](#installation)
  - [Usage](#usage)
  - [DataStorage](#data)

  ## License
  ![badge](https://img.shields.io/badge/license-MIT-brightgreen)
  <br />
  This application is covered by the MIT license.

  ## Description

  This is a Discord bot powered by GPT3.5 turbo.

  If you would like to try the bot, you will need to install it locally as it is currently not available for public download.
  
  (this bot is still in early development so keep in mind you might encounter bugs. This bot also has persistant data to maintain context in a conversation. Please read the [privacy policy](https://hostile-beta-fd821710a9f8.herokuapp.com/policy/privacy) for more info)

  ## Installation
  
  If you would to run the bot locally, download the files from the [API](https://github.com/PhishWasHere/The-Hostile-Bot/tree/api) branch, then update the .env files.
  
  (you will need the following: npm, mongoDB, and OpenAI API key, and a Discord token)

  ## Usage
  To start the bot, run: 
```bash
npm run build
# then
npm start  
```

  The bot will respond to any direct message, or any message sent in the server that starts with !!.

  ## Data Storage
  Hostile collects data to be used to maintain conversation context.
  If you are concerned about that, read the [privacy policy](https://hostile-beta-fd821710a9f8.herokuapp.com/policy/privacy) for more info, or host the bot locally.

  All propmts to GPT will follow this layout:
```bash
"username": "message"
```

