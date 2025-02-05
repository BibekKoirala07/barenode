const http = require("http");
const fs = require("fs/promises");
const path = require("path");

class BareNode {
  constructor() {
    this.server = http.createServer();
    this.routes = {};
    this.middleware = [];

    this.server.on("request", (req, res) => {
      try {
        const urlObj = new URL(req.url, `http://${req.headers.host}`);
        req.query = Object.fromEntries(urlObj.searchParams);

        for (let index = 0; index < this.middleware.length; index++) {
          console.log("middleware runned");
          this.middleware[index](req, res);
        }

        res.json = function json(data) {
          res.writeHead("Content-Type", "application/json");
          res.end(JSON.stringify(data));
          return res;
        };

        res.status = function status(statusCode) {
          res.writeHead(statusCode);
          return res;
        };

        res.sendFile = async function (filePath, mediaType) {
          try {
            console.log("path and mediaType", filePath, mediaType);
            const fileHandle = await fs.open(filePath, "r");
            const fileReadStream = fileHandle.createReadStream();

            res.setHeader("Content-Type", mediaType);
            fileReadStream.pipe(res);
            // res.status(200);
            fileReadStream.on("end", () => {
              fileHandle.close();
            });
          } catch (error) {
            res.status(404).json({ message: "File not found" });
          }
          return res;
        };

        const routeKey = req.method.toLowerCase() + req.url.split("?")[0];

        if (this.routes[routeKey]) {
          this.routes[routeKey](req, res);
        } else {
          res.status(404).json({ message: "Route not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  }

  use(fn) {
    this.middleware.push(fn);
  }

  useStatic(directory) {
    this.route("get", "/*", async (req, res) => {
      const filePath = path.join(directory, req.url);
      const fileExtension = path.extname(filePath);

      try {
        await fs.access(filePath);
      } catch (error) {
        return res.status(404).json({ message: "File not found" });
      }

      let mediaType = "application/octet-stream";
      const mimeTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
      };

      if (mimeTypes[fileExtension]) {
        mediaType = mimeTypes[fileExtension];
      }

      res.sendFile(filePath, mediaType);
    });
  }

  route(method, path, cb) {
    this.routes[method + path] = cb;
  }

  listen(PORT, cb) {
    this.server.listen(PORT, (err) => {
      if (err) {
        console.error("Error starting server:", err);
      } else {
        cb();
      }
    });
  }
}

module.exports = BareNode;
