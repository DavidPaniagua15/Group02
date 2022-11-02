const router = require('express').Router();

const userRoutes = require('./userRoutes');
const tasklistRoutes = require('./tasklistRoutes');
const taskRoutes = require('./taskRoutes');

router.use('/users', userRoutes);
router.use('/tasklists', tasklistRoutes);
router.use('/tasks', taskRoutes);


module.exports = router;
