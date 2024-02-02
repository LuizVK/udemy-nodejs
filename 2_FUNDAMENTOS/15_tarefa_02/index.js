const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer.prompt([{
    name: 'nome',
    message: 'Qual o seu nome?'
}, {
    name: 'idade',
    message: 'Qual a sua idade?'
}]).then(answers => {
    console.log(chalk.bgYellow.black(`O seu nome é ${chalk.bold(answers.nome)} e sua idade é ${chalk.bold(answers.idade)}.`))
}).catch(err => {
    console.log(`Ops! Aconteceu algo de errado: ${err}`)
})