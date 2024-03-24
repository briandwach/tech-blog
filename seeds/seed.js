const sequelize = require('../config/connection');
const { Users, Posts, Comments } = require('../models');

const usersData = require('./usersData.json');
const postsData = require('./postsData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Users.bulkCreate(usersData, {
    individualHooks: true,
  });

  await Posts.bulkCreate(postsData);

  await Comments.bulkCreate(commentsData);

  process.exit(0);
};

seedDatabase();