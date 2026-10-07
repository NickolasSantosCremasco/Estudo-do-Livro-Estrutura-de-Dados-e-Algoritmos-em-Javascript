import { easings } from "animejs";

class Graph {
    constructor (isDirected = false) {
        this.isDirected = isDirected; // verificar se o grafo é direcionado
        this.vertices = []; // Armazenar todos os vértices do grafo
        this.adjList = new Dictionary(); // Dicionário para armazenar as listas de adjacências
    }
    
    addVertex(v) {
        if (!this.vertices.includes(v)) { // recebe um vértice com parâmetro v
            this.vertices.push(v); // Adicionar o vértice na lista de vértices se ele não estiver presente no grafo
            this.adjList.set(v, []) //Inicializares a lista de adjacencias com um array vazio, valor da chave correponde a v com um array vazio
        }
    }

    addEdge(v, w) { /// 2 vertices como parâmetros
        // antes de colocarmos no grafo verificamos se eles ja estão lá
        if (!this.adjList.get(v)) { 
            this.addVertex(v); // adicionando ao grafo
        }
        if (!this.adjList.get(w)) {
            this.addVertex(w); // adicionando ao grafo
        }
        this.adjList.get(v).push(w); //aresta do vertice v para o vértice w acrescentando w a lista de adjacencias de v
        if (!this.isDirected) { // como o grafo não é direcionado então o vértice w tambem liga uma aresta ao vértice v que é adcionado a lista de adjacencias de w
            this.adjList.get(w).push(v);
        }
    }

    getVertices() {
        return this.vertices;
    }
    getAdjList() {
        return this.adjList;
    }

    toString() {
        let s = ''
        for (let i = 0; i < this.vertices.length; i++) { //Lista para representação de adjacencias, iteramos pelo array vértices
            s += `${this.vertices[i]} -> `; // acrescentamos o nome do vértice a string
            const neighbors = this.adjList.get(this.vertices[i]); // obtemos a lista de adjacencias desse vértice
            for (let j = 0; j < neighbors.length; j++) { //iteramos por ela e obtemos o nome do vértice adjacente para adiciona-lo a nossa string
                s += `${neighbors[j]}`; //nome do adjacente
            }
            s += '\n'; // depois de iterar pela lista de adjacencias quebramos a linha
        }
        return s;
    }
    
}

const graph = new Graph();
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for( let i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}

graph.addEdge('A', 'B'); // adicionando as arestas desejadas
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.toString())

// A -> B C D
// B -> A E F
// C -> A D G
// D -> A C G H
// E -> B I
// F -> B
// G -> C D
// H -> D
// I -> E

const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
}

const initializeColor = vertices => {
    const color = {};
    for (let i = 0; i < verticer.length; i++) {
        color[vertices[i]] = Colors.WHITE;
    }
    return color
}

export const breadthFirstSearch = (graph, startVertex, callback) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices); // inicializar o array color com branco
    const queue = new Queue(); // instancia queue
    queue.enqueue(startVertex); // vértice que será usado como ponto de partida
    while (!queue.isEmpty()) { // se não estiver vazia
        const u = queue.dequeue(); //  removemos um vértice da fila
        const neighbors = adjList.get(u); // acessamos a sua lista de adjacentes contento seus vizinhos
        color[u] = Colors.GREY; // marcamos o vértice como grey, ele foi descoberto mas não explorado
        for (let i = 0; i < neighbors.length; i++) { // para cada vizinho de u
            const w = neighbors[i]; // teremos seu valor (nome do vértice)
            if (color[w] === Colors.WHITE) { // caso ele não tenha sido visitado será color WHITE
                color[w] = Colors.GREY; // marcaremos como descoberto
                queue.enqueue(w); // adicionaremos esse vértice a fila para explora-lo antes que seja removido
            }
        }
        color[u] = Colors.BLACK; // depois de terminar de verificar o vértice e seus adjacentes, são marcados como explorados
        if (callback) { // parâmetro opcional, se fo passada ela será chamada
            callback(u);
        }
    }
};


