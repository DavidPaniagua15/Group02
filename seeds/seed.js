const sequelize = require('../config/connection');
const { User, Task, Tasklist } = require('../models');

const userData = require('./userData.json');
const tasklistData = require('./tasklistData.json');
const taskData = require('./taskData.json');

const seedDatabase = async () => {
    let tasklists;
    let tasks;
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    const allUsers = await User.findAll();
    const users = await allUsers.map((user) => {
        return user.get({ plain: true });
    });
    console.log('cleaned users:');
    console.log(users);

    for (const tasklist of tasklistData) {
        await Tasklist.create({
            ...tasklist,
            owner_id: users[Math.floor(Math.random() * users.length)].id
        });

        const allTasklists = await Tasklist.findAll();
        tasklists = await allTasklists.map((tasklist) => {
            return tasklist.get({ plain: true });
        });
    };

    console.log(tasklists);

    for (const task of taskData) {
        await Task.create({
            ...task,
            tasklist_id: tasklists[Math.floor(Math.random() * tasklists.length)].id
        });

        const allTasks = await Task.findAll();
        tasks = await allTasks.map((task) => {
            return task.get({ plain: true });
        })

    };

    console.log(tasks);

    process.exit(0);
};

seedDatabase();