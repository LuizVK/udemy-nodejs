import express from 'express'

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// rotas - endpoints

app.post('/createproduct', (req, res) => {
    const { name, price } = req.body

    if(!name) {
        return res.status(422).json({
            message: "O campo nome é obrigatório!"
        })
    }

    console.log(name)
    console.log(price)

    res.status(201).json({
        message: `O produto ${name} foi criado com sucesso!`
    })
})

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Primeira rota criada com successo!"
    })
})

app.listen(3000)