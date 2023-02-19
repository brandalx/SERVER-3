const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useUnifiedTopology: true,
    });
    const db = client.db("server3");
    const collection = db.collection("movies");
    const data = await collection.find({}).limit(20).toArray();
    client.close();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
module.exports = router;
