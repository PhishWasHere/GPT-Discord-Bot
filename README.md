
  # GPT Discord Bot

  ## Table of Contents

  - [License](#license)
  - [Installation](#installation)
  - [Usage](#usage)
  - [DataStorage](#data)
  - [Questions](#questions)

  ## License
  ![badge](https://img.shields.io/badge/license-MIT-brightgreen)
  <br />
  This application is covered by the MIT license.

  ## Description

  A Discord bot powered by GPT3.5 turbo.
  Currently prompted to be insulting and sarcastic, however, to make it a normal assistant all you need to do is change the initComment array in the gpt config folder (server>config>gpt).

  You will need node.js, and mongoDB to run this locally (nodemon is also a nice to have).

  ## Installation
  After cloning the repo, update the .env.example to have a Discord Token, OpenAI API key.
  You can get a Openai API key from [here](https://platform.openai.com/account/api-keys), and you can make a Discord bot from [here](https://discord.com/developers/applications).

  ## Usage
  To start the bot, run: 
```bash
npm run dev 
# or
yarn dev
```

  (if you dont have nodemon, you need to update the package.json from: "scripts": {"dev": "nodemon server/server.js", to: "dev": "node server/server.js",)

  The bot will respond to any direct message, or any message sent in the server that starts with !!.

  ## Data Storage
  When used in servers, the bot will store essential server-related information, including server ID and date of database creation persistently.
  On prompt, it logs additional details such as: user ID, username, global name, prompt message, prompt message ID, and the GPT return for 30 days.

  When the bot receives a direct message, the bot will store user ID, username, and global name to the database. The bot will also store the message, message id and GPT return for 30 days.

  This information allows the bot to maintain context and history related to the conversation.

  All propmts to GPT will follow this layout:
```bash
"username": "message"
```

  ## Questions
  If you have any questions, please contact me at miran.yasunori00@gmail.com. You can also visit my [GitHub profile](https://github.com/PhishWasHere/).
