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
    `<div>
        <div>
            <h2>Produto: ${nomeDigitado}</h2>
            <p>Preço: ${precoDigitado}</p>
            <p>Quantidade: ${quantidadeDigitado}</p>
        </div>
        <div>
            <button>Concluir</button>
            <button>Excluir</button>
        </div>
    </div>`
    
    listaDeCompras.appendChild(li)
    nome.value = ''
    preco.value = ''
    quantidade.value = ''
})