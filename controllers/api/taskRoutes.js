const router = require('express').Router();
const { User, Tasklist, Task } = require('../../models');
const checkAuth = require('../../utils/auth');
const { hasPermissions } = require('../../utils/permissions');


// POST to create new task
router.post('/', checkAuth, hasPermissions, async (req, res) => {
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


//  GET all tasks for the logged in user
router.get('/', checkAuth, hasPermissions, async (req, res) => {
    try {
        const taskData = await Task.findAll({
            group: [
                [Tasklist, 'name', 'DESC']
            ],
            include: [{
                model: Tasklist,
                attributes: ['name'],
                where: {
                    owner_id: req.session.user_id
                }
            }]
        });

        if (!taskData) {
            res.status(404).json({ message: 'No task found!' });
            return;
        }

        // console.log(taskData);
        const tasks = await taskData.map((task) => {
            return task.get({ plain: true })
        });

        console.log(`\n\n\n GETTING PLAIN TASKS \n\n\n`);
        console.log(tasks);

        res.status(200).json(tasks);


        // res.render('task', {
        //     task,
        //     logged_in: req.session.logged_in,
        //     username: req.session.username
        // });

    } catch (err) {
        res.status(500).json(err);
    }
});

//  GET one task
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

// PUT update a task
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

// DELETE a task
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