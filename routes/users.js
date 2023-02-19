const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  res.json({ msg: "this is users route" });
});
module.exports = router;
