function increment(num) {
    return ++num;
}

// Se executarmos essa função teremos um tempo de execução igual a x, se colocarmos um parâmetro igual a 2 o tempo de execução será o mesmo. Não importa o parâmetro, podemos dizer que a função é constante com complexidade O(1)

//------------------------------------------------------//

function sequentialSearch(array, value, equalsFn = defaultEquals) {
    for (let i = 0; i < array.length; i++) {
        if (equalsFn(value, array[i])) {
            return i;
        }
    }
    return -1
}

// a função terá um custo de acordo com o tempo de procura, se procurarmos no array que tem os números de 1 até 10 o número 1 executaremos a função apenas uma vez, se procurarmos o número 11 executaremos a função 10 vezes mais do que a primeira execução e devolveremos -1 no final, ou seja, a complexidade dessa função é O(n) em que n é o tamanho da entrada


//------------------------------------------------------//

function bubbleSort(array, compareFn = defaultCompare) {
    const { length } = array;
    let cost = 0
    for (let i = 0; i < length; i++) { // cada laço tem custo de igual a 1 de operação
        cost++
        for (let j = 0; j < length - 1; j++) {
            cost++
            if (compareFn(array[j], array[j + 1]) === compareFn.BIGGER_THAN) {
                swap(array, j, j + 1);
            }
        }
    }
    console.log(`cost for bubbleSort with input size ${length} is ${cost}`);
    return array
}

// ela terá custo O(n²) devido aos laços colocados, se ela tem tamnho 10 o cost será igual a 100