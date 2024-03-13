# agent-web
> [https://github.com/whyiyhw/chatgpt-wechat](https://github.com/whyiyhw/chatgpt-wechat) 项目的前端部分

## 可用脚本

### `npm dev`
- 开发环境
- 打开 [http://localhost:5173](http://localhost:5173) 去预览

### `npm run build`
- 正式环境
- 修改 .env 文件中的配置, 改为对应项目的IP
- Builds the app for production to the `dist` folder.\
- 然后配置 nginx 代理

#### 正式环境 nginx 配置

- 关于 VITE_APP_API_URL （访问API）与 VITE_APP_WS_URL （访问 WS） 的 nginx 配置如下
- 请将 `your_host` 替换为你的域名
```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

upstream websocket {
    server 127.0.0.1:8884;
}

server {
    listen 80;
    server_name your_host;

    location = /favicon.ico {
	try_files $uri =404;
	log_not_found off;
	access_log off;
    }

    location / {
        add_header Access-Control-Allow-Origin *;
    	add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    	add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

    	if ($request_method = 'OPTIONS') {
        	return 204;
    	}
      	proxy_pass http://127.0.0.1:8888;
    }
    
    location ^~ /ws {
        proxy_pass http://websocket;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
}
```

- VITE_APP_URL 就填写你自己的域名就好
- 请将 `your_host` 替换为你的域名, `your_project_path` 替换为你的项目路径
```nginx
server {
    listen       80;
    server_name  your_host;
    root         /your_project_path/agent-web/dist;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    index index.html index.htm;

    location / {
            try_files $uri $uri/ /index.html;
    }

    error_page 500 502 503 504 /500.html;
    client_max_body_size 20M;
    keepalive_timeout 10;

    error_page 404 /404.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
} 
```