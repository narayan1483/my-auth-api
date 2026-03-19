const Todo = require('../models/Todo');

const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort('-createdAt');
    res.json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    next(error);
  }
};

const getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo nahi mila!' });
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Yeh tumhara todo nahi hai!' });
    }
    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create({ ...req.body, user: req.user.id });
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo nahi mila!' });
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Yeh tumhara todo nahi hai!' });
    }
    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo nahi mila!' });
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Yeh tumhara todo nahi hai!' });
    }
    await todo.deleteOne();
    res.json({ success: true, message: 'Todo delete ho gaya!' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };