const router = require('express').Router();
const { Tasklist, Task } = require('../../models');
const { checkAuth } = require('../../utils/auth');

router.get('/task/:taskid', checkAuth, checkPermissions, async (req, res) => {
    try {
        const taskData = await Task.findOne({
            where: {
                id: req.params.taskid
            }
        });

        const task = await taskData.get({ plain: true });

        res.render('task', {
            task,
            logged_in: req.session.logged_in,
            username: req.session.username
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;