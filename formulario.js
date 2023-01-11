const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')

form.addEventListener('submit', e =>{
    e.preventDefault()

    validateInputs()
})

const setError = (element, message) =>{
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.error')

    errorDisplay.innerText = message
    inputControl.classList.add('error')
    inputControl.classList.remove('success')
}

const setSuccess = element =>{
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.error')

    errorDisplay.innerText = ''
    inputControl.classList.add('success')
    inputControl.classList.remove('error')
}

const isValidEmail = email =>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

const validateInputs = ()=>{
    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()

    let fieldsValid = true

    if(usernameValue === ''){
        setError(username, 'Digite o seu nome por favor.')
        fieldsValid = false
    } else{
        setSuccess(username)
    }

    if(emailValue === ''){
        setError(email, 'Digite o seu E-mail por favor')
        fieldsValid = false
    } else if(!isValidEmail(emailValue)){
        setError(email, 'Digite um E-mail valido por favor.')
        fieldsValid = false
    }else{
        setSuccess(email)
    }

    if(passwordValue === ''){
        setError(password, 'Por favor digite sua senha')
        fieldsValid = false
    } else if(passwordValue.length < 8){
        setError(password, 'A senha deve conter pelo menos 8 caracteres.')
        fieldsValid = false
    } else{
        setSuccess(password)
    }

    if(!fieldsValid){
        return
    }
    window.location.href = '/index.html'

}

