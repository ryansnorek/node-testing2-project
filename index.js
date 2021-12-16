require("dotenv").config();

const server = require("./server");

server.listen(6000, () => {
    console.log("----===== server listening on 6000");
})