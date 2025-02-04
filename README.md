# **BareNode**

_A lightweight and minimal Express-like framework for Node.js_

## **Overview**

**BareNode** is a simple, fast, and lightweight Node.js framework inspired by Express.js. It provides a structured way to handle routing, middleware, and static file serving without unnecessary complexity.

## **Features**

- ✅ Minimal and fast
- ✅ Easy routing (`GET`, `POST`, etc.)
- ✅ Middleware support (Coming Soon)
- ✅ Static file serving
- ✅ Custom response helpers (`res.send`, `res.json`, `res.sendFile`)

## **Installation**

To install **BareNode**, run the following command:

```sh
npm install barenode
```

# Usage

## Basic Server Creation

```sh
const BareNode = require("barenode");

const app = new BareNode();

app.route("get", "/", (req, res) => {
  res.send({ message: "Welcome to BareNode!" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

# Serving Static file

```sh
app.useStatic("./public");
```
