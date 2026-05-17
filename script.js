const nome = document.getElementById('input-nome')
const preco = document.getElementById('input-preco')
const quantidade = document.getElementById('input-quantidade')
const botaoAdiconar = document.getElementById('botao-adicionar')
const listaDeCompras = document.getElementById('lista-de-compras')

botaoAdiconar.addEventListener('click', () => {
    let nomeDigitado = nome.value
    let precoDigitado = Number(preco.value)
    let quantidadeDigitado = Number(quantidade.value)
    
    if(nomeDigitado.trim() === '') {
        return alert('Preencha o nome antes de adicionar')
    }
    if(isNaN(preco) || isNaN(quantidadeDigitado)) {
        preco.value = 0
        quantidade.value = 0
    }
    
    let li = document.createElement('li')
    
    li.innerHTML = 
    `<div id="card-lista-de-compras">
        <div>
            <h2 id="titulo-lista">Produto: ${nomeDigitado}</h2>
            <p id="paragrafo-lista">Preço: ${precoDigitado}</p>
            <p>Quantidade: ${quantidadeDigitado}</p>
        </div>
        <div id="botoes-card-lista">
            <button id="botao-concluir">Concluir</button> 
            <button id="botao-excluir">Excluir</button>
        </div>
    </div>`
    
    listaDeCompras.appendChild(li)
    nome.value = ''
    preco.value = ''
    quantidade.value = ''
})