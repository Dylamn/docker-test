# Learning Docker

This repository simply contains the files I used to learn more about **Docker** and especially `docker-compose`.

## About the stack

The stack used for the demo is a MERN stack (`MongoDB`, `Express`, `React` & `Nginx`).

## SSL

This project relies on **[Certbot](https://certbot.eff.org/)** for the SSL certificates. If you planned to use it to, you'll have to rename the directory (in `reverse-proxy/conf/prod.conf`, line 9 to 12) where the certificates will be located.
