FROM node:18.15 as builder
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:alpine
EXPOSE 80
COPY --from=builder /app/dist/client /usr/share/nginx/html
