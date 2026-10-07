export class Node {
    constructor(key) {
        this.key = key; //Valor do nó
        this.left = null; // nó que é filho a esquerda
        this.right = null; // nó que é filho a direita
    }
}

export default class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn; //Comparar valores dos nós
        this.root = null; //nó raiz do tipo node
    }

    insertNode(node,key) {
        //Se a chave for menor
        if (this.compareFn(key, node.key) === this.compareFn.LESS_THAN) {
            //Se não houver valor a esquerda a nova key ficará no local
            if (node.left == null) {
                node.left = new Node(key);
            } else { // se ja houver ela descerá um nível na arvore a partir do insterNode
                this.insertNode(node.left, key);
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }

    insert(key) {
        if (this.root == null){
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key);
        }
    } 

    inOrderTraverseNode(node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key); //nó raiz
            this.inOrderTraverseNode(node.right, callback);
        }
    }

    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }

    
    //Callback, executada quando visitarmos o nó


    //Preorder, ele visita o elemento raiz, depois o elemento da esquerda e por fim o nó da direita
    preOrderTraverse(node, callback) {
        this.preOrderTraverseNode(this.root, callback)
    }

    preOrderTraverseNode(node, callback) {
        if (node != null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }

    //PostOrder, visita primeiro elemento da esquerda, depois o da direita e por ultimo o nó raiz
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }

    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    

    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(Node.key);
        }
    }

    minNode(node) {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left
        }
        return current;
    }
    min() {
        this.minNode(this.root);
    }

    maxNode(node) {
        let current = node;
        while (current != null && current.right != null) {
            current = current.right;
        }
        return current;
    }

    max() {
        return this.maxNode(this.root);
    }

    searchNode(node, key) {
        if (node == null) {
            return false;
        }
        if (this.compareFn(key, node.key) === this.compareFn.LESS_THAN) {
            return this.searchNode(node.left, key); 
        } else if ( this. compareFn(key, node.key) === this.compareFn.BIGGER_THAN) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }

    }

    search(key) {
        return this.searchNode(this.root, key); //recursão
    }

    remove(key) {
        this.root = this.removeNode(this.root);
    }

    removeNode(node, key) {
        if (node == null) {
            return null;
        }
        if (this.compareFn(key.node.key) === this.compareFn.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (this.compareFn(key, node.key) === this.compareFn.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            //Key é igual a node
            //Caso 1
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            }
            //Caso 2
            if (node.left == null) {
                node = node.right; 
                return node;
            } else if( node.right == null) {
                node = node.left;
                return node;
            }
            //Caso 3
            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(Node.right, aux.key);
            return node;
        }
    }



    
}

const tree = new BinarySeachTree();
tree.insert(11); // propriedade root apontará para ele pois só tem 1 nó


tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);

tree.insert(6); //passos que serão executados

//A arvore não esta vazia mais
// Código chamará insertNode(this.root[11], key[6])
//verificará se a nova key é menor que root e darpa true
//verificará se node.left é null o que dará false e passará para o insertNode(node.left[7], ley[6])
// o método insertNode será usado com parâmetros diferentes, verificará (key[6] < node[7]) e dará true
// verificará (node.left[5]) que ainda não é null
//passará para mais um insertNode(node.left[5], key[6]).
//verifica´ra (key[6] < node[5]) o que dará false
//verificará se node.right é null o qual não tem nenhum filho e por fim a ele inserirá o número 6 a direita como filho do nó 5

const printNode = (value) => console.log(value);
tree.inOrderTraverse(printNode);

//OS numeros exibidos serão de forma crescente do menor para o maior


//UTILIZANDO O SEARCH

console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.');
console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.');

//Value 1 not found.
//Value 8 found.

// PASSO A PASSO PARA ACHAR O 1
//                                      Valores do momento
//ele verificará a root da arvore que é node[root[11]] e verá que ele existe então não é null
//passará para a verificação se key[1] < node [11] e como é verdade que 1 é menor que 11 nós chamamos o searchCode novamente e passamos node[7] como e o comparâmos com key[1]
//Node[7] não é null e é maior que key[1] então o ciclo se repete
//node[5] não é null e é maior que key[1] então o ciclo se repete
//node[3] não é null e é maior que key[1] então o ciclo se repete
//agora key[1] e como node[3] não tem filhos o root ficará null
//como node é null e por isso será devolvido false
//chamadas de método serão desempilhadas e a execução terminará pois 1 não existe na arvore

