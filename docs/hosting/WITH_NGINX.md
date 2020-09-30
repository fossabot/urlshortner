# Hosting URL Shortner (VPS)

Here we will be taking a look at how to host urlshortner on a VPS (Virtual Private Server) without NGINX.

> Here, we will be referring to Digital Ocean, however the steps should be similar with other providers, except for the `add a domain` part. Check with your provider for more information.

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

> Note: You should now be able to access yoour app using your IP and port. Now we want to setup a firewall blocking that port and setup NGINX as a reverse proxy so we can access it directly using port 80 (http)

### Setup UFW Firewall
```shell script
sudo ufw enable

# Checks if firewall is enabled
sudo ufw status

sudo ufw allow ssh

sudo ufw allow http

sudo ufw allow https
```

### Install & configure NGINX
```shell script
sudo apt install nginx

sudo nano /etc/nginx/sites-available/default
```
Add the following to the location part of the server block

```shell script
server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000; #whatever port your app runs on, 5000 is default
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
Replace `yourdomain.com` with the domain name you added as a base url in `config.js` without `http` or `https`. If you want to have `www` replace `www.yourdomain.com;` with the same domain name you provided for first part, just add `www` infront of it. However, if you don't want `www` feel free to omit it.

```shell script
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo service nginx restart
```

### Add a domain
If you don't already have a domain added to Digital Ocean, [read this article](https://www.digitalocean.com/docs/networking/dns/how-to/add-domains/) on how to. Make sure after you added a domain that the nameservers of the domain are pointing towards Digital Ocean's nameservers. Check with your domain registrar on how to add custom nameservers.

### Install SSL Certificate with LetsEncrypt
```shell script
sudo add-apt-repository ppa:certbot/certbot

sudo apt-get update

sudo apt-get install python-certbot-nginx

sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Every SSL certificate generated is valid for 90 days. To test the renewal process run this;
certbot renew --dry-run
```
This goes without saying if you didn't specify a `www` domain in [this step]() make sure to remove it from the command. So it will be `
sudo certbot --nginx -d yourdomain.com`

Now visit [https://yourdomain.com](https://yourdomain.com) to view the application with SSL enabled!