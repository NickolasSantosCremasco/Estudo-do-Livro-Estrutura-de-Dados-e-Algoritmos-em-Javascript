export function defaultToString(item) {
    if (item === null) {
        return 'NULL'; 
    } else if (item === undefined) {
        return 'UNDEFINED'
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`
    }
    return item.toString();
}

class ValuePair {
    constructor(key,value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return`[#${this.key}: ${this.value}]`;
    }
}

export default class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn
        this.table = {};
    }

    hasKey(key) {
        return this.table[this.toStrFn(key)] != null
    }

    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key,value);
            return true
        }
        return false
    }

    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }

    get(key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value
    } //Custo menor de processamento

    get(key) {
        if (this.hasKey(key)) {
            return this.table[this.toStrFn(key)];
        }
        return undefined;
    }

    keyValues() {
        return Object.values(this.table);
    }

    //alternativa

    keyValues(){
        const valuePairs = []
        for (const k in this.table) {
            if (this.hasKey(k)) {
                valuePairs.push(this.table[k]);
            }
        }
        return valuePairs;
    }

    keys() {
        return this.keyValues().map(valuePair => valuePair.key);
    }

    values() {
        return this.keyValues().map(valuePair => valuePair.value);
    }

    forEach(callbackFn) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
            if (result === false) {
                break;
            }
        }
    }

    size() {
        return Object.keys(this.table).length;
        //return this.keyValues().length
    }

    isEmpty() {
        return this.size() === 0;
    }

    clear() {
        this.table = {}
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString}, ${valuePairs[i].toString()}`;
        }
        return objString
    }
    
}


const dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@gmail.com')
dictionary.set('john', 'john@gmail.com')
dictionary.set('Tyrion', 'tyrion@gmail.com')

console.log(hasKey('Gandalf')) //True

console.log(dictionary.size()); //3

console.log(dictionary.keys())
console.log(dictionary.values());
console.log(dictionary.get('Tyrion'))

//SAIDAS
//["Gandalf", "John", "Tyrion"]
//["gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"]
//tyrion@email.com

dictionary.remove('john');

console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.keyValues());
//SAIDA

//["Gandalf", "Tyrion"]
//["gandalf@email.com", "tyrion@email.com"]
//[{key: "Gandalf", value: "gandalf@email.com"}, {key: "Tyrion", value: "tyrion@email.com"}]

dictionary.forEach((k,v) => {
    console.log('forEach', `key: ${k}, value: ${v}`);
});

//SAIDA

//forEach: key: Gandalf, value: gandalf@gmail.com
//forEach: key: Tyrion, value: tyrion@gmail.com



