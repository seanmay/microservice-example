import koa from "koa";
import router from "koa-router";

import http from "http";
import fs from "co-fs";

import _ from "../lib/utils";


const app = koa();
const pub = router();
const server = http.createServer();


pub.get("/service/:service", function * () {
  const { service } = this.params;

  const addressFile = yield fs.readFile("./data/service-addresses.json", "utf8");
  const addresses = JSON.parse(addressFile);

  this.body = addresses[service];
});


app.use(pub.routes());
server.on("request", app.callback());
/*
const { HTTP_PORT, HTTP_DOMAIN } = process.env;
*/
const discovery = require("./data/service-addresses.json").discovery;
const { port:HTTP_PORT, hostname:HTTP_DOMAIN } = discovery;
server.listen( HTTP_PORT, HTTP_DOMAIN );


console.log(`service-discovery listening on ${HTTP_DOMAIN}:${HTTP_PORT}`);
_.announce({ ready: true });
