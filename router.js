const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("get connected");
});

router.get("/:id", (req, res, next) => {
  res.json("get id connected");
});

router.post("/", (req, res, next) => {
  res.json("post connected");
});

module.exports = router;
