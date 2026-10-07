// Busca binária

//Implementação do algoritmo de dividir e conquistar

function binarySearchRecursive(
  array,
  value,
  low,
  high,
  compareFn = defaultCompare
) {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = array[mid];
    if (compareFn(element, value) === Compare.LESS_THAN) {
      // Se for menor que o valor que procuramos fazemos a função novamente
      return binarySearchRecursive(array, value, mid + 1, high, compareFn);
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
      // {se for maior que o valor que procuramos fazemos a função novamente
      return binarySearchRecursive(array, value, low, mid - 1, compareFn);
    } else {
      // caso de base
      return mid; // Se não for maior nem menor é sinal que encontramos
    }
  }
  return DOES_NOT_EXIST; // {4}
}

// Exposta ao usuário para fazer a busca
export function binarySearch(array, value, compareFn = defaultCompare) {
  const sortedArray = quickSort(array);
  const low = 0;
  const high = sortedArray.length - 1;
  return binarySearchRecursive(array, value, low, high, compareFn);
}

// PROBLEMAS PEDIDOS PELAS GRANDES EM ENTREVISTAS

//Problema do número mínimo de moedas para troco

// Consiste em descobrir a quantidade mínima de moedas para compor determinado número de centavos

function minCoinChange(coins, amount) {
  // parametro coins, o numero das moedas como 1 cent, 5 cent, 10 cent e 25 cent
  const cache = []; // para ser eficiente  e evitar recalcular materemos o cache (técnica chamada memoização)
  const makeChange = (value) => {
    // função makeChange é a função recursiva que resolverá o problema
    if (!value) {
      // Se amount não for positivo < 0 devolveremos um array vazio
      return [];
    }
    if (cache[value]) {
      // verificaremos cache. Se o resultado estiver no cache devolveremos value
      return cache[value];
    }
    let min = [];
    let newMin;
    let newAmount;
    for (let i = 0; i < coins.length; i++) {
      // para cada coin calcularemos newAmount que calculará a quantidade mínima de troco que podemos dar
      const coin = coins[i];
      newAmount = value - coin; // se new amout for um valor positivo calcularemos o resultado para ele
      if (newAmount >= 0) {
        newMin - makeChange(newAmount); //
      }
      if (
        newAmount >= 0 && // verificaremos se new amount é valido
        (newMin.length < min.length - 1 || !min.length) && //  se new min(quantidade mínima de moedas) é o melhor resultado
        (newMin.length || !newAmount) //  e se newMin e newAmount são valores válidos
      ) {
        min = [coin].concat(newMin); //
        console.log("new Min " + min + " for " + amount);
      }
    }
    return (cache[value] = min); //
  };
  return makeChange(amount); // função é chamada com o amount passado como parâmetro para a funçao minCoinChange
}

console.log(minCoinChange([1, 5, 10, 25], 36));

// new Min 1 for 1
// new Min 1,1 for 2
// new Min 1,1,1 for 3
// new Min 3 for 3
// new Min 1,3 for 4
// new Min 4 for 4
// new Min 1,4 for 5
// new Min 1,1,4 for 6
// new Min 3,3 for 6
// [3, 3]

// Problema da Mochila

// Problema de otimização combinatória. Pode ser descrito assim:

/*

1. Uma mochila tem tamanho fixo com capacidade de peso definida para carregar um conjunto de itens
capacidade de peso: w

2. conjunto de itens que tem valor e peso

3. Encontrar a melhor solução para encher a mochila com os itens mais valiosos e que o peso total não seja excedido

*/

