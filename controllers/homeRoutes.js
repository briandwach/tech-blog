const router = require('express').Router();
const { Posts, Users, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts in order of most recent
    const postsData = await Posts.findAll({
      attributes: ['id', 'title', 'content', 'date_created'],
      include: [{ model: Users, attributes: ['username'] }],
      order: [['date_created', 'ASC']],
      limit: 5
    });

    // Serialize data so the template can read it
    const posts = postsData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;