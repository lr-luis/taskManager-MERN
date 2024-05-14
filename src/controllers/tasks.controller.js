import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id
  }).populate('user')
  res.json(tasks)
}

export const createTask = async (req, res) => {
  const { title, description, date } = req.body
  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id
  })

  const taskSaved = await newTask.save()
  res.status(201).json(taskSaved)
}

export const getTask = async (req, res) => {
  try {
    const { id } = req.params
    const taskFound = await Task.findById(id).populate('user')
    if (!taskFound) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.status(200).json(taskFound)
  } catch (error) {
    return res.status(404).json({
      message: "Task not found"
    })
  }
}

export const deleteTask = async (req, res) => {
  const { id } = req.params
  const taskDeleted = await Task.findByIdAndDelete(id)
  if (!taskDeleted) {
    return res.status(404).json({ message: 'Task not found' })
  }
  return res.status(204)
}

export const updateTask = async (req, res) => {
  const taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true // to return the new task instead of the old one
  })
  if (!taskUpdated) {
    return res.status(404).json({ message: 'Task not found' })
  }
  console.log(taskUpdated)
  res.status(202).json(taskUpdated)
}