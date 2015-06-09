import http from "http";
import _ from "./../lib/utils";


const DISCOVERY_PORT = 8411;
const DISCOVERY_DOMAIN = "discovery.micro.services";

const discoveryConfig = { DISCOVERY_DOMAIN, DISCOVERY_PORT };

_.loadServer({
  cwd: "/http/microservices/service-discovery/",
  env: Object.assign({ HTTP_PORT: DISCOVERY_PORT, HTTP_DOMAIN: DISCOVERY_DOMAIN }, discoveryConfig)
})
.then(() => Promise.all([
  _.loadService("users", discoveryConfig),
  _.loadService("storage", discoveryConfig),
]))
.then(() => console.log("DONE"));
