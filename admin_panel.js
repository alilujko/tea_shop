const btn = document.querySelector('.reg')
const login = document.querySelector('.login')
const password = document.querySelector('.kod')
const box = document.querySelector('.box')

async function reg(){
    login_read = login.value
    password_read = password.value

    const response = await fetch('https://whisking-remark-quickly.ngrok-free.dev/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login_read,
            password: password_read
        })

    });

    const data = await response.json()

    return data

}

btn.addEventListener('click', async ()=>{
    let sign = await reg()

    if(sign.message == "true"){
        box.classList.add("yes_reg")
        box.classList.remove("box")
        alert('Вхід здійснено')
    }else{
        alert('Пароль або логін неправильні')
    }
})