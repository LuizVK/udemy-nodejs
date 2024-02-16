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

    static async removeTask(req, res) {
        const id = req.body.id

        await Task.destroy({ where: { id: id }})

        res.redirect('/tasks')
    }

    static async updateTask(req, res) {
        const id = req.params.id

        const task = await Task.findOne({ raw: true, where: { id: id }})

        res.render('tasks/edit', { task })
    }

    static async updateTaskPost(req, res) {
        const { id, title, description } = req.body

        const taskData = {
            title,
            description
        }

        await Task.update(taskData, { where: { id: id }})

        res.redirect('/tasks')
    }

    static async toggleTaskStatus(req, res) {
        const { id, done } = req.body

        const taskData = {
            done: !+done
        }

        await Task.update(taskData, { where: { id: id }})

        res.redirect('/tasks')
    }

    static async showTasks(req, res) {

        const tasks = await Task.findAll({ raw: true })
        
        res.render('tasks/all', { tasks })
    }
}