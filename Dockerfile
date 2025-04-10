From nginx:1.15-alpine
COPY dist/vitepress /etc/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /etc/nginx/html