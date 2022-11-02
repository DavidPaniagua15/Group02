const router = require('express').Router();
const { User, Tasklist, Task } = require('../../models');
const checkAuth = require('../../utils/auth');
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
          // attributes: ['description']
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

    res.render('profile-tasklists', {
      tasklists,
      username: req.session.username,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    });
    // res.status(200).json(tasklists);
  } catch (err) {
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
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    });
    // res.status(200).json(tasklistData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create new tasklist
router.post('/', checkAuth, hasPermissions, async (req, res) => {
  try {
    const tasklistData = await Tasklist.create({
      name: req.body.name,
      owner_id: req.body.owner_id
    });


    // const tasklists = await tasklistData.get({ plain: true });

    // res.redirect(`/${tasklists.id}`);
    res.status(200).send();
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a tasklist
router.put('/:id', checkAuth, hasPermissions, async (req, res) => {
  try {
    const tasklistData = await Tasklist.update(req.body, {
      where: {
        id: req.params.id,
      },
        name: req.body.name
    });

    if (!tasklistData) {
      res.status(404).json({ message: 'This tasklist does not exist.' });
      return;
    }

    // const tasklists = await tasklistData.get({ plain: true });

    // res.redirect(`/${tasklists.id}`);
    res.status(200).send();
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a task
router.delete('/:id', checkAuth, hasPermissions, async (req, res) => {
  try {
    const tasklistData = await Tasklist.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tasklistData) {
      res.status(404).json({ message: 'No tasklist found!' });
      return;
    }

    res.status(200).send();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;