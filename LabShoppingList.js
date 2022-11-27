// Variaveis

// Atua no controle do input de produto
const produtoInput = document.getElementById('produtoInpt');

// Atua no controle do button de produto
const adicionarButton = document.getElementById('inptBtn');
adicionarButton.addEventListener('click', () => {
    let produto = {
        produtoNome: produtoInput.value,
        produtoValor: 0,
        jaTemValor: false
    }

    listaProdutos.push(produto);
    adicionarProdutoToListaCompras(produto.produtoNome);

})
   
// Atua no controle da lista de compras
const listaCompras = document.getElementById('listaCompras');

// Atua no controle do valor do carrinho
const valorCarrinho = document.getElementById('valorTotal')

// Listagem dos produtos. Se existir algo no localStorage com a key passada, será isso. Se nao existir nada será uma lista vazia
let listaProdutos = JSON.parse(localStorage.getItem('ProdutosSalvos')) || [];

listaProdutos.forEach((element) => {
    adicionarProdutoToListaCompras(element.produtoNome, element.jaTemValor);
})

atualizarValorCarrinho();

// Atua na adicão de produtos a lista de compras(tanto pelo input, quanto o localStorage)
function adicionarProdutoToListaCompras(nome, jaTemValor) {

    let produto = {
        produtoNome: '',
        produtoValor: 0,
        jaTemValor: false
    }

    // Atua na criação um objeto de lista
    let objetoLista = document.createElement('li');

    // Atua criando um checkbox para o objeto da lista
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.height = '25px';
    checkbox.style.width = '25px';
    

    if(jaTemValor == true){
        checkbox.disabled = true;
        checkbox.checked = true;
    }
    checkbox.addEventListener('click', () => {
        produto.produtoValor = adicionarValorAoProduto()
        atualizarValorCarrinho()

        let index = listaProdutos.findIndex((obj) => obj.produtoNome === produto.produtoNome)
        if (index > -1) {
            listaProdutos[index].produtoValor = produto.produtoValor;

            salvarListaProdutoLocalStorage(listaProdutos);
            atualizarValorCarrinho()
            listaProdutos[index].jaTemValor = true;
            checkbox.disabled = true;
        }

        salvarListaProdutoLocalStorage(listaProdutos)
    })

    // Atua na criação do nome do produto para o objeto da lista
    let nomeProduto = document.createElement('span');
    nomeProduto.innerHTML = nome;
    nomeProduto.style.display = 'flex';
    nomeProduto.style.alignItems = 'center';
    nomeProduto.style.gap = '15px';
    nomeProduto.style.fontSize = '25px';
    nomeProduto.style.height = '40px'

    produto.produtoNome = nome;

    // Atua na criação de um button para o objeto da lista
    let removerButton = document.createElement('img');
    removerButton.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Cross_icon_%28white%29.svg/1024px-Cross_icon_%28white%29.svg.png';
    removerButton.addEventListener('click', () => {
        listaCompras.removeChild(objetoLista);
        removerItemDaListaCompras(produto);
        salvarListaProdutoLocalStorage(listaProdutos)
    })

    objetoLista.append(checkbox, nomeProduto, removerButton);

    listaCompras.appendChild(objetoLista);

    salvarListaProdutoLocalStorage(listaProdutos);

    return produto;
}

// Atua salvando o objeto em localStorage
function salvarListaProdutoLocalStorage(listaProdutos) {
    localStorage.setItem('ProdutosSalvos', JSON.stringify(listaProdutos))
}

// Atua para obter o objeto do localStorage
function carregarListaProdutosLocalStorage() {
    listaProdutos = JSON.parse(localStorage.getItem('ProdutosSalvos'));
    atualizarValorCarrinho();
}

// Atua na remoção de itens da lista de compras
function removerItemDaListaCompras(objetoLista) {

    let index = listaProdutos.findIndex((obj) => obj.produtoNome === objetoLista.produtoNome)
    if (index > -1) {
        listaProdutos.splice(index, 1);
        atualizarValorCarrinho();
        salvarListaProdutoLocalStorage(listaProdutos);
    }

}

// Atua atualizando o valor do carrinho
function atualizarValorCarrinho() {
    let totalCarrinho = 0;

    listaProdutos.forEach((obj) => {
        totalCarrinho += Number(obj.produtoValor);
    })

    valorCarrinho.innerHTML = `$ ${totalCarrinho.toFixed(2)}`
}

// Atua na adição de valor ao produto
function adicionarValorAoProduto() {
    let valor = 'a';

    while (isNaN(valor) == true) {
        valor = Number(prompt('Insira o valor do produto'));
    }

    return valor;
}