#FROM node:18
#WORKDIR /app
#COPY . .
#RUN npm install -g pnpm
#RUN pnpm install
#EXPOSE 5173
#CMD ["pnpm", "dev", "--host"]

#FROM node:18-alpine
#WORKDIR /app
#COPY . .
#RUN npm install -g pnpm serve
#RUN pnpm install
#RUN pnpm run build
#EXPOSE 3000
#CMD ["serve", "-s", "dist"]

FROM nginx:alpine
COPY dist /usr/share/nginx/html/
COPY data /usr/share/nginx/html/data
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]