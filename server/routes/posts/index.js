const express = require('express');
const crud = require('./crud');
const postMiddlewares = require('../../middlewares/posts');

const router = express.Router();

class InvalidFileError extends Error {}

router.post(
  '/',
  postMiddlewares.upload.single('codeFile'),
  async (req, res, next) => {
    try {
      if (!req.body.message) {
        res.status(400).send({ error: 'Message field is required.' });
        return;
      }
      const createdPost = await crud.createPost(
        req.body.message,
        req.file ? req.file.filename : null
      );
      res.json(createdPost);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/',

  async (req, res, next) => {
    try {
      const { page = 0, limit = 10 } = req.query;
      const posts = await crud.getPosts(page, limit);
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }
);

router.use((err, req, res, next) => {
  if (err instanceof InvalidFileError) {
    res.status(400).json({ error: err.message });
  } else {
    next(err);
  }
});

module.exports = router;
