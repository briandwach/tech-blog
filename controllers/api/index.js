const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const postsRoutes = require('./postsRoutes');
const commentsRoutes = require('./commentsRoutes');
const seedsRoutes = require('./seedsRoutes');

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/comments', commentsRoutes);
router.use('/seeds', seedsRoutes);

module.exports = router;