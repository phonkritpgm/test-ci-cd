FROM node:18-alpine AS builder

WORKDIR /app

#COPY ./secuill_monitor_client/package*.json ./app
ADD package*.json ./

RUN ls -la
RUN npm install
CMD ["npm","start"]

COPY . .

RUN npm run build

FROM amd64/nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
