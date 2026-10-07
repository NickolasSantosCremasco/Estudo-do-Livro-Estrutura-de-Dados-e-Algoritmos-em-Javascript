function defaultCompare(a, b) {
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function swap(array, a, b) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
  [array[a], array[b]] = [array[b], array[a]];
}

//BubbleSort

function BubbleSort(array, compareFn = defaultCompare) {
  //Escrever a variável com apenas chaves serve para pegar apenas o parâmetro desejado, como queremos length então { length } só dara o tamanho em index e não os valores
  const { length } = array; // Declarar uma variável chamada length, armazenará o tamanho do array
  for (let i = 0; i < length; i++) {
    //Laço externo, iterará pelo array
    for (let j = 0; j < length - 1; j++) {
      //Laço interno fara uma iterção a paritr da primeira posição até o ultimo valor
      if (compareFn(array[j], array[j + 1]) === compareFn.BIGGER_THAN) {
        // e compararemos o valor atual com o próximo, se o valor atual for maior que o proximo faremos sua troca
        swap(array, j, j + 1); // Valor j+1 será transferido para j e vice versa
      }
    }
  }
  return array;
}

function createNonSortedArray(size) {
  // funçao que criará automaticamente um array não ordenado
  //Se 5 for passado como array voltará [5,4,3,2,1]
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }
  return array;
}
let array = createNonSortedArray(5); // tudo que temos que fazer é chamar a função e armazenar o retorno em uma variável
console.log(array.join()); // para garantir que temos um array não ordenado exibimos no console
array = BubbleSort(array); // chamaremos a função
console.log(array.join()); //exibiremos o conteúdo ordenado no console novamente

//BubbleSort MELHORADO
function modifiedBubbleSort(array, compareFn = defaultCompare) {
  const { length } = array;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      // subtraimos do laço interno o número de passagens do laço externo
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1);
      }
    }
  }
  return array;
}
//Complexidade O(n²)
//Não compararemos os números que ja estão nos lugares corretos.

//SELECTION SORT
function selectionSort(array, compareFn = defaultCompare) {
  const { length } = array; // declaramos algumas variáveis que serão usadas no algoritmo
  let indexMin;
  for (let i = 0; i < length - 1; i++) {
    // laço externo que fará iteração pelo array, qual é o proximo valor mínimo que devemos encontrar
    indexMin = i; //pressupomos que o primeiro valor é o valor mínimo
    for (let j = i; j < length; j++) {
      // partindo de i até o final do array
      if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        // comparamos se o valor na posição j é menor que o atual
        indexMin = j; // se sim então trocamos
      }
    }
    if (i !== indexMin) {
      // faremos a troca desses valores
      swap(array, i, indexMin);
    }
  }
  return array;
}

let Array = createNonSortedArray(5);
console.log(Array.join());
array = selectionSort(array);
console.log(Array.join());

//Complexidade O(n²)

//INSERTION SORT

function insertionSort(array, compareFn = defaultCompare) {
  const { length } = array; // declarar as variáveis que usaremos no código-fonte
  let temp; //variavel temporaria
  for (let i = 1; i < length; i++) {
    // iteramos pelo array até descobrir o lugar correto para o valor de i, começamos pelo indice 1 em vez do indice 0
    let j = i; // valor de i a uma variavel auxiliar
    temp = array[i]; // e em uma variavel temporária
    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      // enquanto a variavel j for maior que 0 que é o indice e o valor for maior que o valor com qual estamos comparando
      array[j] = array[j - 1]; // deslocaremos o valor anterios para a posição atual
      j--; //decrementamos o valor de j
    }
    array[j] = temp; // inserimos o valor na posição correta
  }
  return array;
}

//Complexidade O(nLOGn)
//MERGE SORT

function mergeSort(array, compareFn = defaultCompare) {
  if (array.length > 1) {
    // transformará um array maior em arrays menores
    const { length } = array;
    const middle = Math.floor(length / 2); // o array será dividido em arrays menores por isso devems achar primeiro o meio do array
    const left = mergeSort(array.slice(0, middle), compareFn); //dividiremos em arrays menores que serão cahamados de left, elementos do indice 0 até o meio
    const right = mergeSort(array.slice(middle, length), compareFn); // e right, composto do indice do meio até o final
    //essas linhas chamarão a propria função ate que elas mesmas tenha se dividido por completo
    array = merge(left, right, compareFn); // chamar a função merge que será responsável por ordenar os arrays menores e combina-los em arrays maiores
  }
  return array;
}

function merge(left, right, compareFn) {
  let i = 0; // criar um array que será utilizado para combinação
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    result.push(
      compareFn(left[i], right[j]) === Compare.LESS_THAN
        ? left[i++]
        : right[j++]
    ); // declaramos duas variaveis que serão usadas para iterar pelos 2 arrays, enquanto for possível iterar comparamos o alor de left se é menor que o right. Se for adicionamos o valor do left no result e incrementamos a variável usada pelo array, se não adicionamos right
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j)); //adicionamos todos os valores restantes do array com os resultados combinados e fazemos o mesmo com os valores retantes de right
}

