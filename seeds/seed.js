const sequelize = require('../config/connection');
const { User, Task, Tasklist } = require('../models');

const userData = require('./userData.json');
const tasklistData = require('./tasklistData.json');
const taskData = require('./taskData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    const allUsers = await User.findAll();
    console.log('mapped users:');
    const userIds = await allUsers.map((user) => {
        return user.get({
            plain: true,
            attributes: ['id']
        });
    });
    console.log('cleaned users:');
    console.log(userIds);
    // const tasklists = await Blog.bulkCreate(tasklistData);

    // const tasks = await Comment.bulkCreate(taskData);

    process.exit(0);
};

seedDatabase();