const sequelize = require('../config/connection');
const { Users, Posts, Comments } = require('../models');

const usersData = require('./usersData.json');
const postsData = require('./postsData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await sequelize.transaction(async (t) => {
    for (let u = 0; u < usersData.length; u++) {
      await Users.create(usersData[u], { transaction: t, individualHooks: true });
    }
  });

  await Posts.bulkCreate(postsData);

  await Comments.bulkCreate(commentsData);

  process.exit(0);
};

seedDatabase();