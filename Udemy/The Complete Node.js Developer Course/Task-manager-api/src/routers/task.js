const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/task');

// task model - create task
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// read tasks
// GET /tasks?completed=true
// GET tasks?limit=4&skip=2
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) match.completed = req.query.completed === 'true';
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    // const tasks = await Task.find({ owner: req.user._id });
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: Number(req.query.limit),
          skip: Number(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// task model - read task
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) return res.status(404).send();

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// task model - patch task
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({
      error: 'Invalid update, can not update a non-existing property',
    });

  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user.id });

    if (!task) return res.status(404).send({ error: 'Task not found' });

    updates.forEach((update) => (task[update] = req.body[update])); //? using bracket notation

    task.save();

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// task model - delete task
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send({ error: 'Task not found' });

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
