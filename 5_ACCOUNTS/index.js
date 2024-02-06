// modulos externos
import chalk from 'chalk'
import inquirer from 'inquirer'

// modulos internos

import fs from 'fs'
import { error } from 'console'

operation()

function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: ['Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Transferir', 'Histórico', 'Sair']
        }
    ]).then((answer) => {
        const action = answer['action']

        switch(action) {
            case 'Criar Conta': 
                createAccount()
                break
            case 'Consultar Saldo':
                getAccountBalance()
                break
            case 'Depositar':
                deposit()
                break
            case 'Sacar':
                withdraw()
                break
            case 'Transferir':
                transfer()
                break
            case 'Histórico':
                historic()
                break
            case 'Sair':
                infoMessage('Obrigado por usar o Accounts!')
                process.exit()
        }
    })
    .catch(errorMessage)
}

// ***** START OPREATIONS *****

// create an account
function createAccount() {
    congratulationMessage('Parabéns por escolher o nosso banco!')
    successMessage('Defina as opções da sua conta a seguir')

    buildAccount()
}

// build a account
function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para a sua conta:'
        }
    ])
    .then(answer => {
        const accountName = answer['accountName']

        console.info(accountName)

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)) {
            errorMessage('Esta conta já existe, escolha outro nome!')
            buildAccount()
            return
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`, 
            '{"balance": 0, "historic": []}', 
            function (err) {
                errorMessage(err)
            }
        )

        successMessage('Parabéns, a sua conta foi criada!')
        operation()
    })
    .catch(errorMessage)
}

// get account balance
function getAccountBalance() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then(answer => {
        const accoutnName = answer['accountName']

        if(!checkAccount(accoutnName)) {
            return getAccountBalance()
        }

        const accountData = getAccount(accoutnName)

        infoMessage(`Olá, o saldo da sua conta é de R$${accountData.balance}`)

        operation()
    })
    .catch(errorMessage)
}

// add an amount to use account
function deposit() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ])
    .then(answer => {
        const accountName = answer['accountName']

        // verify if account exists
        if (!checkAccount(accountName))
            return deposit()

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar?'
            }
        ]).then(answer => {
            const amount = answer['amount']

            // add an amount
            addAmount(accountName, amount)
        })
        .catch(errorMessage)


    })
    .catch(errorMessage)
}

// withdraw an amount from user account
function withdraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then(answer => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return withdraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja sacar?'
            }
        ]).then(answer => {
            const amount = answer['amount']

            // remove an amount
            removeAmount(accountName, amount)
        })
        .catch(errorMessage)
    })
    .catch(errorMessage)
}

// transfer an amount to another account
function transfer() {
    inquirer.prompt([
        {
            name: 'originAccountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then(answer => {
        const originAccountName = answer['originAccountName']

        if(!checkAccount(originAccountName)) {
            return transfer()
        }

        inquirer.prompt([
            {
                name: 'targetAccountName',
                message: 'Qual o nome da conta de destino?'
            }
        ]).then(answer => {
            const targetAccountName = answer['targetAccountName']

            if(!checkAccount(targetAccountName)) {
                return transfer()
            }

            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Quanto deseja transferir?'
                }
            ]).then(answer => {
                const amount = answer['amount']
    
                // transfer an amount
                transferAmount(originAccountName, targetAccountName, amount)
            })
            .catch(errorMessage)
        })
        .catch(errorMessage)
    })
    .catch(errorMessage)
}

function historic() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then(answer => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return historic()
        }

        const accountData = getAccount(accountName)

        infoMessage(chalk.bold.underline('HISTORICO'))

        accountData.historic.forEach((item, i) => {
            const message = `${i + 1} - ${item.description}`
            item.operationType === 'in' ? successMessage(message) : dangerMessage(message)
        })

        operation()
    })
    .catch(errorMessage)
}


// ##### END OPERATIONS #####


function checkAccount(accountName) {
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        errorMessage('Esta conta já existe, escolha outro nome!')
        return false
    }

    return true
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if(!amount) {
        // console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        errorMessage('Ocorreu um erro, tente novamente mais tarde!')
        return operation()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    addHistoric(accountData, 'Deposito', amount)
    saveFileAcount(accountName, accountData)
    
    successMessage(`Foi depositado um valor de R$${amount} na sua conta!`)
    operation()
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount){
        errorMessage('Ocorreu um erro, tente novamente mais tarde!')
        return operation()
    }

    if (accountData.balance < amount) {
        errorMessage('Saldo insuficiente!')
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    addHistoric(accountData, 'Saque', amount)
    saveFileAcount(accountName, accountData)

    successMessage(`Foi realizado um saque de R$${amount} da sua conta!`)
    operation()
}

function transferAmount(originAccountName, targetAccountName, amount) {
    const originAccountData = getAccount(originAccountName)
    const targetAccountData = getAccount(targetAccountName)

    if (!amount) {
        errorMessage('Ocorreu um erro, tente novamente mais tarde!')
        return operation()
    }

    if(originAccountData.balance < amount) {
        errorMessage('Saldo insuficiente!')
        return transfer()
    }

    originAccountData.balance = parseFloat(originAccountData.balance) - parseFloat(amount)
    targetAccountData.balance = parseFloat(targetAccountData.balance) + parseFloat(amount)

    addHistoric(originAccountData, 'Transferencia', amount, '', targetAccountName)
    saveFileAcount(originAccountName, originAccountData)
    addHistoric(targetAccountData, 'Transferencia', amount, originAccountName)
    saveFileAcount(targetAccountName, targetAccountData)

    successMessage(`Transferência de R$${amount} realizada com sucesso para ${targetAccountName}!`)
    operation()
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, 
    {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

function saveFileAcount(accountName, accountData) {
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData), 
        function(err) {
            errorMessage(err)
        }
    )

    return
} 

function addHistoric(accountData, action, amount, originAccountName = '', targetAccountName = '') {
    const date = new Date()
    let description = ''
    let operationType = ''
    if (action === 'Saque') {
        description = `Saque de R$${amount} - ${formattedDate(date)} - Saldo: R$${accountData.balance}`
        operationType = 'out'
    } else if (action === 'Deposito') {
        description = `Deposito de R$${amount} - ${formattedDate(date)} - Saldo: R$${accountData.balance}`
        operationType = 'in'
    } else if (action === 'Transferencia' && originAccountName) {
        description = `Transferência de R$${amount} recebida de ${originAccountName} - ${formattedDate(date)} - Saldo: R$${accountData.balance}`
        operationType = 'in'
    } else if (action === 'Transferencia' && targetAccountName) {
        description = `Transferência de R$${amount} enviada para ${targetAccountName} - ${formattedDate(date)} - Saldo: R$${accountData.balance}`
        operationType = 'out'
    }

    accountData.historic.push({
        action,
        operationType,
        amount: parseFloat(amount),
        balance: accountData.balance,
        date,
        description
    })
}

function errorMessage(message) {
    return console.log(chalk.bgRed.black(message))
}

function successMessage(message) {
    return console.log(chalk.green(message))
}

function dangerMessage(message) {
    return console.log(chalk.red(message))
}

function infoMessage(message){
    return console.log(chalk.bgBlue(message))
}

function congratulationMessage(message) {
    return console.log(chalk.bgGreen.black(message))
}

function formattedDate(date) {
    return `${date.toLocaleDateString()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
}