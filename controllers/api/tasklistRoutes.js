const router = require('express').Router();
const { User, Tasklist, Task } = require('../../models');
const checkAuth  = require('../../utils/auth');
const { hasPermissions } = require('../../utils/permissions');

//  GET all tasklists for the logged in user
router.get('/', checkAuth, hasPermissions, async (req, res) => {
  try {
    const tasklistData = await Tasklist.findAll({
      where: {
          owner_id: req.session.user_id
      },
      include: [
        {
          model: Task,
          attributes: ['description']
        }
      ]
      });
      if (!tasklistData) {
          res.status(404).json({ message: 'No tasklist found!' });
          return;
      }
    
    const tasklists = await tasklistData.map((tasklist) => {
      return tasklist.get({ plain: true })
    });

    res.render('profile', {
      tasklists,
      username: req.session.username,
      loggedIn: req.session.logged_in
    });
      // console.log(tasklists);
      // res.status(200).json(tasklists);
  }   catch (err) {
      res.status(500).json(err);
  }
});

//  GET one tasklist
router.get('/:id', checkAuth, hasPermissions, async (req, res) => {
    try {
      const tasklistData = await Tasklist.findByPk(req.params.id, {
        include: [
          {
            model: Task
            // attributes: ['description']
          }
        ]
        });
        if (!tasklistData) {
            res.status(404).json({ message: 'No tasklist found!' });
            return;
        }
      
        const tasklists = await tasklistData.get({ plain: true });
      
      res.render('tasklist', {
        tasklists,
        username: req.session.username,
        loggedIn: req.session.logged_in
      });
        // res.status(200).json(tasklistData);
    }   catch (err) {
        res.status(500).json(err);
    }
});

// POST to create new tasklist
router.post('/', checkAuth, hasPermissions, async (req, res) => {
    try {
      const TasklistData = await Tasklist.create({
        name: req.body.name,
        owner_id: req.body.owner_id
      });
      res.status(200).json(TasklistData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// PUT update a tasklist
router.put('/:id', checkAuth, hasPermissions, async (req, res) => {
    try {
        const TasklistData = await Tasklist.update(req.body, {
            where: {
             id: req.params.id,
        },
    });
    if (!TasklistData[0]) {
        res.status(404).json({ message: 'This tasklist does not exist.' });
      return;
    }
    res.status(200).json(TasklistData);
    } catch (err) {
    res.status(500).json(err);
    }
  });

module.exports = router;