function knapSack(capacity, weights, values, n) {
  const kS = []; // Ks[n+1][capacity+1]
  for (let i = 0; i <= n; i++) {
    // iniciaremos a matriz que será usada para encontrar solução
    kS[i] = [];
  }
  for (let i = 0; i <= n; i++) { // ignoramos a primeira coluna
    for (let w = 0; w <= capacity; w++) { //ignoramos a primeira linha 
      if (i === 0 || w === 0) { // //para que possamos trabalhar com índices diferentes de 0
        kS[i][w] = 0;
      } else if (weights[i - 1] <= w) { // iteração pelos arrays disponíveis e adicionamos e i item i só podera entrar na mochila se seu peso for menor que a limitação
          const a = values[i - 1] + kS[i - 1][w - weights[i - 1]];
          const b = kS[i - 1][w];
          kS[i][w] = a > b ? a : b; // max(a,b) se o valor for maior que a limmitação vai ignorar e usar o valor anterior, escolhemos o item com o valor máximo
      } else {
        kS[i][w] = kS[i - 1][w]; // se o item tiver peso maior que a limitação o peso sera maior que capacity e não pode ocorrer
      }
    }
  }
  findValues(n, capacity, kS, weights, values); // código adicional
  return kS[n][capacity]; // solução
}

const values = [3,4,5], weights = [2,3,4], n = values.length;

console.log(knapSack(capacity, weights, values, n)); // exibe 7


function findValues(n, capacidade, kS, weights, values) {
  let i = n;
  let k = capacity;
  console.log('Item that are part of the solution:')
  while (i > 0 && k > 0) {
    if (kS[i][k] !== kS[i - 1][k]) {
      console.log(`item ${i} can be part of solution w,v: ${weights[i - 1]} , ${values[i - 1]}`);
      i--;
      k-= kS[i][k];
    } else {
      i--;
    }
  }
}

/*

  Items that are part of the solution:
  Item 2 can be part of solution w,v: 3,4
  Item 1 can be part of solution w,v: 2,3
  Total value that can be carried: 7

*/


// MAIOR SUBSÊQUENCIA COMUM

// Consiste em encontrar o tamanho da maior subsequência em duas sequências de strings, a maior é uma que aparece na mesma ordem relativa, mas não necessariamente contígua(não é uma substring) 

function lcs(wordX, wordY) {
  const m = wordX.length;
  const n = wordY.length;
  const l = [];
  for (let i = 0; i <= m; i++) {
    l[i] = []; // solution[i] = [];
    for (let j = 0; j <= n; j++) {
      l[i][j] = 0; // solution[i][j] ='0'
    }
  }
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        l[i][j] = 0;
      } else if (wordX[i - 1] === wordY[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1; // solution[i][j] = 'diagonal';
      } else {
        const a = l[i - 1][j];
        const b = l[i][j - 1];
        l[i][j] = a > b ? a : b; // max(a,b) solution[i][j] = (l[i][j] == l[i - 1][j]) ? 'top' : 'left'
      }
    }
  }
  return l[m][n]; // printSolution(solution, wodx, m , n)
}

// (momization) Construir a solução de cima para baixo

function printSolution(solution,wordX, m, n) {
  let a = m;
  let b = n;
  let x = solution[a][b];
  let answer = '';
  while (x !== '0') {
    if (solution[a][b] === 'diagonal') {
      answer = wordX[a - 1] + answer;
      a--;
      b--;
    } else if (solution[a][b] === 'left') {
      b--;
    } else if (solution[a][b] === 'top') {
      a--;
    }
    x = solution[a][b];
  }
  console.log('lcs: ' + answer);
}

// MULTIPLICAÇÃO DE CADEIA DE MATRIZES

// Consiste em encontrar a melhor maneira de multiplicar um conjunto de matrizes

//multiplicaremos 2 matrizes m x n e B é uma matriz m x p. Resultado C, n x p.

function matrixChainOrder(p) {
  const n = p.length;
  const m = [];
  const s = [];
  for (let i = 1; i <= n; i++){
    m[i] = [];
    m[i][i] = 0
  }
  for (let l = 2; l < n; l++) {
    m[i] = [];
    m[i][i] = 0;
  }
  for (let l = 2; l < n; l++) {
    for (let i = 1; i <= (n - l) + 1; i++) {
      const j = (i + l) - 1;
      m[i][j] = Number.MAX_SAFE_INTEGER;
      for (let k = i; k <= j - 1; k++) {
        const q = m[i][k] + m[k + 1][j] + ((p[i - 1] * p[k]) * p[j]); // Linha mais importante: Calcula o número de multiplicações para uma dada ordem de parênteses e armazena o valor na matriz auxiliar m.
        if (q < m[i][j]) {
          m[i][j] = q; // adicionaremos esse código s[i][j] = k;
        }
      }
    }
  }
  return m[1][n - 1]; // chamaremos a função que exibirá os parênteses para nós
}

