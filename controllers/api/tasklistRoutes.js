const router = require('express').Router();
const { Model, Tasklist } = require('../../models');
const hasPermissions = require('../../utils');

//  GET one tasklist
router.get('/:id', async (req, res) => {
    try {
        const TasklistData = await Tasklist.findByPk(req.params.id);
        if (!TasklistData) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.status(200).json(userData);
    }   catch (err) {
        res.status(500).json(err);
    }
});

// POST to create new tasklist
router.post('/', async (req, res) => {
    try {
      const TasklistData = await Tasklist.create({
        name: req.body.name,
        owner_id: req.body.owner_id
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// PUT update a tasklist
router.put('/:id', async (req, res) => {
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
    res.status(200).json(userData);
    } catch (err) {
    res.status(500).json(err);
    }
  });

module.exports = router;