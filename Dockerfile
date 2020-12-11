FROM node:13-alpine as build

RUN ls

WORKDIR /app

RUN ls

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app

RUN npm install -g @angular/cli
RUN npm install
RUN ng build --output-path=dist --prod

FROM nginx:1.17-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]