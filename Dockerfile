ARG NODE_VERSION=20.16.0

FROM node:${NODE_VERSION}-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

RUN npx prisma generate
#RUN npx prisma migrate dev --name 001_create_tables
#RUN npx prisma db seed

CMD [ "node", "app.js" ]

