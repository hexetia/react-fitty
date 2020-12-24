FROM node:12-buster-slim

RUN mkdir -p /usr/share/man/man1

# chrome deps to run on docker
RUN apt-get update && apt-get install --no-install-recommends -y openjdk-11-jre-headless xvfb gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
        libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 \
         libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
         libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
         libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
         && apt-get clean

WORKDIR /app

RUN yarn config set registry https://registry.npmjs.org


CMD ["sh"]
