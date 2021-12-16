const express = require("express");

const { router } = require("./router");

const server = express();

server.use(express.json());
  
server.use("/stuff", router);

server.use((e, req, res, next) => {
  res.status(500).json({
    message: e.message,
  });
});

module.exports = server;
