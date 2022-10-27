const router = require('express').Router();

const userRoutes = require('./userRoutes');
// const tasklistRoutes = require('./tasklistRoutes');

router.use('/user', userRoutes);
// router.use('/tasklists', tasklistRoutes);

module.exports = router;
