const router = require('express').Router();
const { Posts, Users, Comments } = require('../models');
const withAuth = require('../utils/auth');

// Route to GET and view all posts from a specific user in order of most recent
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

// Route to view new post form
router.get('/new', withAuth, async (req, res) => {
      res.render('new', {
        logged_in: req.session.logged_in,
        dashboard: true
      });
  });

  // Route to view update page for a previous post
  router.get('/update/:id', withAuth, async (req, res) => {
    try {
      const postData = await Posts.findByPk(req.params.id, {
        attributes: ['id', 'title', 'content']
      });
  
      const post = postData.get({ plain: true });
  
      const commentData = await Comments.findAll({
        where: { post_id: req.params.id },
        attributes: ['content', 'date_created'],
        include: [{ model: Users, attributes: ['username'] }],
        order: [['date_created', 'DESC']]
      });
  
      const comments = commentData.map((comment) => comment.get({ plain: true }));
  
      res.render('update', {
        post,
        comments,
        logged_in: req.session.logged_in,
        dashboard: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;