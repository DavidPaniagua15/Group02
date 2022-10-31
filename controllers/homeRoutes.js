const router = require('express').Router();
const { User, Tasklist, Task } = require('../models');
const checkAuth = require('../utils/auth');

router.get('/', checkAuth, async (req, res) => {
    try {
        const tasklistData = await Tasklist.findAll({
            where: {
                owner_id: req.session.user_id
            }
        });

        const tasklists = await tasklistData.map((task) => {
            return task.get({ plain: true });
        });

        res.render('homepage', {
            tasklists,
            logged_in: req.session.logged_in,
            username: req.session.username
        });
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