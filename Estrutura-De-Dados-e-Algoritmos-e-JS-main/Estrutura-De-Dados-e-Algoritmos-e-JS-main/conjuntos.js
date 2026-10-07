class Set {
    constructor() {
        this.items = {};
    }

    //Esse elemento existe no conjunto

    // has(element) {
    //    return element in this.items;
    //}

    has(element) {
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }

    //o metodo in verificará na cadeia de elementos inteira para ver se existe a propriedade que procuramos enquanto o hasOwnProperty
    //Verificará tudo de uma vez


    add(element) {
        if(!this.has(element)) {
            this.items[element] = element
            return true;
        }

        return false
    }

    delete(element) {
        if (this.has(element)) {
            delete this.items[element];
            return true
        }
        return false
    }

    clear() {
        this.items = {};
    }

    //Funcionará apenas em navegadores mais potentes
    // size() {
        // return Object.keys(this.items).length; 
    // }

    sizeLegacy() {
        let count = 0
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                count++;    
            }
        }
        return count;
    }

values() {
    return Object.values(this.items);
    //retorna um array com todas as propriedades do objeto e funciona somente em navegadores modernos
}

//Para poder ser usado em qualquer navegador
    valuesLegacy() {
        let values = [];
        for(let key in this.items){
            if(this.items.hasOwnProperty(key)) {
                values.push(key);
            }
        }

        return values;

    }

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//        OPERAÇÕES COM CONJUNTOS
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    //UNIÃO
    //Conjunto União ou seja, vai criar outro Conjunto com todos os elementos dos outros 2 conjuntos anteriores
    union(otherSet) {

        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value))
        return unionSet;
    
    }

    union(otherSet) {
        const unionSet = new Set(); 
        let values = this.values(); 
        for (let i = 0; i < values.length; i++){
            unionSet.add(values[i]);
        }
        values = otherSet.values(); 
        for (let i = 0; i < values.length; i++){
            unionSet.add(values[i]);
        }
        return unionSet;
    };


    //INTERSECÇÃO
    // Pegar somente os valors que os dois tem em comum

    intersection(otherSet) {
        const intersectionSet = new Set();
        const values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet
    }

    //OU DE OUTRA FORMA MENOS CUSTOSA AO PROCESSADOR

    intersection(otherSet) {
        const intersectionSet = new Set(); 
        const values = this.values();
        const otherValues = otherSet.values();
        let biggerSet = values;
        let smallerSet = otherValues;
        if (otherValues.length - values.length > 0) {
            biggerSet = otherValues;
            smallerSet = values;
        }
        smallerSet.forEach(values => {
            if (biggerSet.includes(value)) {
                intersectionSet.add(value)
            }
        });
        return intersectionSet
    }


    difference(otherSet) {
        const differenceSet = new Set();
        this.values().forEach(value => {
            if (!otherSet.has(value)) {
                differenceSet.add(value);
            }
        });
        return differenceSet;
    }

    //SubConjunto 
    //Para todo x (elemento) qe estiver em a ele tambem deve estar em B

    inSubsetOf(otherSet) {
        if (this.sizeLegacy() > otherSet.sizeLegacy()) { //subconjunto deve ser menor que o conjunto que esta sendo comparado
            return false
        }
        let isSubset = true;
        this.values().every(value => { //executa todos os elementos mas caso um não satisfaça a condição ele cessa e termina o laço
            if(!otherSet.has(value)) {
                isSubset = false;
                return false
            }
            return true
        });
        return isSubset;
    }
}

const set = new Set();
set.add(1);

console.log(set.values()); // exibe [1]
console.log(set.has(1)); // exibe true
console.log(set.size()); // exibe 1
set.add(2);
console.log(set.values()); // exibe [1, 2]
console.log(set.has(2)); // true
console.log(set.size()); // 2
set.delete(1);
console.log(set.values()); // exibe [2]
set.delete(2);
console.log(set.values()); // exibe []

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//        OPERAÇÕES COM CONJUNTOS
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

var setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
var setB = new Set();
setB.add(3)
setB.add(4)
setB.add(5)
setB.add(6)
const unionAB = setA.union(setB);
console.log(unionAB.values())


//Resultado: [1,2,3,4,5,6]

//INTERSECTION:

var setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
var setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
const intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values());

//DIFFERENCE

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
const setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
const differenceAB = setA.difference(setB);
console.log(differenceAB.values());
//exibe [1]

//SUBCONJUNTO
const setA = new Set();
setA.add(1);
setA.add(2);
const setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);
const setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);
console.log(setA.isSubset(setB))
console.log(setA.isSubset(setC))

//SET NATIVO DA ECMA Script 

const setECMA = new Set();
set.add(1);
console.log(set.values()); //exibe @iterator
console.log(set.has(1)); //exibe true
console.log(set.size()) //exibe 1
set.delete(1);

//Simulando as operações de União

const union = (set1, set2) => {
    const unionAb = new Set();
    set1.forEach(value => unionAb.add(value));
    set2.forEach(value => unionAb.add(value));
    return unionAb;
};
console.log(union(setA, setB)); //{1, 2, 3, 4}

//Simulando as operações de intersecção

const intersection = (set1, set2) => {
    const intersectionSet = new Set();
    set1.forEach(value => {
        if (set2.has(value)) {
            intersectionSet.add(value);
        }
    });
    return intersectionSet;
};

console.log(intersection(setA, setB)); // {2, 3}


//Simulando operação de Diferença

const difference = (set1, set2) => {
    const differenceSet = new Set();
    set1.forEach(value => {
        if(!set2.has(value)) { //So queremos adicionar os elementos que contem em A e não em B
            differenceSet.add(value);
        }
    });
    return differenceSet
};
console.log(difference(setA, setB));



// União de conjuntos usando o operador de espalhamento

console.log(new Set(...setA, ...setB));

// Intersecção de conjuntos com o operador de espalhamento

console.log(new Set([...setA].filter(x => setB.has(x))));


// Diferença de conjuntos com o operador de espalhamento

console.log(new Set([...setA].filter(x => !setB.has(x))));