const p = [10, 100, 5, 50, 1];
console.log(matrixChainOrder(p));

const s = [];
for (let i = 0; i <= n; i++) {
  s[i] = [];
  for (let j = 0; j <= n; j++) {
    s[i][j] = 0;
  }
}

printOptimalParenthesis(s, 1, n-1);


function printOptimalParenthesis(S, i , j) {
  if (i === j) {
    console.log("A[" + i + "]");
  } else {
    console.log("(");
    printOptimalParenthesis(s, i, s[i][j]);
    printOptimalParenthesis(s, s[i][j] + 1, j);
    console.log(")");    
  } 
}

//ALGORITMOS GULOSOS

//Mínimo de moedas para troco

function minCoinChange(coins, amount) {
  const change = [];
  let total = 0;
  for (let i = coins.length; i >= 0; i--) { // {1}
    const coin = coins[i];
    while (total + coin <= amount) { // {2}
      change.push(coin); // {3}
      total += coin; // {4}
    }
  }
  return change;
}

console.log(minCoinChange([1, 5, 10, 25], 36));

// Problema fracionário da mochila

function knapSack(capacity, weights, values) {
  const n = values.length;
  let load = 0;
  let val = 0;
  for (let i = 0; i < n && load < capacity; i++) { // enquanto load for menor que capacity, iteramos pelos itens
    if (weights[i] <= capacity - load) { // se pudermos usar o peso total do item ele será adicionado ao valor total e atualizaremos a carga atual da mochila em load
    val += values[i];
    load += weights[i];
    } else {
      const r = (capacity - load) / weights[i]; // se não for possível user o peso total do item, calcularemos qual é a fração de (r) que podemos usar
      val += r * values[i];
      load += weights[i];
    }
  }
  return val;
}

//ALGORITMOS DE BACKTRACKING

// PROBLEMAS FAMOSOS

// RATO EM LABIRINTO

// rato começa na posição D que é o início da matriz [0][0] e deve chegar na posição [n-1][n-1] que é o destino, A posição do bloco pode estar livre (valor 1) e bloqueada (valor 0)

export function ratInAMaze(maze) {
  const solution = [];
  for (let i = 0; i < maze.length; i++) { // começaremos criando a matriz solução. Todas as posições serão 0 e para cada movimento que o rato fizer marcaremos 1
    solution[i] = [];
    for (let j = 0; j < maze[i].length; j++) {
      solution[i][j] = 0;
    }
  }
  if (findPath(maze, 0, 0, solution) === true) { // se o algoritmo for capaz de encontrar uma solução, devolverá matriz solution
    return solution;
  }
  return 'NO PATH FOUND'; //
}

function findPath(maze, x ,y, solution) {
  const n = maze.length;
  if (x === n - 1 && u === n - 1) { // verificar se o rato alcançou seu destino, se sim marcaremos a última posição como parte do caminho e devolveremos true
    solution[x][y] = 1;
    return true;
  }
  if (isSafe(maze, x, y) === true) { // se não for a última posição verificamos se é seguro o rato se mover para a próxima posição
    solution[x][y] = 1;
    if (findPath(maze, x + 1, y, solution)) { // se for seguro adicionamos movimento horizontal no maze
      return true;
    } 
    if (findPath(maze, x, y + 1, solution)) { // se o movimento horizontal não for possível moveremos verticalmente
      return true;
    }
    solution[x][y] = 0; // se não for possível nos movermos para nenhum dos lados removemos o movimento do caminho e retrocedemos
    return false;
  }
  return false; // depois que o algoritmos tentar todos os movimentos possíveis e não encotrar caminho retornará false
}

