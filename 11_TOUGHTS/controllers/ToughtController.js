import Tought from "../models/Toughts.js";
import User from "../models/User.js";
import { Op } from 'sequelize'

export default class ToughtController {
    static async showToughts(req, res) {
        let search = ''
        
        if (req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'
        let newActive = ''
        let oldActive = ''

        if(req.query.order === 'old') {
            order = 'ASC'
            oldActive = 'active'
        } else {
            order = 'DESC'
            newActive = 'active'
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: {[Op.like]: `%${search}%`}
            },
            order: [['createdAt', order]]
        })

        const toughts = toughtsData.map((result) => result.get({ plain: true }))

        let toughtsQty = toughts.length

        if (toughtsQty === 0){
            toughtsQty = false
        }

        res.render('toughts/home', { toughts, search, toughtsQty, order: req.query.order, newActive, oldActive })
    }

    static async dashboard(req, res) {
        const userId = req.session.userid

        const user = await User.findOne({ 
            where: { 
                id: userId 
            },
            include: Tought,
            plain: true
        })

        if (!user) {
            return res.redirect('/login')
        }

        const toughts = user.Toughts.map((result) => result.dataValues)

        let emptyToughts = false

        if (toughts.length === 0){
            emptyToughts = true
        }

        res.render('toughts/dashboard', { toughts, emptyToughts })
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtSave(req, res) {

        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            await Tought.create(tought)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (err) {
            console.log(err)
        }
    }

    static async removeTought(req, res) {
        const id = req.body.id
        const UserId = req.session.userid

        try {
            await Tought.destroy({ where: {id: id, UserId: UserId }})

            req.flash('message', 'Pensamento removido com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch(err) {
            console.log(err)
        }
    }

    static async updateTought(req, res) {
        const id = req.params.id

        const tought = await Tought.findOne({ where: { id: id }, raw: true })

        res.render('toughts/edit', { tought })
    }

    static async updateToughtSave(req, res) {
        const { id, title } = req.body

        const tought = await Tought.findOne({ where: { id: id }, raw: true })
        
        if(!tought) {
            req.flash('message', 'Pensamento não encontrado, tente novamente mais tarde!')
            return req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        }

        if(req.session.userid !== tought.UserId){
            req.flash('message', 'Usuario não tem permissão para editar esse registro!')
            return req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        }

        const toughtUpdated = {
            title
        }

        try {
            await Tought.update(toughtUpdated, { where: { id: id }})
    
            req.flash('message', 'Pensamento atualizado com sucesso!')

            return req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch(err) {
            console.log(err)
        }
    }
}