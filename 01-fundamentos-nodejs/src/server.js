import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./middlewares/routes.js";

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

  return res.writeHead(404).end();
});

server.listen(3333);