//QUICK SORT
//Metodo que chamara uma função recursiva
function quickSort(array, compareFn = defaultCompare) {
  return quickSort(array, 0, array.length - 1, compareFn);
}

function quick(array, left, right, compareFn) {
  let index; // variável index que ajudará a separar o subarray em valores menores e maiores para chamar de função quick recursivamente
  if (array.length > 1) {
    // se o array for maior que 1 (array com 1 elemento ja esta ordenado)
    index = partition(array, left, right, compareFn); // valor do index será a obtido a partir de função partition que será executada
    if (left < index - 1) {
      //  se houver um subarray com elementos menores
      quick(array, left, index - 1, compareFn); // repartiremos o processo para esse subarray
    }
    if (index < right) {
      // faremos o mesmo para o subarray com valores maiores
      quick(array, index, right, compareFn); // repetiremos o processo do quick sort
    }
  }
  return array;
}

function partition(array, left, right, compareFn) {
  const pivot = array[Math.floor((right + left) / 2)]; // selecionamos o item do meio do array
  let i = left; // inicializamos 2 ponteiros, left
  let j = right; // e right
  while (i <= j) {
    // enquanto os ponteiros não se cruzarem iniciaremos a operação
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      // deslocaremos o ponteiro left até encontrar algum elemento que seja maior que pivot.
      i++;
    }
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      // Faremos o mesmo com o ponteiro Right, ele se deslocará até encontrarmos um elemento menor que pivot
      j--;
    }
    if (i <= j) {
      // quando o ponteiro left for maior que pivot e o ponteiro right for menor que pivot, comparemos se o índice left é maior que o indice do right
      swap(array, i, j); // o valor a esquerda é maior que o valor à direita. trocaremos esses valores
      i++;
      j--;
    }
  }
  return i; //  devolvemos o índice do ponteiro esquerdo, que será usado para criar subarrays
}

function countingSort(array) {
  if (array.length < 2) {
    // Se o array tiver nenhum ou apenas um elemento não precisa de ordenação
    return array;
  }
  const maxValue = findMaxValue(array); // temos de encontrar o valor máximo do array, basta iterar por ele e localizar
  const counts = new Array(maxValue + 1); // precisamos criar um array de contadores começando do indice 0 até o valor máximo + 1
  array.forEach((element) => {
    if (!counts[element]) {
      // se o array não foi inicializado com 0 na primeira vez atribuimos o valor zero para ele
      counts[element] = 0;
    }
    counts[element]++; // iteramos no array e incrementamos o contador do elemento counts
  });
  let sortedIndex = 0;
  counts.forEach((count, i) => {
    while (count > 0) {
      // como pode haver mais de um elemento com o mesmo valor
      array[sortedIndex++] = i; // ele será adicionado quantas vezes ele aparecer no array original
      count--; // decrementamos count até que o valor seja 0
    }
  });
  return array;
}

function findMaxValue(array) {
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}

//BUCKET SORT

function bucketSort(array, bucketSize = 5) {
  // especificar quantos buckets serão usados para ordenar os elementos, por padrão serão usados 5, se os elementos estiverem muito esparsados é melhor utilizar mais buckets mas se exitiverem mais densos é melhor utilizar poucos por isso ele é passado como parâmetro
  if (array.length < 2) {
    return array;
  }
  const buckets = createBuckets(array, bucketSize); // Primeira parte consiste em criar buckets e distribuir os elementos nos diferentes buckets
  return sortBuckets(buckets); //inserimos o algoritmo de insertion sort em cada bucket e adicionamos todos os elementos do bucket no array ordenado resultante
}

function createBuckets(array, bucketSize) {
  let minValue = array[0];
  let maxValue = array[0];
  for (let i = 1; i < array.length; i++) {
    //  calcular a diferença entre os valores menores e maiores do array, dividido pelo tamanho do bucket. Também temos de iterar pelo array original e encontrar os valores de maximo e mínimo
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1; // Calcular quantos elementos serão distribuídos em cada bucket
  const buckets = []; //  Depois de calcular bucketCount devemos inicializar cada bucket
  for (let i = 0; i < bucketCount; i++) {
    // inserir o elemento no bucket correto, cada posição da variável buckets armazenará outro array.
    buckets[i] = [];
  }

  for (let i = 0; i < array.length; i++) {
    // Distribuir os elementos nos buckets. Iterar pelos elementos do array e calcular em qual colocaremos o elemento
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize); // inserir o elemento no bucket correto
    buckets[bucketIndex].push(array[i]);
  }
  return buckets;
}

function sortBuckets(buckets) {
  const sortedArray = []; // cria um array que armazenará o array ordenado resultante
  for (let i = 0; i < buckets.length; i++) {
    // Iteramos pelo array original
    if (buckets[i] !== null) {
      insertionSort(buckets[i]); //  Conforme o cenário poderiamos aplicar outros algoritmos de ordenação
      sortedArray.push(...buckets[i]); // por fim adicionamos todos os elementos do bucket ordenado para o array ordenado
    }
  }
  return sortedArray;
}

