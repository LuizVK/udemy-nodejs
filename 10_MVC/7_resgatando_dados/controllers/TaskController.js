import Task from '../models/Task.js'

export default class TaskController {
    static createTask(req, res) {
        res.render('tasks/create')
    }

    static async createTaskSave(req, res) {
        const { title, description } = req.body

        const task = { title, description, done: false }

        await Task.create(task)

        res.redirect('/tasks')
    }

    static async showTasks(req, res) {

        const tasks = await Task.findAll({ raw: true })
        
        res.render('tasks/all', { tasks })
    }
}