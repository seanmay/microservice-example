import koa from "koa";
import router from "koa-router";
import http from "http";

import _ from "../lib/utils";


const app = koa();
const pub = router();
const server = http.createServer();



pub.get("/users/:id", function * () {
  const { id } = this.params;
  const user = yield _.load("storage", `/users/${id}`);
  this.body = user;
});


pub.get("/users", function * () {
  const users = yield _.load("storage", "/users");
  this.body = users;
});



app.use(pub.routes());
server.on("request", app.callback());

const { HTTP_PORT, HTTP_DOMAIN } = process.env;
server.listen( HTTP_PORT, HTTP_DOMAIN );

console.log(`service-users listening on ${HTTP_DOMAIN}:${HTTP_PORT}`);
_.announce({ ready: true });