// RADIX SORT

function radixSort(array, radixBase = 10) {
    if (array.length) {
        return array;
    }
    const minValue = findMinValue(array);
    const maxValue = findMaxValue(array);
    let significantDigit = 1; // Começaremos ordenando os números pelo seu último dígito
    while ((maxValue - minValue) / significantDigit >=1) { // enquanto houver digitos significativos para ordenar, se houver apenas valores de 1 até 9 o laço só será executado 1 vez, se houver valores até 99 o laço será executado 2 vezes
        array = countingSortForRadix(array, radixBase, significantDigit, minValue); //
        significantDigit *= radixBase; // faremos a interação com base no último dígito significativo, na proxima iteração será com base no segundo digito significativo as dezenas, depois nos 3 digitos significativos 
    }
    return array;
}

function countingSortForRadix(array, radixBase, significantDigit, minValue) {
    let bucketsIndex;
    const buckets = [];
    const aux = [];
    for (let i = 0; i < radixBase; i++) { // inicializamos buckets de acordo com a base da raiz. Como são números de base 10 trabalharemos com 10 buckets
        buckets[i] = 0;
    }
    for (let i = 0; i < radixBase; i++) { // no array faremos:
        bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase); // com base no dígito significativo dos números
        buckets[bucketsIndex]++; // uma Ordenação por contagem
    }
    for (let i = 1; i < radixBase; i++) { // Como estamos executando um couting sort devemos calcular os contadores para que tenhamos a contagem correta
        buckets[i] += buckets[i - 1];
    }
    for (let i = array.length - 1; i >= 0; i--) { // Depois de contar os valores os moveremos para o array original
        bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase); // obteremos novamente o dígito significiativo
        aux[--buckets[bucketsIndex]] = array[i]; // moveremos seu valor para o array aux subtraindo o contador do array buckets
    }
    for (let i = 0; i < array.length; i++) { // (opcional) transferimos o array aux para o array original para retorna-lo mas poderia apenas retornar o array opcional 
        array[i] = aux[i];
    }
    return array;
}

//BUSCA SEQUENCIAL


const DOES_NOT_EXIST = -1;
function sequentialSearch(array, value, equalsFn = defaultEquals) {
    for (let i = 0; i < array.length; i++) { // Busca sequencial pelo array
        if (equalsFn(value, array[i])) { // compara cada valor com o value que procuramos
            return i; // se for encontrado devolvemos alguma coisa para sinalizar isso
        }
    }
    return DOES_NOT_EXIST; // se não for encontrado devolvemos -1
}

//BUSCA BINÁRIA

function binarySearch(array, value, compareFn = defaultCompare) {
    const sortedArray = quickSort(array); // Devemos ordenar o array, Podemos usar qualquer algoritmo
    let low = 0; // Depois que o array for ordenado definimos os ponteiros low 
    let high = sortedArray.length - 1; // e o ponteiro high que serão fronteiras
    while (lesserOrEquals(low, high, compareFn)) { // Enquanto low for menor que high, enquanto/se low for maior que high, é sinal que o valor não existe então devolveremos -1
        const mid = Math.floor((low + high) / 2); // encontraremos o índice do meio
        const element = sortedArray[mid]; // assim teremos seu valor
            if (compareFn(element, value) === Compare.LESS_THAN) { // começaremos a comparar se o valor selecionado é menor que value
                low = mid + 1; // devemos verificar valor maiores
            } else if (compareFn(element, value) === Compare.BIGGER_THAN) { // Se o valor for maior que o value
                high = mid - 1; // devemos procurar valores menores
            } else {
                return mid; // se não o valor é igual ao value e devolveremos seu índice
            }
        }
    return DOES_NOT_EXIST; // low não existe devolveremos -1
}

function lesserOrEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

// BUSCA POR INTERPOLAÇÃO

function interpolationSearch(array, value, compareFn = defaultCompare, equalsFn = defaultEquals, diffFn = defaultDiff) {
    const { length } = array;
    let low = 0;
    let high = length - 1;
    let position = -1;
    let delta = -1;
    while ( low <= high && biggerOrEquals(value, array[low], compareFn) && lesserOrEquals(value, array[high], compareFn)) {
        delta = diffFn(value, array[low]) / diffFn(array[high], array[low]); // Delta será baixo se as instâncias estiverem bem distribuidas
        position = low + Math.floor((high - low) * delta); // calcular position com o valor que será comparado, a ideia é encontrar o valor mais proximo a position
        if (equalsFn(array[position], value)) { // Se value for encontrado devolveremos o índice
            return position;
        }
        if (compareFn(array[position], value) === Compare.LESS_THAN) { //Se não se o valor for menor que value repetiremos a lógica usando o subarray a direita
            low = position + 1;
        } else { 
            high = position - 1;
        }
    }
    return DOES_NOT_EXIST;
}

function lessserEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}
function biggerEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}

// ALGORITMOS DE EMBARALHAMENTO

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i++) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    swap(array, i, randomIndex);
  }
  return array;
}
