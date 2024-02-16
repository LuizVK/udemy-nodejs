import express from 'express'

const router = express.Router()

import TaskController from '../controllers/TaskController.js'

router.get('/add', TaskController.createTask)
router.post('/add', TaskController.createTaskSave)
router.get('/', TaskController.showTasks)

export default router
