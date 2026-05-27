const total = document.getElementById('total')
const nome = document.getElementById('input-nome')
const preco = document.getElementById('input-preco')
const quantidade = document.getElementById('input-quantidade')
const botaoAdiconar = document.getElementById('botao-adicionar')
const listaDeCompras = document.getElementById('lista-de-compras')

let totalGeral = 0

botaoAdiconar.addEventListener('click', () => {
    let nomeDigitado = nome.value
    let precoDigitado = Number(preco.value)
    let quantidadeDigitado = Number(quantidade.value)
    
    if(nomeDigitado.trim() === '') {
        return alert('Preencha o nome antes de adicionar')
    }
    if(isNaN(precoDigitado) || isNaN(quantidadeDigitado)) {
        preco.value = 0
        quantidade.value = 0
    }
    
    let li = document.createElement('li')
    
    li.innerHTML = 
    `<div id="card-lista-de-compras">
        <div>
            <h2 id="titulo-lista">Produto: ${nomeDigitado}</h2>
            <p id="paragrafo-lista">Preço: R$ ${precoDigitado.toFixed(2)}</p>
            <p>Quantidade: ${quantidadeDigitado}</p>
        </div>
        <div id="botoes-card-lista">
            <button class="botao-concluir">Concluir</button> 
            <button class="botao-excluir">Excluir</button>
        </div>
    </div>`
    
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

    listaDeCompras.appendChild(li)
    nome.value = ''
    preco.value = ''
    quantidade.value = ''


    //BOTÃO CONCLUIR
    let botaoConcluir = li.querySelector('.botao-concluir')
    botaoConcluir.addEventListener('click', () => {
        listaDeCompras.appendChild(li)
    })


    //BOTÃO EXCLUIR
    let botaoExcluir = li.querySelector('.botao-excluir')
    botaoExcluir.addEventListener('click', () => {
        listaDeCompras.removeChild(li)
    })
})