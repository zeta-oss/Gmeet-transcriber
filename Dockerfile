FROM alpine:3.17
ENV NODE_VERSION 18.9.0
WORKDIR /app
COPY ./ /app
RUN apk update && apk add  nodejs npm
RUN npm update && npm cache clear -f && npm install 
EXPOSE 8080 
CMD ["npm","run","dev"]