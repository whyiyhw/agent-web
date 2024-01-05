const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://117.50.197.146:8889',
            changeOrigin: true,
        })
    );
};