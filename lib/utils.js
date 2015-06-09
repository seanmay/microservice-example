import fetch from "node-fetch";
import child_process from "child_process";


function loadService (name, vars) {
  log(`loading service-${name}`);
  return discover(name, vars).then(config => loadServer({
    cwd: `/http/microservices/service-${name}`,
    env: Object.assign({ HTTP_PORT: config.port, HTTP_DOMAIN: config.hostname }, vars)
  }));
}


function loadServer (config) {
  return new Promise((resolve, reject) => {
    const server = child_process.fork("server", config);
    server.on("message", message => onReady(message.ready));
    server.on("error", reject);

    function onReady (ready) {
      if (ready) {
        resolve(server);
      }
    }
  });
}

function load (resource, path = "/", format = "json") {
  return (
    discover(resource)
    .then(config => fetch(`http://${config.hostname}:${config.port}${path}`))
    .then(response => response[format]())
  );
}


function log (x) {
  console.log(x);
  return x;
}



function discover (service, config = process.env) {
  const { DISCOVERY_DOMAIN: domain, DISCOVERY_PORT:port } = config;
  console.log(`${domain}:${port}`);
  return (
    fetch(`http://${domain}:${port}/service/${service}`)
    .then(response => response.json())
    .then(log)
  );
}


function announce (message) {
  if (process.send) {
    process.send(message);
  }
}


export default {
  load, log, discover, announce, loadService, loadServer
};