function isSafe(maze, x , y) {
  const n = maze.length;
  if (x >= 0 && y >= 0 && x < n && y < n && [x][y] !== 0 ) {
    return true; //
  }
  return false;
}

const maze = [
  [1, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 1, 0],
  [0, 1, 1, 1]
  ];
  console.log(ratInAMaze(maze));
/*

  [[1, 0, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 1]]

*/

// SOLUCIONADOR DE SUDOKU

function sudokuSolver(matrix) {
  if (solveSudoku(matrix) === true) {
    return matrix;
  }
  return 'NO SOLUTION EXISTS!';
}

const UNASSIGNED = 0;
function solveSudoku(matrix) {
  let row = 0;
  let col = 0;
  let checkBlankSpaces = false;
  for (row = 0; row < matrix.length; row++) { // primeiro passo é verificar se o quebra cabeças foi resolvido. 
    for (col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === UNASSIGNED) {
        checkBlankSpaces = true; // sairemos dos laços se houver espaços em branco ainda
        break;
      }
    }
    if (checkBlankSpaces === true) { // se houver espaços em branco sairemos dos laços
      break;
    }
  }
  if (checkBlankSpaces === false) {
    return true; // se não houver espaços em branco (posições com valor 0) quer dizer que o quebra cabeças esta completo 
  }
  for (let num = 1; num <= 9; num++) { // em seguida o algoritmo tentará colocar os números de 1 até 9 no espaço em branco
    if (isSafeSudoku(matrix, row, col, num)) { //  verificando se é seguro coloca-los lá
      matrix[row][col] = num; // se for seguro adicionamos o dígito ao quebra cabeças
      if (solveSudoku(matrix)) { // e realizamos a função solveSudoku novamente para o próximo espaço disponível
        return true;
      }
      matrix[row][col] = UNASSIGNED; // caso um dígito seja colocado numa posição incorreta marcaremos a posição como vazia e o algoritmo fará um retrocesso
    }
  }
  return false; //
}

function isSafeSudoku(matrix, row, col, num) {
  return (
    !usedInRow(matrix, row, num) &&
    !usedInCol(matrix, col, num) &&
    !usedInBox(matrix, row - (row % 3), col - (col % 3), num)
    )

}