const printVertex = (value) => console.log('Visited vertex: ' + value); //funcão callback que exibirá no console o nome do vértice que foi totalmente explorado
breadthFirstSearch(graph, myVertices[0], printVertex); // chama a função passando graph (exemplo usado acima), o primeiro vértice que será acessado e a funçaõ callback(printVertex)


// Visited vertex: A
// Visited vertex: B
// Visited vertex: C
// Visited vertex: D
// Visited vertex: E
// Visited vertex: F
// Visited vertex: G
// Visited vertex: H
// Visited vertex: I


const BFS = (graph, startVertex) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const queue = new Queue();
    const distances = {}; //Declarar array distances
    const predecessors = {}; //Declarar array predecessors
    queue.enqueue(startVertex);
    for (let i = 0; i < vertices.length; i++) { //para todo vértice do grafo
        distances[vertices[i]] = 0; //inicializar o array distances com 0
        predecessors[vertices[i]] = null; // inicializar o array predecessors com null
    }
    while (!queue.IsEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY;
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY;
                distances[w] = distances[u] + 1; // incrementamos a distancia entre o startVertex e w somando 1 a distância de u
                predecessors[w] = u; // Quando descobrimos o vizinho w do vértice u definimos o valor do antecessor de w e u
                queue.enqueue(w);        
            }
        }
        color[u] = Colors.BLACK
    }
    return {
        distances,
        predecessors
    };
}

const shortestPathA = BFS(graph, myVertices[0]);
console.log(shortestPathA);

// distances: [A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2, I: 3],
// predecessors: [A: null, B: "A", C: "A", D: "A", E: "B", F: "B", G: "C", H: "D",I: "E"]

const fromVertex = myVertices[0]; //Vertice A como vértice de origem
for (i = 1; i < myVertices.length; i++) { // Para todos os outros vértices(exceto o A), calcularemos o caminho até o respectivo vértice
    const toVertex = myVertices[i]; // obtemos o nome do vértice a paritr do array myVertices
    const path = new Stack(); // Criamos uma pula para armazenar os valores dos caminhos
    for (let v = toVertex; 
        v !== fromVertex; 
        v = shortestPathA.predecessors[v]) { // seguimos o caminho de toVertex para fromVertex
        path.push(v); // v recebe o valor de seu antecessor para podermos fazer o caminho de tras para frente, adicionamos a variavel v na pilha

    }
    path.push(fromVertex); //acrescentamos o vértice de origem a pilha
    let s = path.pop(); //criamos uma string s e lhe atribuimos o vértice de origem
    while (!path.isEmpty()) { // enquanto a pilha não estiver vazia 
        s += ' - ' + path.pop(); // removemos um item dela e concatenamos o valor existente na string s
    }
    console.log(s)
}

// A - B
// A - C
// A - D
// A - B - E
// A - B - F
// A - C - G
// A - D - H
// A - B - E - I

//DFS Depth-First Search

const depthFirstSearch = (graph, callback) => { // instancia Graphe Callback
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices); // inicializar cores
    for (let i = 0; i < vertices.length; i++) { // para cada vértice não visitado
        if (color[vertices[i]] === Colors.WHITE) { // todos não visitados serão white
            depthFirstSearchVisit(vertices[i], color, adjList, callback); // chamamos a função recursiva passando u sendo visitado, o array color e a função callback
        }
    }
};


const depthFirstSearchVisit = (u, color, adjList, callback) => {
    color[u] = Colors.GREY; // sempre que um vértice u for visitado ele será marcado como GREY
    if (callback) { // se houver uma função callback nós a chamaremos
        callback(u);
    }
    const neighbors = adjList.get(u); // obtemos a lista dos visidos do vértice u
    for (let i = 0; i < neighbors.length; i++) { // para cada vizinho w não visitado
        const w = neighbors[i]; // 
        if (color[w] === Colors.WHITE) { // se não for visitado
            depthFirstSearchVisit(w, color, adjList, callback); // chamamos a função passando w como vértice visitado
        }
    }
    color[u] = Colors.BLACK; //depois que os vértices adjancentes forem visitados em profundidade ele fará um backtrack (retrocesso), que significa que o vértice foi totalmente exploradozz
}


