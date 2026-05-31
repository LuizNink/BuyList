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

function criarCard(produto) {
    let li = document.createElement('li')
    
    li.innerHTML = 
    `<div class="card-lista-de-compras">
        <div>
            <h2 class="titulo-lista">Produto: ${produto.nome}</h2>
            <p class="paragrafo-lista">Preço: R$ ${produto.preco.toFixed(2)}</p>
            <p>Quantidade: ${produto.quantidade}</p>
        </div>
        <div class="botoes-card-lista">
            <button class="botao-concluir">Concluir</button> 
            <button class="botao-excluir">Excluir</button>
        </div>
    </div>`

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

        listaDeCompras.removeChild(li)
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