
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

  ## Installation
  After cloning the repo, update the .env.example to have a Discord Token, OpenAI API key, and a local API key, then use "yarn dev" or "npm run dev".
  You can get a Openai API key from [here](https://platform.openai.com/account/api-keys), and you can make a Discord bot from [here](https://discord.com/developers/applications).

  ("API_KEY" makes sure only the server, or trusted users can make requests, and doesnt waste your openai token's. This API key can be anything)

  ## Usage
  The bot will respond to any comment/message that begins with !!.

  (currently you need to use !! even in direct messages, thats currently work in progress)

  ## Note
  This bot saves user intaractions for 24hours, to disable this, remove lines: 22, 23, 37-41,
  then delete the mongo folder (server>config>mongo) folder and the models folder (server>models)

  ## Questions
  If you have any questions, please contact me at miran.yasunori00@gmail.com. You can also visit my [GitHub profile](https://github.com/PhishWasHere/).
  
