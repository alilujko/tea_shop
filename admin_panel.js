const btn = document.querySelector('.reg')
const login = document.querySelector('.login')
const password = document.querySelector('.kod')
const box = document.querySelector('#box')
const main_box = document.querySelector('#main-box')
const change = document.querySelector('#change')
const sumbit_new_change = document.querySelector('.sumbit-new-change')
const n_name = document.querySelector('#new_name')
const n_image = document.querySelector('#new_image')
const n_price = document.querySelector('#new_price')

sent_http().then( (data)=>{
    for(element in data){
        const main_div = document.createElement('div')
        const img = document.createElement('img')
        const text_tea = document.createElement('h4')
        const price = document.createElement('span')
        const buy_btn = document.createElement('button')

        img.src = data[element]['image']
        main_div.appendChild(img)

        text_tea.textContent = data[element]["name"]
        main_div.appendChild(text_tea)

        price.textContent = data[element]["price"] + " грн"
        main_div.appendChild(price)

        buy_btn.classList.add('tea_buy')
        buy_btn.innerText = "Змінити дані"
        
        buy_btn.addEventListener('click', () => {          
            main_box.style = 'display: none;'
            change.classList.add('change')
            change.classList.remove('change-invis')
            let but = data[element]["name"]

            sumbit_new_change.addEventListener('click', async ()=>{
                main_box.style = 'display: grid;'
                change.classList.add('change-invis')
                change.classList.remove('change')

                async function change_data(){
                    const response = await fetch('https://whisking-remark-quickly.ngrok-free.dev/change_data', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            old_name: but,
                            new_name: n_name.value,
                            new_image: n_image.value,
                            new_price: parseInt(n_price.value)
                        })

                    });

                    const data = await response.json()

                    return data

                }

                dt = await change_data()
                console.log(dt.message)

            })
        })
        
        main_div.appendChild(buy_btn)

        main_div.classList.add('tea')
        main_box.appendChild(main_div)      
    }
})

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
        main_box.classList.add('main-box')
        main_box.classList.remove('main-box-invis')
        alert('Вхід здійснено')
    }else{
        alert('Пароль або логін неправильні')
    }
})

async function sent_http(){
    const responce = await fetch("https://whisking-remark-quickly.ngrok-free.dev/get_menu", {method: 'GET', headers:{
        "ngrok-skip-browser-warning": "true"
    }})

    const data = await responce.json()

    return data

}

// sumbit_new_change.addEventListener('click', ()=>{
//     main_box.style = 'display: grid;'
//     change.classList.add('change-invis')
//     change.classList.remove('change')
// })

// 67