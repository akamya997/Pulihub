import http from "http";
import url from "url";
import router from "./src/router.js";

const port = 8081;

http
  .createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    router(pathname, req, res);
  })
  .listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);
