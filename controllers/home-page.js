const express = require('express');
const { User, Post, Comment } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const loggedIn = req.session.loggedIn;

    const postData = await Post.findAll({
      include: [
        { model: Comment, include: [{ model: User }] },
        { model: User }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { loggedIn, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login', { loggedIn: false });
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ]
    });

    if (!postData) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve post data' });
  }
});

module.exports = router;