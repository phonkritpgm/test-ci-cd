FROM node:18-alpine AS builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#RUN mkdir app
#WORKDIR /app

#COPY ./secuill_monitor_client/package*.json ./app
COPY package*.json /usr/src/app

RUN ls -la
RUN npm install
CMD ["npm","start"]

RUN npm update

COPY ./ /usr/src/app

RUN npm run build

FROM amd64/nginx:alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
