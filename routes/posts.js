const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "12");
    const skip = parseInt(req.query.skip || "0");
    const total = await Post.find().count();
    const items = await Post.find().skip(skip).limit(limit);
    res.status(200).json({ items, total, limit, skip });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ $or: [{ _id: id }, { slug: id }] });
    if (!post) return res.sendStatus(404);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("", async (req, res) => {
  try {
    const { body } = req;
    body.slug =
      body.title
        .trim()
        .toLowerCase()
        .replaceAll("-", " ")
        .replaceAll(/[^\w\s]/gi, "")
        .replaceAll(/\s\s+/g, " ")
        .replaceAll(/\s/gi, "-") + `-${Date.now()}`;
    const post = await new Post(body).save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!(await Post.findById(id))) return res.sendStatus(404);
    await Post.updateOne({ _id: id }, { $set: req.body }, { upsert: true });
    res.status(200).json(await Post.findById(id));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.sendStatus(404);
    if (await post.remove()) res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
