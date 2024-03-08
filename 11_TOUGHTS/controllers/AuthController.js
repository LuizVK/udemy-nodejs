import bcrypt from 'bcryptjs'
import User from "../models/User.js"

export default class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body
        
        // finder user
        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            req.flash('message', 'Usuário não encontrado!')
            return res.render('auth/login')
        }

        // check if passwords match
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if (!passwordMatch) {
            req.flash('message', 'Senha inválida!')
            return res.render('auth/login')
        }

        //initialize session
        req.session.userid = user.id

        req.flash('message', 'Autenticação realizada com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body

        // name was not filled
        if (!name || name.trim() === '') {
            req.flash('message', 'O nome deve ser preenchido!')
            return res.render('auth/register')
        }

        // email was not filled
        if (!email || email.trim() === '') {
            req.flash('message', 'O e-mail deve ser preenchido!')
            return res.render('auth/register')
        }

        // password match validation
        if (password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente!')
            return res.render('auth/register')
        }

        // check if user exists
        const checkIfUserExists = await User.findOne({ where: { email: email } })

        if (checkIfUserExists) {
            req.flash('message', 'O e-mail já está em uso!')
            return res.render('auth/register')
        }

        // create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)

            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro relizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
        } catch(err) {
            console.log(err)
        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}