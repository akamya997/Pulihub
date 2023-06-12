import express from "express";
import * as fs from "fs";
import { bhpan, fileRecoder } from "./recoder";
// import path from "path";
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

function insertData(inserter: any, data: any, res: express.Response) {
  console.log("inserting");
  inserter(data)
    .then(() => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ status: 200, message: "success" }));
    })
    .catch((e: any) => {
      console.log(e);
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ status: 400, message: "failed" }));
    });
}

function validate(data: any) {
  return data["type"] && data["uid"] && data["link"];
}

function dataPost(req: express.Request, res: express.Response) {
  const data = req.body;
  console.log(data);
  if (!validate(data)) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: 200, message: "not valid" }));
    return;
  }
  const type = data["type"];
  if (type == "bhpan") {
    insertData(bhpan.insertRecord, data, res);
  } else if (type == "File") {
    insertData(fileRecoder.insertRecord, data, res);
  } else {
    res.statusCode = 400;
  }
}

export function route(app: express.Express) {
  app.use("/", express.static("./static"));
  app.get("/api/data", (_req: express.Request, res: express.Response) => {
    fs.readFile("static/video.json", function (_err, data) {
      res.setHeader("Content-Type", "application/json");
      res.end(data);
    });
  });
  app.post("/api/data", dataPost);
}
