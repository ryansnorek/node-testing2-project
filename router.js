const router = require("express").Router();
const db = require("./db.config");

// GET ALL STUFF
router.get("/", (req, res, next) =>
  db("stuff")
    .then((allStuff) => res.json(allStuff))
    .catch(next)
);
// GET STUFF BY ID
const findById = (id) => db("stuff").where("stuff_id", id).first();
router.get("/:id", (req, res, next) => {
  findById(req.params.id)
    .then((stuff) => res.json(stuff))
    .catch(next);
});
// ADD MORE STUFF
const addStuff = (stuff) => db("stuff").insert(stuff);
router.post("/", async (req, res, next) => {
  try {
    const id = await addStuff(req.body);
    res.json(await findById(id));
  } catch (e) {
    next(e);
  }
});
// THROW STUFF AWAY
router.delete("/:id", (req, res, next) => {
  db("stuff").delete().where("stuff_id", req.params.id);
});

module.exports = {
    router, 
    addStuff
};
