import {defaultEquals} from '..util';
import {Node} from '.models/linked-list-models';
export default class linkedList {
    constructor (equalsFn = defaultEquals) {
        this.count = 0;
        this.head = undefined; // referencia para o primeiro elemento
        this.equalsFn = this.equalsFn;
    }
}

export function defaultEquals(a,b) {
    return a === b
}

export class Node {
    constructor(element) { //representa o que queremos adicionar na lista
        this.element = element;
        this.next = undefined; // ponteiro que faz ligação para o próximo nó

    }
}

class LinkedList extends Node {
      //INSERINDO ELEMENTOS NO FIM DE UMA LISTA LIGADA

      push(element) {
        const node = new Node(element);
        let current;
        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next != null) { // obtem o ultimo item
                current = current.next;
            }
            //atribui o novo elemento a next para criar a ligação
            current.next = node;
        }
        this.count++;
    }

    //pg148
    //Remover um elemento específico
    removeAt(index) { // index === posição que sera removida
        //verifica valores fora do intervalo
        if(index >= 0 && index < this.count) {
            let current = this.head;
            //remove o primeiro
            if(index === 0) {
                this.head = current.next
            } else {

                let previous;
                for (let i = 0; i < index; i++) {
                    previous = current;
                    current = current.next;
                }
                //Faz ligação de previous com next de current: pula esse elemento para removê-lo
                previous.next = current.next

            }
            this.count--;
            return current.element;
        }
        return undefined
    }

    //Percorrer até um elemento desejado

    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (let i = 0 ; i < index && node != null; i++) {
                node = node.next
            }
            return node;
        }
        return undefined
    }

      //Inserir um elemento em qualquer posição

      insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if(index === 0 ) {
                const current = this.head;
                node.next = current
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1);
                const current = previous.next;
                node.next = current;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false
    }

    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) { //função criada mais acima equalFn
                return i
            }
            current = current.next;
        }
        return -1
    }

    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    size() {
        return this.count;
    }

    isEmpty() {
        return this.size() === 0;
    }
        
    getHead() {
        return this.head;
    }

    toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString}, ${current.element}`;
            current = current.next;
        }
        return objString;
    }

}
const list = new linkedList();
list.push(15);
list.Push(10);







//LISTA DUPLAMENTE LIGADA

class DoublyNode extends Node {
    constructor (element, next, prev) {

        super(element,next);
        this.prev = prev;

    }
}

class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn)
        this.tail = undefined;
    }

    insert(element, index) {
        if( index >= 0 && index <= this.count) {
            const node = new DoublyNode(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null ) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    current.prev = node;
                    this.head = node;
                }
            } else if (index == this.count) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;

            }else {
                const previous = this.getElementAt(index -1);
                current = previous.next
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }
        return false

    }

    //Removendo de qualquer posição
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
                // Se tiver apenas um item atualizamos o tail
                if (this.count == 1) {
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined;
                }
            } else if (index === this.count - 1) {

                current = this.tail;
                this.tail = current.prev
                this.tail.next = undefined

            } else {
                current = this.getElementAt(index);
                const previous = current.prev;
                // liga previous com o next current - pula esse elemento para remove-lo
                previous.next = current.next;
                current.next.prev = previous
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}

//LISTA CIRCULAR, O HEAD OLHA PARA O TAIL E TAIL AGORA É LIGADO COM HEAD


class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
    }

    insert(element,index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            let current = this.head;
            if(index === 0) {
                if (this.head == null) {
                    this.head = node;
                    node.next = this.head;
                } else {
                    node.next = current;
                    current = this.getElementAt(this.size());
                    //atualiza o ultimo elemento
                    this.head = node;
                    current.next = this.head
                }
            } else { //sem alterações
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.count++;
            return true
        }
        return false
    }

    removeAt(index) {
        if (index >= 0 && index < this.count ) {
            let current = this.head;
            if (index === 0 ) {
                if (this.size() === 1) {
                    this.head = undefined
                } else {
                    const removed = this.head;
                    current = this.getElementAt(this.size());
                    this.head = this.head.next;
                    current.next = this.head;
                    current = removed;
                }
            } else {
                //Não ha necessidade de atualizar o ultimo elemento da lista circular
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined
    }
}

//LISTAS LIGADAS E ORDENADAS, ORDEM NUMÉRICA

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};
function defaultCompare(a,b) {
    if (a === b) {
        return 0
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
        super(equalsFn);
        this.compareFn = compareFn
    }

    insert (element, index = 0) {
        if (this.isEmpty()) {
            return super.insert(element, 0);
        }
        const pos = this.getIndexNextSortedElement(element);
        return super.insert(element, pos);

    }
    getIndexNextSortedElement(element) {
        let current = this.head;
        let i = 0
        for(; i < this.size() && current; i++) {
            const comp = this.compareFn(element, current.element);
            if(comp === Compare.LESS_THAN) {
                return i;
            }
            current = current.next
        }
        return i;
    }

}

class StackLinkedList {
    constructor(){
        this.items = new DoublyLinkedList();
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items.removeAt(this.size())
    }

    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.getElementAt(this.size() - 1).element;
    }
    isEmpty() {
        return this.items.isEmpty();
    }
    size() {
        return this.items.size();
    }
    clear() {
        this.items.clear();
    }
    toString() {
        return this.items.toString();
    }
}























