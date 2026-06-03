const total = document.getElementById('total')
const nome = document.getElementById('input-nome')
const preco = document.getElementById('input-preco')
const quantidade = document.getElementById('input-quantidade')
const botaoAdiconar = document.getElementById('botao-adicionar')
const listaDeCompras = document.getElementById('lista-de-compras')

let totalGeral = 0
let produtos = JSON.parse(localStorage.getItem('produtos')) || []

produtos.sort((a, b) => {
    if (a.concluido && !b.concluido) return 1
    if (!a.concluido && b.concluido) return -1
    return 0
})

produtos.forEach(produto => {
    criarCard(produto)
})

produtos.forEach(produto => {
    totalGeral += produto.preco * produto.quantidade
})

total.innerText = `Total: R$ ${totalGeral.toFixed(2)}`


//CARD DA LISTA DE COMPRAS
function criarCard(produto) {
    let li = document.createElement('li')
    
    li.innerHTML = 
    `<div class="card-lista-de-compras">
        <div>
            <h2 class="titulo-lista">Produto: ${produto.nome}</h2>
            <p class="paragrafo-lista">Preço: R$ ${produto.preco.toFixed(2)}</p>
            <p class="quantidade-lista">Quantidade: ${produto.quantidade}</p>
        </div>
        <div class="botoes-card-lista">
            <button class="botao-concluir">Concluir</button> 
            <button class="botao-excluir">Excluir</button>
            <button class="botao-editar">Editar</button>
        </div>
    </div>`

    let titulo = li.querySelector('.titulo-lista')
    let paragrafoPreco = li.querySelector('.paragrafo-lista')
    let paragrafoQuantidade = li.querySelector('.quantidade-lista')

    let card = li.querySelector('.card-lista-de-compras')
    if(produto.concluido) {
        card.classList.add('concluido')
    }

    listaDeCompras.appendChild(li)

    //BOTÃO CONCLUIR
    let botaoConcluir = li.querySelector('.botao-concluir')
    botaoConcluir.addEventListener('click', () => {
        produto.concluido = !produto.concluido

        localStorage.setItem(
            'produtos',
            JSON.stringify(produtos)
        )
        
        card.classList.toggle('concluido')
        listaDeCompras.appendChild(li)
    })


    //BOTÃO EXCLUIR
    let botaoExcluir = li.querySelector('.botao-excluir')
    botaoExcluir.addEventListener('click', () => {
        produtos = produtos.filter(p => p.nome !== produto.nome)
        
        localStorage.setItem(
            'produtos',
            JSON.stringify(produtos)
        )

        totalGeral -= produto.preco * produto.quantidade
        total.innerText = `Total: R$ ${totalGeral.toFixed(2)}`

        listaDeCompras.removeChild(li)
    })


    //BOTÃO EDITAR
    let botaoEditar = li.querySelector('.botao-editar')
    botaoEditar.addEventListener('click', () => {
        let subtotalAntigo = produto.preco * produto.quantidade

        let novoNome = prompt('Novo nome:', produto.nome)
        let novoPreco = Number(prompt('Novo preço:', produto.preco))
        let novaQuantidade = Number(prompt('Nova quantidade:', produto.quantidade))

        produto.nome = novoNome
        produto.preco = novoPreco
        produto.quantidade = novaQuantidade

        localStorage.setItem(
            'produtos',
            JSON.stringify(produtos)
        )

        titulo.innerText = `Produto: ${produto.nome}`
        paragrafoPreco.innerText = `Preço: R$ ${produto.preco.toFixed(2)}`
        paragrafoQuantidade.innerText = `Quantidade: ${produto.quantidade}`

        let subtotalNovo = produto.preco * produto.quantidade
        totalGeral = totalGeral - subtotalAntigo + subtotalNovo
        total.innerText = `Total: R$ ${totalGeral.toFixed(2)}`
    })
}



botaoAdiconar.addEventListener('click', () => {
    let nomeDigitado = nome.value
    let precoDigitado = Number(preco.value)
    let quantidadeDigitado = Number(quantidade.value) || 1
    
    if(nomeDigitado.trim() === '') {
        return alert('Preencha o nome antes de adicionar')
    }
    if(isNaN(precoDigitado) || isNaN(quantidadeDigitado)) {
        preco.value = 0
        quantidade.value = 0
    }

    produtos.push({
        nome: nomeDigitado,
        preco: precoDigitado,
        quantidade: quantidadeDigitado,
        concluido: false
    })

    criarCard(produtos[produtos.length - 1])

    localStorage.setItem(
        'produtos',
        JSON.stringify(produtos)
    )

    
    //TOTAL
    if(precoDigitado && quantidadeDigitado) {
        let subtotal = precoDigitado * quantidadeDigitado
        totalGeral += subtotal
    }
    if(precoDigitado && quantidadeDigitado === 0) {
        let subtotal = precoDigitado * 1
        totalGeral += subtotal
    }

    total.innerText = `Total: R$ ${totalGeral.toFixed(2)}`

    nome.value = ''
    preco.value = ''
    quantidade.value = ''
})