depthFirstSearch(graph, printVertex);

// Visited vertex: A
// Visited vertex: B
// Visited vertex: E
// Visited vertex: I
// Visited vertex: F
// Visited vertex: C
// Visited vertex: D
// Visited vertex: G
// Visited vertex: H




export const DFS = graph => {

    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const d = {};
    const f = {};
    const p = {};
    const time = { count: 0 }; //monitorar o instante da descoberta e o instante que terminamos a exploração
    for (let i = 0; i < vertices.length; i++) { // Devemos inicializar esses arrays ára cada vértice do grafo
        f[vertices[i]] = 0;
        d[vertices[i]] = 0;
        p[vertices[i]] = null;
    }
    for (let i = 0; i < vertices.length; i++) {
        if (color[vertices[i]] === Colors.WHITE) {
            DFSVisit(vertices[i], color, d, f, p, time, adjList);
        }
    }
    return { // devolveremos os valores para que possamos trabalhar com eles depois
        discovery: d,
        finished: f,
        predecessors: p
    };
};

const DFSVisit = (u, color, d, f, p, time, adjList) => {
    color[u] = Colors.GREY;
    d[u] = ++time.count; // quando o vértice é descoberto registramos o instante da descoberta
    const neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i];
        if (color[w] === Colors.WHITE) {
            p[w] = u; // quando ele for desoberto como uma aresta de u registramos como antecessor
            DFSVisit(w, color, d, f, p, time, adjList);
        }
    }
    color[u] = Colors.BLACK;
    f[u] = ++time.count; // quando o vértice estiver totalmente explorado registramos o instante final
};



graph = new Graph(true); //Grafo direcionado
myVertices = ['A', 'B', 'C', 'D', 'E', 'F'];
for (i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}

graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('F', 'E');
const result = DFS(graph);


const fTimes = result.finished;
s = '';
for (let count = 0; count < myVertices.length; count++) {
    let max = 0;
    let maxName = null;
    for ( i = 0; i < myVertices.length; i++) {
        if (fTimes[myVertices[i]] > max) {
            max = fTimes[myVertices[i]];
            maxName = myVertices[i];
        }
    }
    s += ' - ' + maxName;
    delete fTimes[maxName];
}
console.log(s);

// B - A - D - C - F - E

//ALGORITMO DE DIJKSTRA


var graph2 = [[0, 2, 4, 0, 0, 0],
[0, 0, 1, 4, 2, 0],
[0, 0, 0, 0, 3, 0],
[0, 0, 0, 0, 0, 2],
[0, 0, 0, 3, 0, 2],
[0, 0, 0, 0, 0, 0]];

const INF = Number.MAX_SAFE_INTEGER; //Inicializar todas as distâncias como infinitas
const dijikstra = (graph, src) => {
    const dist = []
    const visited = [] 
    const {length} = graph;
    for (let i = 0; i < length; I++) { // visited como false
        dist[i] = INF;
        visited[i] = false;
    }
    dist[src] = 0; // distância do vértice de origem a partir de si mesmo como 0
    for (let i = 0; i < length - 1; i++) { // encontramos o caminho para todos os vértices
        const u = minDistance(dist, visited); //selecionar o vértice com distância mínima a partir do conjunto de vértices que ainda não foram processados
        visited[u] = true; // marcar o vértice selecionaco como visited para não fazermos o calculo 2 vezes
        for (let v = 0; v < length; v++) {
            if (!visited[v] && dist[u] !== INF && dist[u] + graph[u][v] < dist[v]) { // Se o caminho mais curto for encontrado, 
                dist[v] = dist[u] + graph[u][v]; // definimos o valor como mais curto
            }
        }
    }
    return dist; //
}

const minDistance = (dist, visited) => {
    let min = INF;
    let minIndex = -1;
    for (let v = 0; v < dist.length; v++) {
        if (visited[v] === false && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
        }
    }
    return minIndex;
};

// 0 0
// 1 2
// 2 4
// 3 6
// 4 4
// 5 6

//ALGORITMO DE FLOY-WARSHALL