function usedInRow(matrix, row, num) {
    for (let col = 0; col < matrix.length; col++) { // Verificamos se o dígito que queremos inserir existe na linha
      if (matrix[row][col] === num) {
        return true;
      }
    }
    return false;
  }
  function usedInCol(matrix, col, num) {
    for (let row = 0; row < matrix.length; row++) { // Verificamos se o dígito que queremos inserir existe na coluna
      if (matrix[row][col] === num) {
        return true;
      }
    }
    return false;
  }
  function usedInBox(matrix, boxStartRow, boxStartCol, num) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (matrix[row + boxStartRow][col + boxStartCol] === num) { // ver se o dígito existe no quadrado iterando por todas as posições
          return true;
        }
      }
    }
    return false;
  }

  const sudokuGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    console.log(sudokuSolver(sudokuGrid));
    /*
    Eis o resultado:
    [[5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]]

    */
    

    // PROGRAMAÇÃO FUNCIONAL

    // PROGRAMAÇÃO PASSO A PASSO DESCREVENDO EM DETALHES O QUE CADA UM FAZ

      const printArray = function(array) {
        for (var i = 0; i < array.length; i++){
          console.log(array[i]);
        }
      };
      printArray([1, 2, 3, 4, 5]);
      // Exibe todos os elementos desse array

      //programação funcional, focamos primeiro na iteração dos dados, concentrar primeiro no que é descrito e não em como faze-lo
      const forEach = function(array, action) {
        for (var i = 0; i < array.length; i++) {
          action(array[i]);
        }
      };

      // Apenas depois executaremos os logs dos itens
      const logItem = function(item) {
        console.log(item);
      }

      forEach([1,2,3,4,5], logItem)
      
      // oque ele fará:

      /*
      
        1. Descrever os dados e a transformação qe devemos aplicar nesses dados
        2. Ordem de execução do programa tem pouca importância; por outro lado os passos e sua sequência são muito importantes na programação imperativa
        3. as funções e coleções de dados são estrelas na programação funcional
        4. Usamos e abusamos de funções e da recursão na programação funcional, enquanto os laçoes, atribuições, condicionais e as funções são usadas na programação imperativa
        5. Na funcional evitamos efeitos colaterias e dados mutáveis, significa que nunca modificaremos dados passados para a função. Se precisar devolver solução com base na entrada de dados, podemos criar uma cópia e devolver a cópia modificada mas a base nunca deve ser modificada
        */


        // ES2015 + PROGRAMAÇÃO FUNCIONAL

        var findMinArray = function(array) {
          var minValue = array[0];
          for (var i = 1; i < array.length; i++) {
            if (minValue > array[i]) {
              minValue = array[i];
            }
          }
          return minValue;
        };
        console.log(findMinArray([8,6,4,5,9])); //exibe 4

        // -=-=--=-=-=-=-=-=--=-=-=-==--=--=-=-=--=-==-=-=-=-=

        // usando a ES2015
        const min_ = function(array) {
          return Math.min(...array)
        };
        console.log(min_([8,6,4,5,9])) // exibe 4

        // Utilizando funções de seta

        const min = arr => Math.min(...arr);
        console.log(min([6,6,4,5,9]));

        // Podemos reescrever o primeiro usando a sintaxe da ES2015

        const forEach2 = (array, action) => array.forEach2(item => action(item));
        const logItem2 = (item) => console.log(item);

        // CAIXA DE FERRAMENTAS DO JS

        // map - mapear uma coleção de dados e transportar para outra

        const daysOfWeek = [
          {name: 'Monday', value: 1},
          {name: 'Tuesday', value: 2},
          {name: 'Wednesday', value: 7}
        ];
        let daysOfWeekValues_ = [];
        for (let i = 0; i < daysOfWeek.length; i++) {
          daysOfWeekValues_.push(daysOfWeek[i].value);
        }

        const daysOfWeekValues = daysOfWeek.map(day => day.value);
        console.log(daysOfWeekValues_);

        // Filter - encontra valores de uma coleção

        const positiveNumbers_ = function(array) {
          let positive = [];
          for (let i = 0; i < array.length; i++) {
            if (array[i] >= 0) {
              positive.push(array[i]);
            }
          }
          return positive;
        }
        console.log(positiveNumbers_([-1,1,2,-2]))

        // Rescrever usando a funcional

        const positiveNumbers = (array) => array.filter(num => (num <= 0))
        console.log(positiveNumbers([-1,1,2,-2]));

        // função reduce, podemos reduzir uma colção a um valor específico
        const sumValues = function(array) {
          let total = array[0];
          for (let i = 1; i < array.length; i++) {
            total += array[i];
          }
          return total;
        };
        console.log(sumValues([1,2,3,4,5]));

        // rescrever tambem assim:

        const sum_ = function(array) {
          return array.reduce(function(a,b) {
            return a + b;
          });
        };
        console.log(sum_([1,2,3,4,5]));
        
        const sum = arr => arr.reduce((a, b) => a + b);
        console.log(sum([1, 2, 3, 4, 5]));

        // função para concatenar vários arrays

        const mergeArrays_ = function(arrays) {
          const count = arrays.length;
          let newArray = [];
          let k = 0;
          for (let i = 0; i < count; i++) {
            for (var j = 0; j < arrays[i].length; j++) {
              newArray[k++] = arrays[i][j];
            }
          }
          return newArray;
        };
        console.log(mergeArrays_([[1,2,3],[4,5],[6]]))
        
        // Utilizando programação fucional

        const mergeArraysConcat = function(arrays) {
          return arrays.reduce( function(p, n) {
            return p.concat(n);
          });
        };
        console.log(mergeArraysConcat([[1,2,3], [4,5], [6]]));

        const mergeArrays = (...arrays) => [].concat(...arrays);
        console.log(mergeArrays([1,2,3],[4,5],[6]));