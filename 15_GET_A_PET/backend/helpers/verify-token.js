import jwt from 'jsonwebtoken'
import getToken from './get-token.js'

//middleware to validate token
const checkToken = (req, res, next) => {
    if (!req.headers.authorization){
        return res.status(401).json({
            message: "Acesso negado! Usuário não autenticado."
        })
    }

    const token = getToken(req)

    if(!token) {
        return res.status(401).json({
            message: "Acesso negado! Usuário não autenticado."
        })
    }

    try {
        const verified = jwt.verify(token, 'nossosecret')
        req.user = verified

        next()
    } catch (err) {
        res.status(400).json({ 
            message: 'Token inválido!' 
        })
    }

}

export default checkToken