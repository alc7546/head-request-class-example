const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  console.dir(request.method);
  switch (request.method) {
    case 'GET':
      if (parsedUrl.pathname === '/') {
        htmlHandler.getIndex(request, response);
      } else if (parsedUrl.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
      } else if (parsedUrl.pathname === '/getUsers') {
        jsonHandler.getUsers(request, response);
      } else if (parsedUrl.pathname === '/updateUser') {
        jsonHandler.updateUser(request, response);
      } else {
        jsonHandler.notFound(request, response);
      }
      break;

    case 'HEAD':
      if (parsedUrl.pathname === '/getUsers') {
        jsonHandler.getUsersMeta(request, response);
      } else {
        jsonHandler.notFound(request, response);
      }
      break;

    default:
      jsonHandler.notFound(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
