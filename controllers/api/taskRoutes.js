const router = require('express').Router();
const { User, Tasklist, Task } = require('../../models');
const checkAuth = require('../../utils/auth');
const { hasPermissions } = require('../../utils/permissions');


//  GET all tasks for the logged in user
router.get('/', checkAuth, hasPermissions, async (req, res) => {
    try {
        const taskData = await Task.findAll({
            include: [{
                model: Tasklist,
                // attributes: ['name'],
                where: {
                    owner_id: req.session.user_id
                }
            }]
            // group: [
            //     [Tasklist, 'name', 'DESC']
            // ]
        });

        if (!taskData) {
            res.status(404).json({ message: 'No task found!' });
            return;
        }

        const tasks = await taskData.map((task) => {
            return task.get({ plain: true })
        });

        res.render('profile-tasks', {
            tasks,
            logged_in: req.session.logged_in,
            username: req.session.username
        });
        // res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

//  GET one task
router.get('/:id', checkAuth, hasPermissions, async (req, res) => {
    try {
        const taskData = await Task.findByPk(req.params.id, {
            include: [
                {
                    model: Tasklist
                }
            ]
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

        // res.status(200).json(task);
    } catch (err) {
        res.status(500).json(err);
    }
});


// POST to create new task
router.post('/', checkAuth, hasPermissions, async (req, res) => {
    try {
        const taskData = await Task.create({
            tasklist_id: req.body.tasklist_id,
            description: req.body.description
        });

        const tasks = await taskData.get({ plain: true });

        console.log(tasks);
        res.redirect(`/${tasks.id}`);
        // res.status(200).json(taskData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// PUT update a task
router.put('/:id', checkAuth, hasPermissions, async (req, res) => {
    try {
        const taskData = await Task.update(req.body, {
            where: {
                id: req.params.id,
            },
                description: req.body.description
        });
        
        if (!taskData) {
            res.status(404).json({ message: 'No task found!' });
            return;
        }

        const tasks = await taskData.get({ plain: true });

        console.log(tasks);
        res.redirect(`/${tasks.id}`);
        // res.status(200).json(taskData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a task
router.delete('/task/:id', checkAuth, hasPermissions, async (req, res) => {
    try {
        const taskData = await Task.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!taskData) {
            res.status(404).json({ message: 'No task found!' });
            return;
        }

        const tasks = await taskData.get({ plain: true });

        console.log(tasks);
        res.redirect('/');
        // res.status(200).json(taskData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;