# Setting up URL Shortner
> Note: This software is created to be hosted by yourself. To make sure it doesn't break, make sure you keep the application process running. If you're  unsure how to host the bot, please check out [hosting url shortner]() for an in-depth tutorial.

## Prerequisites

1. Install [Node.js](https://nodejs.org) version 7.6.0 or higher
    - Anything below Node.js v7.6 is unsupported. I recommend using the current release available [here](https://nodejs.org)
    
2. Download the latest version of the software using `git clone`
    - If you do know what you're doing feel free to clone the `dev` branch but for most people make sure you download from the `master` branch, this is where the software is stable and with the least bugs
    
3. In the folder most likely titled `urlshortner`, go into the `config` folder and rename `config.example.js` to `config.js`
    - Again, if you don't know what you're doing please don't change anything other than as indicated
    
4. This application is made to be used with MongoDB Atlas, if you're unsure how to set it up or what it is, please [click here](https://www.mongodb.com/cloud/atlas)
    - You can click the `Start Free` button to create an account and get started

> Please read the newly created `config.js` file to understand what each and every option in the config file does for the application.