const router = require('express').Router();
const { Tasklist, Task } = require('../../models');
const { checkAuth } = require('../../utils/auth');
const { hasPermissions } = require('../../utils/permissions');

router.post('/task', checkAuth, hasPermissions, async (req, res) => {
    try {
        const taskData = await Task.create({
            tasklist_id: req.body.tasklist_id,
            description: req.body.description
        });

        res.status(200).json(taskData)

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/task/:taskid', checkAuth, hasPermissions, async (req, res) => {
    try {
        const taskData = await Task.findOne({
            where: {
                id: req.params.taskid
            }
        });
        
        if (!taskData) {
            res.status(404).json({ message: 'No task found!' });
            return;
        }

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

router.put('/task/:taskid', checkAuth, hasPermissions, async (req, res) => {
    try {
        const taskData = await Task.update(
            {
                description: req.body.description
            },
            {
                where: {
                    id: req.params.taskid
                }
            }
        );
        if (!taskData) {
            res.status(404).json({ message: 'No task found!' });
            return;
        }

        res.status(200).json(taskData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/task/:taskid', checkAuth, hasPermissions, async (req, res) => {
    try { 
        const taskData = await Task.destroy({
            where: {
                id: req.params.taskid
            }
        });

        if (!taskData) {
            res.status(404).json({ message: 'No task found!' });
            return;
        }

        res.status(200).json(taskData);
    } catch (err) {
        res.status(500).json(err);
    } 
})

module.exports = router;