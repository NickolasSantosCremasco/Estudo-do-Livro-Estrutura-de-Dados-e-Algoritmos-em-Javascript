function recursiveFunction(someParam) {
    recursiveFunction(someParam);
}
//OU

function recursiveFunction1(someParam) {
    recursiveFunction2(someParam);
}
function recursiveFunction2(someParam) {
    recursiveFunction1(someParam);
}
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- //

function understandRecursion(doIundersantRecursion) {
    const recursionAnswer = confirm('Do you understand Recursion?')
    if (recursionAnswer === true) {
        return true
    }
    understandRecursion(recursionAnswer); // chamada recursiva
}

// Calculando o fatorial


function factorialInterative(number) {
    if (number < 0) return undefined;
    let total = 1;
    for (let n = number; n > 1; n--) {
        total = total * n
    }
    return total;
}
console.log(factorialInterative(5))

//Calculando fatorial recursivamente
function factorial(n) {
    if (n === 1 || n === 0) { //caso de base
        return 1
    }
    return n * factorial(n-1); // chamada recursiva
}
console.log(factorial(5)); //120    


function factoral(n) {
    console.trace();
    //logica da função
}

//Executar testes no navegador para ver até onde ele aguenta uma função sendo executada

let i = 0;
function recursiveFn() {
    i++;
}
try {
    recursiveFn();
} catch (ex) {
    console.log('i =' + i + ' error: '+ ex);

}


//Sequencia de Fibonacci
//Fibonacci Iterativo
function fibonacciInterative(n) {
    if (n < 1) return 0;
    if (n <= 2) return 1;
    let fibNMinus2 = 0;
    let fibNMinus1 = 0;
    let fibN = n;
    for (let i = 2; i <= n; i++) { // n >= 2
        fibN = fibNMinus1 + fibNMinus2; // f(n-1) + f(n+2)
        fibNMinus1 = fibNMinus1;
        fibNMinus1 = fibN
    }
    return fibN;
}

//Fibonacci recursivo

function fibonacci(n) {
    if (n < 1) return 0;
    if (n <= 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2); //3
}

// Fibonacci com memoização

function fibonacciMemoization(n) {
    const memo = [0 , 1];
    const fibonacci = (n) => {
        if (memo[n] != null) return memo[n];
        return   memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    };
    return fibonacci;
}