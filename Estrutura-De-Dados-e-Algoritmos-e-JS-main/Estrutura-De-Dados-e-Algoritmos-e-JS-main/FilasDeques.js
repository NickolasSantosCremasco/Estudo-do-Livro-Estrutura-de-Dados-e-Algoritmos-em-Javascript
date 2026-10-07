class Queue {

    constructor () {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    enqueue(element) { //mesma função que o push
        this.items[this.count] = element
        this.count++;

    }

    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result
    }

    peek() {
        if(this.isEmpty()) {
            return undefined
        }
        return this.items[this.lowestCount];
    }

    isEmpty() {
        return this.count - this.lowestCount === 0
        // calcular a diferença de chaves count e lowestCount
    }

    size() {
        return this.count - this.lowestCount
    }

    clear() {
        this.items = {}
        this.count = 0;
        this.lowestCount = 0;
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString}, ${this.items[i]}`
        }
        return objString;
    }
}

const queue = new Queue() 
console.log(queue.isEmpty()); //exibe true

queue.enqueue('Nickolas');
queue.enqueue('Lucas');

console.log(queue.toString()) //exibe Nickolas,Lucas

queue.enqueue('Camila')

console.log(queue.toString()); //Nickolas,Lucas,Camila
console.log(queue.size()); //exibe 3
console.log(queue.isEmpty()); //exibe false
queue.dequeue(); //Remove Nickolas
queue.dequeue(); //Remove Lucas
console.log(queue.toString()); //Camila

//DEQUES 













class Deque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    addFront(element) {
        if (this.isEmpty()) {
            this.addBack(element);
        } else if ( this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        } else {
            for(let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = element
        }

    }
}


const deque = new Deque();

console.log(deque.isEmpty()); //exibe true
deque.addBack('john')
deque.addBack('Jack')
console.log(deque.toString()); // exibe John, Jack
deque.addBack('Camila');
console.log(deque.toString()) // John, Jack, Camila
console.log(deque.size()); // exibe 3
console.log(deque.isEmpty()); //exibe false
deque.removeFront(); //remove John
console.log(deque.toString()) //Jack,Camilla
deque.removeBack(); // Camila decide Sair
console.log(deque.toString()); //Jack
deque.addFront('John'); // John Retorna para pedir informação
console.log(deque.toString()); //John, Jack
/* 
addFront 
addBack
removeFront
removeBack
peekFront
peekBack
*/

function hotPotato(elementsList, num) {
    const queue= new Queue();
    const elimitatedList = [];
    for (let i = 0; i < elementsList.length; i ++) {
        queue.enqueue(elementsList[i]); 
    }
    while( queue.size() > 1) {
        for (let i = 0; i < num; i ++) {
            queue.enqueue(queue.dequeue());
        }
        elimitatedList.push(queue.dequeue());
    }
    return {
        eliminated : elimitatedList,
        winner: queue.dequeue()
    };
}


const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
const result = hotPotato(names, 7);
result.eliminated.forEach(name => {
    console.log(`${name} was eliminated from the Hot Potato Game.`);
});
console.log(`The Winner is: ${result.winner}`)

/* Verificador de palíndromo */

function palindromeChecker(aString) {
    if (aString === undefined || aString === null || (aString !== null && aString.length === 0)) {
        return false
    }
    const deque = new Deque();
    const lowerString = aString.toLocaleLowerCase().split(' ').join('');
    let isEqual = true;
    let firstChar, lastChar;
    for (let i = 0; i < lowerString.length; i++) {
        deque.addBack(lowerString.charAt(i));
    }
    while (deque.size() > 1 && isEqual) {
        firstChar = deque.removeFront();
        lastChar = deque.removeBack();
        if (firstChar !== lastChar) {
            isEqual = false;
        }
    }
    return isEqual
}

console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));

