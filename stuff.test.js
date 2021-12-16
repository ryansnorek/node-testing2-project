const request = require("supertest");
const db = require("./db.config");
const server = require("./server");

test("env works", () => {
    expect(process.env.DB_ENV).toBe("testing")
})