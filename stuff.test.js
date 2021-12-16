const request = require("supertest");
const db = require("./db.config");
const server = require("./server");
const { addStuff } = require("./router");

const item = { name: "sherpa" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("stuff").truncate();
});
afterAll(async () => {
  await db.destroy();
});

test("env works", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("unit testing", () => {
  test("add stuff", async () => {
    await addStuff(item);
    const stuff = await db("stuff");
    expect(stuff).toHaveLength(1);
  });
});

console.log(addStuff)