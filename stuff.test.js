const request = require("supertest");
const db = require("./db.config");
const server = require("./server");
const { addStuff, findById, removeStuff } = require("./router");

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

describe("integration testing", () => {
  test("add stuff then retrieve it by id", async () => {
    const [id] = await addStuff(item);
    const addedItem = await findById(id);
    expect(addedItem).toMatchObject(item);
  });
  test("add stuff, retrieve it, then throw it away", async () => {
    const [id] = await addStuff(item);
    const addedItem = await findById(id);
    expect(addedItem).toMatchObject(item);
    await removeStuff(id);
    expect(await findById(id)).toBe();
  });
});

describe("endpoint testing", () => {
  test("GET", async () => {
    await addStuff(item);
    const stuff = await request(server).get("/stuff");
    expect(stuff.body).toHaveLength(1);
  });
  test("POST", async () => {
    await request(server).post("/stuff").send({ name: "fork" });
    const stuff = await request(server).get("/stuff");
    expect(stuff.body).toHaveLength(1);
  });
  test("DELETE", async () => {
    const [id] = await addStuff(item);
    const addedItem = await findById(id);
    expect(addedItem).toMatchObject(item);
    expect(addedItem.stuff_id).toBe(1)

    // await request(server).delete(`/stuff/${id}`);
    request(server).delete("/stuff/1")
    const deletedItem = await findById(id);
    expect(deletedItem).toBe();
  });
});
