# Hosting URL Shortner (VPS)

Here we will be taking a look at how to host urlshortner on a VPS (Virtual Private Server) with NGINX.

## Prerequisites
> Note: I will not be going over the basics such as creating a server, logging in via ssh and the other basics. Feel free to research that on your own time!

1. Familiarize yourself with Linux since this tutorial will be for Ubuntu 20.4

2. Choose a good hosting provider. You can look up some for yourself but for this, I will be recommending Digital Ocean. You can use my referral code [here](https://m.do.co/c/0ca904582444) to earn $100 for free for 60 days
    - The $5/mo plan would be plenty for urlshortner v1.0.0

3. Have SSH setup on the VPS for maximum protection and not use root user. Please check out [this article](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04) if you're unsure how to create new users.