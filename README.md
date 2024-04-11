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

#### 正式环境 docker-nginx 配置

- 找到项目下的 nginx.conf
- 替换两个 127.0.0.1 为 你的 IP
- `docker-compose up -d` 就好 

- 如果使用域名 请自行修改 端口绑定跟域名绑定 还有 wss 转 ws 的配置