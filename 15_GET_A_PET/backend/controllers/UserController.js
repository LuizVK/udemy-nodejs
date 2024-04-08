import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// helpers
import createUserToken from '../helpers/create-user-token.js'
import getToken from '../helpers/get-token.js'
import getUserByToken from '../helpers/get-user-by-token.js'

export default class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body

        // validations
        if (!name) {
            return res.status(422).json({
                message: 'O nome é obrigatório'
            })
        }

        if (!email) {
            return res.status(422).json({
                message: 'O e-mail é obrigatório'
            })
        }

        if (!phone) {
            return res.status(422).json({
                message: 'O telefone é obrigatório'
            })
        }

        if (!password) {
            return res.status(422).json({
                message: 'A senha é obrigatória'
            })
        }

        if (!confirmpassword) {
            return res.status(422).json({
                message: 'A confirmação de senha é obrigatória'
            })
        }

        if (password !== confirmpassword) {
            return res.status(422).json({
                message: 'A senha e a confirmação de senha precisam ser iguais!'
            })
        }

        // check if user exists
        const userExists = await User.findOne({ email: email })

        if (userExists) {
            return res.status(422).json({
                message: 'E-mail em uso! Por favor, utilize outro e-mail.'
            })
        }

        // create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create a user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save()

            await createUserToken(newUser, req, res)
        } catch (err) {
            res.status(500).json({ message: err })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            return res.status(422).json({
                message: 'O e-mail é obrigatório'
            })
        }

        if (!password) {
            return res.status(422).json({
                message: 'A senha é obrigatória'
            })
        }

        // check if user exists
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(422).json({
                message: 'Não há usuario cadastrado com este e-mail!'
            })
        }

        //check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(422).json({
                message: 'Senha inválida!'
            })
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if (!user) {
            return res.status(422).json({
                message: "Usuário não encontrado!"
            })
        }

        res.status(200).json({
            user
        })
    }

    static async editUser(req, res) {
        const id = req.params.id

        // check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(!user) {
            return res.status(422).json({
                message: "Usuário não encontrado!"
            })
        }

        const { name, email, phone, password, confirmpassword } = req.body

        // validations
        if (!name) {
            return res.status(422).json({
                message: 'O nome é obrigatório'
            })
        }

        user.name = name

        if (!email) {
            return res.status(422).json({
                message: 'O e-mail é obrigatório'
            })
        }

        // check if email has already taken
        const userExists = await User.findOne({ email: email })

        if (user.email !== email && userExists) {
            return res.status(422).json({
                message: "Por favor, utilize outro e-mail!"
            })
        }

        user.email = email

        if (!phone) {
            return res.status(422).json({
                message: 'O telefone é obrigatório'
            })
        }

        user.phone = phone


        // check if password match
        if (password !== confirmpassword){
            return res.status(422).json({
                message: "A senha e a confirmação de senha precisam ser iguais!"
            })
        } else if (password === confirmpassword && password != null) {
            // change password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        if (req.file) {
            user.image = req.file.filename
        }

        try {
            // return user updated data
            
            const updatedUser = await User.findOneAndUpdate(
                { _id: id },
                { $set: user },
                { new: true }
            )

            res.status(200).json({
                message: "Usuário atualizado com sucesso!"
            })
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
}