/*let closeModal = 0
function toggle(openModal){
    let display = document.getElementById(openModal).style.display
    if(display == "none"){
        document.getElementById(openModal).style.display = "block"
    } else{
        document.getElementById(openModal).style.display ="none"
    }
}
*/

let confirmarCancelamento = 0

const formulario = document.getElementById('formulario')

let modal = document.getElementById('modal')

let openModal = () =>{
    modal.style.display = 'block'
}

function closeModal() {
    modal.style.display = 'none'
    document.getElementById('numero').value = ''
    document.getElementById('descricao').value = ''
    document.getElementById('data').value = ''
}

window.addEventListener("click", (event)=>{
    if(event.target === modal){
        closeModal()
    }
})

let tarefas = []

let pegarPosts = async () =>{
    let resposta = await fetch ("https://backend-production-4b08.up.railway.app/tarefas")
    let tarefas = await resposta.json()
    let conteudo = document.getElementById('conteudo')
    conteudo.innerHTML= ''

    tarefas.forEach((tarefa) => {
        
        conteudo.innerHTML = conteudo. innerHTML +` <tr>
        <th scope="row">${tarefa.numero}</th>
        <td>${tarefa.descricao}</td>
        <td>${tarefa.data.split('-').reverse().join('/')}</td>
        <td class="${tarefa.status}">${tarefa.status}</td>
        <td class="d-flex">
            <div onclick="editarQuestao(${tarefa.id})"><img class="icon" src="pencil.png"></div>
            <div onclick="abrirModalDois(${tarefa.id})"><img class="icon" src="delete.png"></div>
        </td>
    </tr>`
    })
}


let adicionaTarefa = async (tarefa) =>{
    await fetch("https://backend-production-4b08.up.railway.app/tarefas",{
        method: "POST",
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "numero": tarefa.numero,
            "descricao": tarefa.descricao,
            "data": tarefa.data,
            "status": tarefa.status
        })
    }); 
}

let callPut = async function(tarefa){
    await fetch(`https://backend-production-4b08.up.railway.app/tarefas/${operacaoCorrente.id}`,{
        method: "PUT",
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "numero": tarefa.numero,
            "descricao": tarefa.descricao,
            "data": tarefa.data,
            "status": tarefa.status
        })
    }); 
    operacaoCorrente = null
}

formulario.addEventListener('submit', async (event)=>{
    event.preventDefault()

    let editando = Boolean(operacaoCorrente) 
    let numero = formulario.elements['numero'].value
    let descricao = formulario.elements['descricao'].value
    let data = formulario.elements['data'].value

    let status = formulario.elements['opcoes'].value

// validando campos

    if(!numero.trim() || !numero){
        mostrarErro(formulario.elements['numero'],'Campo número está vazio')
        return 
    } else if(numero){
        mostrarSucesso(formulario.elements['numero'])
    }

    if(!descricao.trim() || !descricao){
        mostrarErro(formulario.elements['descricao'],'Por favor, descreva a atividade')
        return 
    } else if(numero){
        mostrarSucesso(formulario.elements['descricao'])
    }

    if(!data.trim() || !data){
        mostrarErro(formulario.elements['data'],'Por favor, escolha uma data')
        return 
    } else if(numero){
        mostrarSucesso(formulario.elements['data'])
    }

    if(!opcoes){
        mostrarErro(formulario.elements['opcoes'],'Escolha um status')
        return 
    }

    const tarefa = {
        numero,
        descricao,
        data,
        status
    }

    editando ? await callPut(tarefa): await adicionaTarefa(tarefa)

    closeModal()
    await pegarPosts()
})

const limparCampos = () => {
    document.getElementById('numero').value = ''
    document.getElementById('descricao').value = ''
    document.getElementById('data').value = ''
}

const deletarQuestao = async () => {
    await fetch(`https://backend-production-4b08.up.railway.app/tarefas/${confirmarCancelamento}`,{
        method: 'DELETE'
    })
    pegarPosts()
    confirmarCancelamento = 0
}

// pegando tarefa para editar

let  operacaoCorrente = null

const editarQuestao = async (id) =>{
    operacaoCorrente = await getTarefa(id)

    document.getElementById('numero').value = operacaoCorrente.numero

    document.getElementById('descricao').value = operacaoCorrente.descricao

    document.getElementById('data').value = operacaoCorrente.data

    document.getElementById('opcoes').value = operacaoCorrente.status

    openModal()
}

let getTarefa = async (id) => {
    let response = await fetch(`https://backend-production-4b08.up.railway.app/tarefas/${id}`)
    let tarefa = await response.json()
    return tarefa
}

// DARK MODE
const body = document.querySelector('body')
const trocaCor = document.getElementById('trocaCor')

trocaCor.onclick = function(){
    trocaCor.classList.toggle('active')
    body.classList.toggle('active')
}

// validação

function mostrarMensagem(input, message, type){
    const mensagem = input.parentNode.querySelector('small')
    mensagem.innerText = message
    if(type){
        input.style.borderColor = 'green'
    } else {
        input.style.borderColor = 'red'
    }
}

function mostrarErro(input, message){
    return mostrarMensagem(input, message, false)
}

function mostrarSucesso(input){
    return mostrarMensagem(input, '', true)
}

function preenchido(input, message){
    if(input.value === ''){
        return mostrarErro(input, message)
    }
    return mostrarSucesso(input)
}

function alterarData(data){
    let dataTarefa = new Date(data.split('-'))/* .join('/')) */;
    return dataTarefa.toLocaleDateString('pt-BR');

}
 
function abrirModalDois(id){
    modalDois.style.display = 'block'
    confirmarCancelamento = id
}

function fecharModalDelete(){
    modalDois.style.display = 'none'
}
