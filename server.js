const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

const accessToken =
  'eyJlbmMiOiJBMTI4R0NNIiwidGFnIjoiTy1NSUkySmI5WVZWY0RTMzk4amJZQSIsImFsZyI6IkEyNTZHQ01LVyIsIml2IjoiLXR3Z2JndnkxZk53YjVsbyJ9.L3fGaIaY4oseNL0PrCnpfg.jcF8dS7oWqwhOTgJ.OD9VnsxwXMPCbbOE9g8rUTp9mt6HefUrqvFUt6iYGdf0FWFZ-McX_HiKCyB7FkIHb1lQUT55bHTGSqww5OdmR_r8-hZxxDFHRbTn6C4nTyWOBquue6G5VEbJDL1IPLuDPPfCWRMPdWrdBK9cRYii2HpidbJQTfcJCy6fLDYXl8imd7bNE5InzbaBwfmraK6BF06R80GP_QJ5yorhMV9QlvdaQEArgAifP_w5cegTTqETCajeCgkYfxHZ7O9RBR9oqQGwrBygQQhGdtBsNDiNYobdpHbPyjgeAQH0XcuzKkPPyVxP4eHJzkzixqLtX5oaUGbUZByrHaog_ZN9MHRRDzI2-t-TDQs2zSgh3TG_AOhEgzdWQBd43eLjgUWZ4mwG.teiv1A0yg1TWZMsCLid7MA';
var options = {
  target: 'https://dev.midm.kt.com/', // target host => 믿음 그 뭐냐 tb 서버 ip야
  changeOrigin: true, // needed for virtual hosted sites

  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Content-Type'] = 'application/json';
    proxyRes.headers['Access-Control-Allow-Methods'] =
      'POST, PUT, GET, OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type';
  },
  onProxyReq: function (proxyReq, req, res) {
    proxyReq.setHeader('Authorization', `Bearer ${accessToken}`);
  },
  withCredentials: true,
};

console.log(options);
app.options('*', cors());
app.use('/', createProxyMiddleware(options));

app.listen(8083); //포트는 8083으로 설정
