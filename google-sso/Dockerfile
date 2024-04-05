FROM node:16 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -force

COPY . ./

RUN npm run build -force


FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
