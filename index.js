const http = require("http");
const fs = require("fs/promises");

class FastNode {
  constructor() {
    this.server = http.createServer();
    this.routes = {};

    this.server.on("request", (req, res) => {
      res.sendFile = async (path, mediaType) => {
        try {
          console.log("path and mediaType", path, mediaType);
          const fileHandle = await fs.open(path, "r");
          const fileReadStream = fileHandle.createReadStream();

          res.setHeader("content-Type", mediaType);
          fileReadStream.pipe(res);
        } catch (error) {
          res.writeHead(404, { "content-type": "text/json" });
          res.end(JSON.stringify({ message: "File not found" }));
        }
      };

      res.send = async (data) => {
        try {
          res.writeHead(200, { "content-type": "application/json" });
          res.write(JSON.stringify(data));
          res.end();
        } catch (error) {
          res.writeHead(500, { "Content-Type": "text/json" });
          res.end(JSON.stringify({ message: "Internal Server Error" }));
        }
      };
      const routeKey = req.method.toLowerCase() + req.url.split("?")[0];
      if (this.routes[routeKey]) {
        this.routes[routeKey](req, res);
      } else {
        res.writeHead(404, { "Content-Type": "text/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
      }
    });
  }

  route(method, path, cb) {
    console.log("it was here in methods");
    this.routes[method + path] = cb;
    console.log("see if routes are registered or not", this.routes);
  }

  listen(PORT, cb) {
    this.server.listen(PORT, () => {
      cb();
    });
  }
}

module.exports = FastNode;
