FROM nginx:1.22.1

WORKDIR /usr/share/nginx/html

COPY out/ .