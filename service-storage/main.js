import koa from "koa";
import router from "koa-router";
import http from "http";

import fs from "co-fs";


import _ from "./../lib/utils";


const app = koa();
const pub = router();
const server = http.createServer();



pub.get("/:table/:id", function * (next) {
  const { table, id } = this.params;
  const json = yield fs.readFile(`./data/${table}.json`);
  const data = JSON.parse(json);
  const result = data.find(item => item.id === id);

  this.body = result;
});


pub.get("/:table", function * (next) {
  const { table } = this.params;
  const json = yield fs.readFile(`./data/${table}.json`);
  const data = JSON.parse(json);

  this.body = data;
});


app.use(pub.routes());
server.on("request", app.callback());


const { HTTP_PORT, HTTP_DOMAIN } = process.env;
server.listen( HTTP_PORT, HTTP_DOMAIN );

console.log(`service-storage listening on ${HTTP_DOMAIN}:${HTTP_PORT}`);
_.announce({ ready: true });
