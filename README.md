# gRank_analytics dashboard #

grank dashboard base on:
nginx,
Koa.js,
Redis,
Redux,
React

**for development mode : nginx conf**


```
#!nginx

server {
        listen 80;

        server_name localhost;

        keepalive_timeout    70;

        location ~* \.(js|jpg|png|css|scss|map|ico)$ {
             root /Users/barshimi/Structure/webpackConfig/;
             # access_log off;
             expires 48h;
             add_header Cache-Control public;
        }

        location /api/ {
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header Host $http_host;
             proxy_set_header X-NginX-Proxy true;
             proxy_pass http://127.0.0.1:3000;
             proxy_redirect off;
             proxy_http_version 1.1;
             proxy_set_header Connection "upgrade";

             proxy_redirect off;
             proxy_set_header   X-Forwarded-Proto $scheme;
        }

        location / {
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header Host $http_host;
             proxy_set_header X-NginX-Proxy true;
             proxy_pass http://127.0.0.1:8080;
             proxy_redirect off;
             proxy_http_version 1.1;
             proxy_set_header Connection "upgrade";

             proxy_redirect off;
             proxy_set_header   X-Forwarded-Proto $scheme;
        }
}
```