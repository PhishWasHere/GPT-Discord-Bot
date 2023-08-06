
  # GPT Discord Bot

  ## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Note](#note)
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


  ## Note
  The bot uses persistant data. This means all prompts to the bot will be saved to a database for 30days, and the last 10 prompts will be added to the initial prompt array to configure behaviour. 

  ## Questions
  If you have any questions, please contact me at miran.yasunori00@gmail.com. You can also visit my [GitHub profile](https://github.com/PhishWasHere/).
  
