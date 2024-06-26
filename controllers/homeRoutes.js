const router = require('express').Router();
const { Posts, Users, Comments } = require('../models');

// Route to GET and view 5 most recent posts
router.get('/', async (req, res) => {
  try {
    // Get all posts in order of most recent
    const postsData = await Posts.findAll({
      attributes: ['id', 'title', 'content', 'date_created'],
      include: [{ model: Users, attributes: ['username'] }],
      order: [['date_created', 'DESC']],
      limit: 5
    });

    // Serialize data so the template can read it
    const posts = postsData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', {
    logged_in: req.session.logged_in
  });
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup', {
    logged_in: req.session.logged_in
  });
});

// Route to view a specific post and its comments
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      attributes: ['id', 'title', 'content', 'date_created'],
      include: [{ model: Users, attributes: ['username', 'id'] }]
    });

    const post = postData.get({ plain: true });

    const commentData = await Comments.findAll({
      where: { post_id: req.params.id },
      attributes: ['content', 'date_created'],
      include: [{ model: Users, attributes: ['username'] }],
      order: [['date_created', 'DESC']]
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    const user = (req.session.user_id === post.user.id);

    res.render('post', {
      post,
      comments,
      logged_in: req.session.logged_in,
      user
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;