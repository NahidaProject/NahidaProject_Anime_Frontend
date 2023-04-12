FROM node:18

WORKDIR /app

COPY . /app
RUN npm i -g pnpm
RUN pnpm install

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]