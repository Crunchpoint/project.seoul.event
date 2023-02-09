const { createProxyMiddleware } = require("http-proxy-middleware");

const targetUrl = "http://openapi.seoul.go.kr:8088/";
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/json/culturalEventInfo", {
      target: `${targetUrl}${process.env.REACT_APP_API_KEY}`,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/json/culturalEventInfo", {
      target: `${targetUrl}${process.env.REACT_APP_API_KEY}`,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/json/culturalEventInfo", {
      target: `${targetUrl}${process.env.REACT_APP_API_KEY}`,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/json/culturalEventInfo", {
      target: `${targetUrl}${process.env.REACT_APP_API_KEY}`,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware(`/json/culturalSpaceInfo`, {
      target: `${targetUrl}${process.env.REACT_APP_API_KEY}`,
      changeOrigin: true,
    })
  );
};
