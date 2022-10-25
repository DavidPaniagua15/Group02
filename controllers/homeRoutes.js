const router = require('express').Router();
const { User, Tasklist, Task } = require('../models');
// const checkAuth = require('../utils/auth');

router.get('/', checkAuth, async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;