const router = require('express').Router();
const { User, Tasklist, Task } = require('../models');
const checkAuth = require('../utils/auth');
const getTasklists = require('./api/tasklistRoutes');

router.get('/', checkAuth, async (req, res) => {
    try {
        const tasklistData = await Tasklist.findAll({
            where: {
                owner_id: req.session.user_id
            },
            include: [
                {
                    model: Task,
                }
            ]
        });

        if (!tasklistData) {
            res.status(404).json({ message: 'No tasklist found!' });
            return;
        }

        const tasklists = await tasklistData.map((tasklist) => {
            return tasklist.get({ plain: true });
        });

        res.render('profile-tasklists', {
            tasklists,
            username: req.session.username,
            logged_in: req.session.logged_in
        });
        // res.status(200).json(tasklists);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


module.exports = router;