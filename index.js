const qs = require('querystring');
const http = require('https');

const options = {
  method: 'POST',
  hostname: 'api.gupshup.io',
  port: null,
  path: '/sm/api/v1/app/opt/in/appname',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(qs.stringify({user: 918728374375}));
req.end();