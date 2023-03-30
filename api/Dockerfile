FROM node:18.15 AS builder
COPY . /api
WORKDIR /api
RUN npm install

FROM node:18.15
COPY --from=builder /api ./
EXPOSE 3000
CMD ["npm", "run", "start"]