const floyWarshall = graph => {
    const dist = [];
    const { length } = graph;
    for (let i = 0; i < length; i++) { // inicializar o array de distâncias com o valor do peso de cada vértice
        dist[i] = [];
        for (let j = 0; j < length; j++) {
            if (i === j) {
                dist[i][j] = 0; // distância do vértice para si é 0
            } else if (!isFinite(graph[i][j])) {
                dist[i][j] = Infinity; // caso não haja nenhuma aresta entre os dois vértice, isso será representado com infinity
            } else {
                dist[i][j] = graph[i][j]; // distancia mínima possível entre i e j é o peso deles mesmos
            }
        }
    }
    for (let k = 0; k < length; k++) { // vértices 0...k  como pontos intermediários
        for (let i = 0; i < length; i++) {
            for (let j = 0; j< length; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) { // o caminho mais curto entre i e j é dados por k
                    dist[i][j] = dist[i][k] + dist[k][j]; // se um novo caminho mais curto for encontrado ele será armazenado
                }
            }
        }
    }
    return dist
}

// 0 2 4 6 4 6
// INF 0 2 4 2 4
// INF INF 0 6 3 5
// INF INF INF 0 INF 2
// INF INF INF 3 0 2
// INF INF INF INF INF 0

//INF siginifica que não ha nenhum caminho mais curto entre os vértice i e j


//ÁRVORE DE EXTENSÃO MÍNIMA (MST)
// - Comum no design de redes, é bom para por exemplo se fosse conectar varias ilhas por pontes pelo menos custo, é como se as ilhas fossem os vértices e as arestas o custo

//ALGORITMO DE PRIM

const INF2 = Number.MAX_SAFE_INTEGER; // Inciailizar todos os vértices em key com infinito
const prim = graph => {

    const parent = [];
    const key = [];
    const visited = []; // false
    const { length } = graph;
    for (let i = 0; i < length; i++) { 
        key[i] = INF2;
        visited[i] = false;
    }
    key[0] = 0; // definiremos a primeira key com 0 para que o vértice escolhido como primeiro
    parent[0] = -1; // porque o primeiro nó e sempre raiz e não tem parente
    for (let i = 0; i < length - 1; i++) { // para todos os vértices será encontrada a MST
        const u = minKey(graph, key, visited); // selecionamos o vértice com a key mínima a partir do conjunto de vértices que ainda não foi processado
        visited[u] = true; // marcar o vértice selecionado como visited para não fazer o calculo 2 vezes
        for (let v = 0; v < length; v++) {
            if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) { //caso o peso mínimo seja encontrado
                parent[v] = u; // armazenaremos o valor do caminho da MST
                key[v] = graph[u][v]; // definiremos o novo custo para o valor MST
            }
        }
    }
    return parent; // devolveremos o resultado contenta a MST
}

// Edge Weight
// 0 - 1 2
// 1 – 2 2
// 5 - 3 2
// 1 - 4 2
// 4 - 5 2

//Algortimo de Kruskal

const kruskal = graph => {
    const { length } = graph;
    const parent = [];
    let ne = 0;
    let a; let b; let u; let v;
    const cost = initializeCost(graph); // copiamos os valores da matriz de adjacências para o array para modifica-lo sem perder os valores originais
    while (ne < length - 1) { // Enquanto a MST tiver menos arestas que o total de arestas - 1
        for (let i = 0, min = INF; i < length; i++) { // encontra o aresta com custo mínimo
            for (let j = 0; j < length; j++) {
                if (cost[i][j] < min) {
                    min = cost[i][j];
                    a = u = i;
                    b = v = j;
                }
            }
        }
        u = find(u, parent); // evita ciclos 
        v = find(v, parent); // verifica se a aresta está em MST
        if (union(u, v, parent)) { // se as arestas u e v não forem iguais, adiciona na MST
            ne++;
        }
        cost[a][b] = cost[b][a] = INF; // Devolve MST
    }
    return parent;
};

const find = (i, parent) => {
    while (parent[i]) {
        i = parent[i];
    }
    return i;
};

const union = (i, j, parent) => {
    if (i !== j) {
        parent[j];
        return true;
    }
    return false;
   
}
    