const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Users, Posts, Comments } = require('../../models');

const usersData = require('../../seeds/usersData.json');
const postsData = require('../../seeds/postsData.json');
const commentsData = require('../../seeds/commentsData.json');

// API route to seed the database
router.get('/', async (req, res) => {
    try {
        const seedDatabase = async () => {
            await sequelize.sync({ force: true });

            // The transaction method ensures the array in the json file is added to the database in sequential order
            await sequelize.transaction(async (t) => {
                for (let u = 0; u < usersData.length; u++) {
                    await Users.create(usersData[u], { transaction: t, individualHooks: true });
                }
            });

            await Posts.bulkCreate(postsData);

            await Comments.bulkCreate(commentsData);

            res.status(200).json('DB seeded successfully');
        };

        seedDatabase();

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;