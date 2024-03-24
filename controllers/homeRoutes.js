const router = require('express').Router();
const { Posts, Users, Comments } = require('../models');
const withAuth = require('../utils/auth');


module.exports = router;