//PASSO A PASSO PARA ACHAR O 8

//node[root[11]] não é null e é maior que key[8]
//searchCode executado novamente agora com node[7] que não é null e é menor que 8 e resultará em false, e o false fará o node agora ir para a direita em vez da esquerda
//ele sera chamado novamente node[9] que não é null e é maior que key[8]
//SearchCode novamente e ficará node[8] e key[8]
//node não é null, não é maior que 8, não é menor que 8 então o laço termina o que devolverá ture porque node[8] existe na arvore






//ARVORE AVL OU ARVORE AUTOBALANCEADA
class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }

    getNodeHeight(node) {
        if (node == null) {
            return -1
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right) + 1);

        //O valor que deve ser retornado devem ser -1 0 e 1 pois são as diferenças maximas que podem ter nos níveis das arvores

    }

    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left);
        this.getNodeHeight(Node.right);
        switch(heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }

    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }

    rotationRR(node) {
        const tmp = node.right;
        node.right - tmp.left;
        tmp.left = node;
        return tmp;
    }

    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }

    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }

    insert(key) {
        this,root = this.insertNode(this.root, key);
    }

    insertNode(node,key) {
        if (node == null) {
            return new Node(key);
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key)
        } else {
            return node;
        }

        const balanceFactor = this.getBalanceFactor(node);
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
                node = this.rotationLL(node);
            } else {
                return this.rotationLR(node);
            }
        }

        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
                node = this.rotationRR(node);
            } else {
                return this.ratationRL(node);
            }
        }
        return node;
    }

    removeNode(node, key) {
        node = super.removeNode(node, key);
        if (Node == null) {
            return node;
        }

        const balanceFactor = this.getBalanceFactor(node);
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            const BalanceFactorLeft = this.getBalanceFactor(node.left);
            if (BalanceFactorLeft === BalanceFactor.BALANCED || BalanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationLR(node.left);
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            const balanceFactorRight = this.getBalanceFactor(node.right);
            if (balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationRR(node);
            } if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationRL(node.right);
            }
        }
        return node;
    }
}





//ARVORE RUBRO NEGRA
//PARA ADIÇÕES E REMOÇÕES FREQUENTES DE INFORMAÇÕES

class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null
    }

    insert(key:T) {
        if (this.root == null) {
            this.root = new RedBlackTree(key);
            this.root.color = Colors.BLACK;
        } else {
            const newNode = this.insertNode(this.root, key);
            this.fixTreeProperties(newNode); 
        }
         
    }
}

class RedBlackTree extends Node {
    constructor(key) {
        super(key);
        this.key = key;
        this.color = Colors.RED;
        this.parent = null;
    }
    isRed() {
        return this.color === Colors.RED;
    }

    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(key);
                //referencia ao pai do inserido
                node.left.parent = node;
                return node.left;
            } else {
                return this.insertNode(node.left, key);
            }
        }
        else if (node.right == null) {
            node.right = new RedBlackNode(key);
            //refencia ao nó inserido, verificar propriedades da árvore em seguida
            node.right.parent = node;
            return node.right;
        } else {
            return this.insertNode(node.right, key);

        }

    }
    fixTreeProperties(node) {
        while (node && node.parent && node.parent.color.isRed() && node.color !== Colors.BLACK) {
            let parent = node.parent;
            const grandParent = parent.parent;
            // o pai é o filha à esquerda
            if (grandParent && grandParent.left === parent) {
                const uncle = grandParent.right;
                //o tio do nó tambpem é vermelho - basta recolorir
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                } else {
                    //CASO 2A: nó é filho da direita - rotação a esquerda
                    //CASO 3A: nó é filho da esquerda - rotação a direita
                }
            } else {
                //Caso B: pai é filho a direita
                const uncle = grandParent.left;
                // caso 1B: tio é vermelho - recolorir
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK
                    node = grandParent;
                } else {
                    // caso 2B: o nó é o filho à esquerda – rotação à direita
                    // caso 3B: o nó é o filho à direita – rotação à esquerda  
                }
            }
        }
        this.root.color = Colors.BLACK
    }
}


