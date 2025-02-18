# BareNode

BareNode is a lightweight, minimalist HTTP server framework for Node.js that simplifies route handling and file serving.

## Features

- Simple route registration
- Easy file serving
- Flexible request and response handling
- Lightweight and minimal overhead

## Installation

```bash
npm install barenode
```

## Quick Start

```javascript
const BareNode = require("barenode");
const app = new BareNode();

// Define a route
app.route("get", "/hello", (req, res) => {
  res.send({ message: "Hello, World!" });
});

// Serve a file
app.route("get", "/file", (req, res) => {
  res.sendFile("./example.txt", "text/plain");
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

## API Reference

### `new BareNode()`

Create a new BareNode server instance.

### `route(method, path, callback)`

Register a route handler.

- `method`: HTTP method (get, post, etc.)
- `path`: URL path
- `callback`: Request handler function

### `listen(port, callback)`

Start the server on the specified port.

## Upcoming Features

- [ ] Middleware support
- [ ] Dynamic route parameters
- [ ] Advanced error handling
- [ ] Request body parsing
- [ ] CORS support
- [ ] WebSocket integration
- [ ] Logging middleware
- [ ] Static file serving

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License
