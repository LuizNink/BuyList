const nome = document.getElementById('input-nome')
const preco = document.getElementById('input-preco')
const quantidade = document.getElementById('input-quantidade')
const botaoAdiconar = document.getElementById('botao-adicionar')
const listaDeCompras = document.getElementById('lista-de-compras')

botaoAdiconar.addEventListener('click', () => {
    let li = document.createElement('li')
    let nomeDigitado = nome.value

    li.innerHTML = nomeDigitado
    
    listaDeCompras.appendChild(li)
})