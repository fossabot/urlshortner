# Hosting URL Shortner (VPS)

Here we will be taking a look at how to host urlshortner on a VPS (Virtual Private Server) without NGINX.

## Prerequisites
> Note: I will not be going over the basics such as creating a server, logging in via ssh and the other basics. Feel free to research that on your own time!

1. Familiarize yourself with Linux since this tutorial will be for Ubuntu 20.4

2. Choose a good hosting provider. You can look up some for yourself but for this, I will be recommending Digital Ocean. You can use my referral code [here](https://m.do.co/c/0ca904582444) to earn $100 for free for 60 days
    - The $5/mo plan would be plenty for urlshortner v1.0.0

3. Have SSH setup on the VPS for maximum protection and not use root user. Please check out [this article](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04) if you're unsure how to create new users.

### Update Repositories List
```shell script
sudo apt update
```

### Installing Node.js v14
```shell script
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

sudo apt install nodejs

node --version
```
_Note: The last command shows you the version of Node.js you have installed and it is a good command to see if Node.js was installed successfully._

### Installing urlshortner

Here, I will be downloading URL Shortner into the `/bin` directory, but feel free to install it anywhere you like.

```shell script
cd /bin

git clone https://github.com/tommyshelby9121/urlshortner.git
```

### Installing Project Dependencies
```shell script
cd urlshortner

npm install

# Start bot
npm start

# Turn bot off
ctrl+C

# Compile SASS to CSS
npm run sass
```

### Setup PM2 process manager

Before doing this step, make sure you have read through the setup docs. This is very important. And one more thing, feel free to remove `|| 5000` from the `config.js` file. So all you have left is `port: process.env.PORT`.
```shell script
sudo npm i pm2 -g

pm2 start src/app.js

# To make sure bot comes online when reboot
pm2 startup ubuntu
```