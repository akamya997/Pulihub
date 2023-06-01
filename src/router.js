import mime from "mime";
import path from "path";
import fs from "fs";
import { bhpan, fileRecoder } from "./recoder.js";

function getTime() {
  var date = new Date();
  var day =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  var time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return day + " " + time;
}

function insertData(inserter, data, res) {
  inserter(data)
    .then(() => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ status: 200, message: "success" }));
    })
    .catch((e) => {
      console.log(e);
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ status: 400, message: "failed" }));
    });
}

function validate(data) {
    return data["type"] && data["uid"] && data["link"];
}

function route_api(pathname, req, res) {
  console.log(getTime() + " " + req.method + " " + pathname);
  if (pathname == "/api/data") {
    if (req.method == "GET") {
      fs.readFile("static/video.json", function (err, data) {
        res.setHeader("Content-Type", "application/json");
        res.end(data);
      });
    } else if (req.method == "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data = data + chunk;
      });
      req.on("end", () => {
        try {
            data = JSON.parse(data);
            if(!validate(data)) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ status: 200, message: "not valid" }));
                return;
            }
            let type = data["type"];
            if (type == "bhpan") {
              insertData(bhpan.insertRecord, data, res);
            } else if (type == "File") {
              insertData(fileRecoder.insertRecord, data, res);
            } else {
              res.statusCode = 400;
            }
        } catch (e) {
            console.log(e);
            res.statusCode = 400;
        }
      });
    }
  }
}

function default_route(pathname, req, res) {
  console.log(getTime() + " " + "File " + pathname);
  var ext = path.parse(pathname).ext;
  var mimeType = mime.getType(ext);
  if(ext == ".ico")
    mimeType="image/x-icon";
  fs.readFile(pathname.slice(1), function (err, data) {
    if (err) {
      console.log(err);
      res.writeHead(404, { "Content-Type": "text/html" });
    } else {
      res.writeHead(200, { "Content-Type": mimeType });
      res.write(data.toString());
    }
    res.end();
  });
}

export default function router(pathname, req, res) {
  if (pathname.startsWith("/api")) {
    route_api(pathname, req, res);
  } else default_route(pathname, req, res);
}
