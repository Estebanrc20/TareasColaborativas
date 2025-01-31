const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      user: req.user.userId, // Asegúrate de usar req.user.userId en lugar de req.user.id
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }); // Asegúrate de usar req.user.userId en lugar de req.user.id
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, status } = req.body;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    await task.remove();
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    console.error('Error durante la eliminación de la tarea:', error); // Log detallado del error
    res.status(500).json({ error: error.message });
  }
};
