FROM node:14

# create root application folder
WORKDIR /usr/src/app

# copy configs to /app folder
COPY package*.json ./

RUN npm install
# RUN npm ci --only=production
ADD . /usr/src/app

RUN npm run build

EXPOSE 5000

CMD [ "npm", "start" ]