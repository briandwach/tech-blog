const router = require('express').Router();
const { Posts } = require('../../models');
const withAuth = require('../../utils/auth');

// API route to create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Posts.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// API route to update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Posts.update(
            {
                ...req.body
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        res.status(200).json(updatePost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// API route to deleate a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await Posts.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(deletePost);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;