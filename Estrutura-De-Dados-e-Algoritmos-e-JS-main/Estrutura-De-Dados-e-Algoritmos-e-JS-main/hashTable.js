import { defaultToString } from "./DicionariosHashes";

class HashTable {
    constructor(toStrFn = defaultToString) {

        this.toStrFn = toStrFn;
        this.table = {};

    }

    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
    //Ela te muitas colisões e existem formas melhores de cria-la
    hashCode(key) {
        return this.loseloseHashCode(key)
    }

    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    
    get(key) {
        const valuePair = this.table[this.hashCode(key)];
        return valuePair == null ? undefined : valuePair.value;
    }

    remove(key) {
        const hash = this.hashCode(key);
        const valuePair = this.table[hash];
        if (valuePair != null) {
            delete this.table[hash];
            return true;
        }
        return false;
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
        for (let i = 1; i < keys.length; i++) {
            objString = `${objString}, {${keys[i]} => ${this.table[keys[i]].toString()}}`;
        }
        return objString;
    }
}


const hash = new HashTable();
hash.put('Gandalf', 'gandalf@gmail.com')
hash.put('John', ' johnsnow@gmail.com')
hash.put('Tyrion', 'tyrion@gmail.com')
console.log(hash.hashCode('Gandalf') + '- Gandalf');
console.log(hashCode('John') + '- John');
console.log(hahs.hashCode('Tyrion') + '- Tyrion')


//SAIDA

//19 - Gandalf
//29 - John
// 16 - Tyrion


console.log(hash.get('Gandalf')); //gandalf@gmail.com
console.log(hash.get('Lolaine')); //undefined

hash.remove('Gandalf')
console.log(hash.get('Gandalf'))


//COMO LIDAR COM HASHS IGUAIS

const hash2 = new HashTable();
hash2.put('Ygritte', 'ygritte@email.com');
hash2.put('Jonathan', 'jonathan@email.com');
hash2.put('Jamie', 'jamie@email.com');
hash2.put('Jack', 'jack@email.com');
hash2.put('Jasmine', 'jasmine@email.com');
hash2.put('Jake', 'jake@email.com');
hash2.put('Nathan', 'nathan@email.com');
hash2.put('Athelstan', 'athelstan@email.com');
hash2.put('Sue', 'sue@email.com');
hash2.put('Aethelwulf', 'aethelwulf@email.com');
hash2.put('Sargeras', 'sargeras@email.com');

//SAIDA
// 4 - Ygritte
// 5 - Jonathan
// 5 - Jamie
// 7 - Jack
// 8 - Jasmine
// 9 - Jake
// 10 - Nathan
// 7 - Athelstan
// 5 - Sue
// 5 - Aethelwulf
// 10 - Sargeras

// {4 => [#Ygritte: ygritte@email.com]}
// {5 => [#Aethelwulf: aethelwulf@email.com]}
// {7 => [#Athelstan: athelstan@email.com]}
// {8 => [#Jasmine: jasmine@email.com]}
// {9 => [#Jake: jake@email.com]}
// {10 => [#Sargeras: sargeras@email.com]}


//  O QUE FAZER QUANDO O HASH FOR IGUAL MAS O VALOR DIFERENTE

class HashTableSeparateChaining {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    put(key, value) {
        if (key != null && value != null ) {
            const position = this.hashCode(key);
            if (this.table[position] == null) {
                this.table[position] = new LinkedList();
            }
            this.table[position].push(new ValuePair(key, value));
            return true
        }
        return false
    }

    get(key) {
        const position = thi.hashCode(key);
        const linkedList = this.table[position];
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current != null) {
                if (current.element.key === key) {
                    return current.element.value;
                }
                current = current.next;
            }

        }
        return undefined
    }

    remove(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if (LinkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current != null) {
                if (current.element.key === key) {
                    linkedList.remove(current.element);
                    if (linkedList.isEmpty()) {
                        delete this.table[position];
                    }
                    return true;
                }
                current = current.next
            }
        }
        return false

    }

}

class hashTableLinearProbing {

      //Lista HASH de sondagem linear

      put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.table[position] == null) {
                this.table[position] = new ValuePair(key, value)

            } else {
                let index = position + 1;
                while (this.table[index] != null) {
                    index++;
                }
                this.table[index] = new ValuePair(key,value);
            }
            return true;
        }
        return false;
    }

    get(key) {
        const position = this.hashCode(key);
        if (this.table[position] != null) {
            if (this.table[position].key === key) {
                return this.table[position].value;
            }
            let index = position + 1;
            while (this.table[index] != null && this.table[index].key !== key) {
                index++;
            }
            if (this.table[index] != null && this.table[index].key === key) {
                return this.table[position].value;
            }
        }
        return undefined;
    }

    remove(key) {
        const position = this.hashCode(key);
        if (this.table[position] != null) {
            if (this.table[position].key === key) {
                delete this.table[position];
                this.verifyRemoveSideEffect(key, position);
                return true;
            }
            let index = position + 1;
            while (this.table[index] != null && this.table[index].key !== key) {
                index++;
            }
        
            if (this.table[index] != null && this.table[index].key !== key) {
                delete this.table[index];
                this.verifyRemoveSideEffect(key, index);
                return true;
            }
        }
        return false
    }

    verifyRemoveSideEffect(key, removedPosition) {
        const hash = this.hashCode(key);
        let index = removedPosition + 1;
        while (this.table[index] != null) {
            const posHash = this.hashCode(this.table[index].key);
            if (posHash <= hash || posHash <= removedPosition) {
                this.table[removedPosition] = this.table[index];
                delete this.table[index];
                removedPosition = index;
            }
            index++;
        }
    }

    //Melhorando a loseloseHash

    djb2HashCode(key) {
        const tableKey = this.toStrFn(key);
        let hash = 5381;
        for (let i = 0; i < tableKey.length; i++) {
            hash = (hash * 33) + tableKey.charCodeAt(i);
        }
        return hash % 1013
    }


}


//MAP NATIVA DA ECMASCRIPT

const map = new map();
map.set('Gandalf', 'gandalf@gmail.com');
map.set('John', 'johnsnow@gmail.com');
map.set('Tyrion', 'tyrion@gmail.com');
console.log(map.has('Gandalf')); // true
console.log(map.size); // 3
console.log(map.keys()); //MapIterator {"Gandalf", "John", "Tyrion"}
console.log(map.values()); // MapIterator {"gandalf@gmail.com", "johnsnow@gmail,com", "tyrion@gmail.com"}
console.log(map.get('Tyrion')); // tyrion@gmail.com
map.delete('John');


const WeakMap = new WeakMap();
const ob1 = { name: 'Gandalf'};
const ob2 = {name: 'John'};
const ob3 = { name: 'Tyrion'};
map.set(ob1, 'gandalf@gmail.com');
map.set(ob2, 'johnsnow@gmail,com');
map.set(ob3, 'tyrion@gmail.com');
map.set(ob3, 'tyrion@gmail,com');
console.log(map.has(ob1)); // true 
console.log(map.get(ob3)); // tyrion@gmail.com
map.delete(ob2);