const router = require('express').Router();
const { Posts, Users, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // If the user is not logged in, redirect the request to another route
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  try {
    // Get all posts in order of most recent
    const postsData = await Posts.findAll({
      where: { user_id: req.session.user_id },
      attributes: ['id', 'title', 'content', 'date_created'],
      order: [['date_created', 'DESC']]
    });

    // Serialize data so the template can read it
    const posts = postsData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
      dashboard: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, async (req, res) => {
      res.render('new', {
        logged_in: req.session.logged_in,
        dashboard: true
      });
  });


module.exports = router;