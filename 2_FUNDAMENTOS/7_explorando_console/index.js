// mais de um valor
const x = 10
const y = "João"
const z = [1, 2]

console.log(x, y, z)

// contamge de impressões
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)
console.count(`O valor de x é: ${x}, contagem`)

// variavel entre string
console.log("O nome dele é %s, ele é programador", y)

// limpar console
setTimeout(() => {
    console.clear()
}, 2000)