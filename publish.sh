# /usr/bin/sh bash

rm -rf /root/swlws/platform-be/dist*
unzip /root/dist.zip -d /root/swlws/platform-be
rm -rf dist.zip
pm2 restart all
pm2 list
