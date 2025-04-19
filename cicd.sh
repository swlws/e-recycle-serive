# /usr/bin/sh bash

pnpm tsc
zip -r dist.zip ./dist
scp ./dist.zip root@119.91.217.77:/root/dist.zip
rm -rf ./dist.zip
