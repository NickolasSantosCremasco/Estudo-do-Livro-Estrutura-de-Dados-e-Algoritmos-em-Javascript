const _items = Symbol('stackItems');
class Stack {
    constructor () {
        this[_items] = [];
    }
}

const stack = new Stack();
stack.push(5);
stack.push(8);
let objectSymbols = Object.getOwnPropertySymbols(stack); 
console.log(objectSymbols.length) // exibe 1
console.log(objectSymbols) // exibe [Symbol()]
console.log(objectSymbols[0]) // Symbol()
stack[objectSymbols[0]].push(1);
stack.print(); //exibe 5, 8, 1

// Isso oferece uma propriedade private falsa para a classe

const items = new WeakMap(); //variavel declarada como weakmap
class Weak {
    constructor () {
        items.set(this, []); // valor de items, referenciando a this a propria classe como chave weakmap e um array que representa o valor
    }
    push(element) {
        const s = items.get(this);  // obter o valor de items acessando o valor do weakmap, passando a chave this
        s.push(element);
    }

    pop() {
        const s = items.get(this);
        const r = s.pop();
        return r
    }
}


function decimalToBinary(decNumber) {
    const remStack = new Stack()
    let number = decNumber;
    let rem;
    let binaryString = '';
    while(number > 0) {
        rem = Math.floor(number %2); //Resto da divisão e fazemos o push na pilha
        remStack.push(rem);
        number = Math.floor(number / 2); //arredonda o numero decimal que sera dividido por 2
    }
    while (!remStack.isEmpty()) { //por fim depois de fazer todas as operações da uma limpada na lista 
        binaryString += remStack.pop().toString();
    }
    return binaryString
}


console.log(decimalToBinary(233)) //11101001


function baseConverter(decNumber, base) {

    const remStack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = decNumber;
    let rem;
    let baseString = '';
    if (!(base >= 2 && base <= 36)) {
        return '';
    }

    while (number > 0) {
        rem = Math.floor(number % base);
        remStack.push(rem);
        number = Math.floor(number / base);
    }

    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()];

    }
    return baseString;

}
console.log(baseConverter(100345, 2)); // 11000011111111001
console.log(baseConverter(100345, 8)); // 303771
console.log(baseConverter(100345, 16)); // 187F9
console.log(baseConverter(100345, 35)); // 2BW0