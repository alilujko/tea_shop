const text = document.querySelector('#all_cost')
const add_tea = document.querySelector('.add_tea')
const linies = document.querySelector('.linies')

const cort = []
let all_cost = 0

sent_http().then( (data)=>{
    for(element in data){
        const main_div = document.createElement('div')
        const img = document.createElement('img')
        const text_tea = document.createElement('h4')
        const price = document.createElement('span')
        const btn = document.createElement('button')

        img.src = data[element]['image']
        main_div.appendChild(img)
        text_tea.textContent = data[element]["name"]
        main_div.appendChild(text_tea)
        text.id = "all_cost"

        price.textContent = data[element]["price"] + " грн"
        main_div.appendChild(price)

        btn.classList.add('tea_buy')
        btn.innerText = "Додати до кошика"
        main_div.appendChild(btn)

        main_div.classList.add('tea')
        linies.appendChild(main_div)

        const product = document.querySelectorAll('.tea')
        for (let products of product){
            const but = products.querySelector('.tea_buy')

            but.addEventListener('click', () => {
            const price = products.querySelector('span')
            all_cost += parseInt(price.innerText.split()[0])
            const name = products.querySelectorAll('h4')

            text.textContent = 'Загальна сумма:' + all_cost

            name.forEach((el) => {
                tixt = el.innerText
                cort.push(el.innerText)
            })

            alert('Добавлено в кошик ' + tixt)

    })

}  
        
    }
})

const product = document.querySelectorAll('.tea')
for (let products of product){
    const but = products.querySelector('.tea_buy')

    but.addEventListener('click', () => {
        const price = products.querySelector('span')
        all_cost += parseInt(price.innerText.split()[0])
        const name = products.querySelectorAll('h4')

        text.textContent = 'Загальна сумма:' + all_cost

        name.forEach((el) => {
            tixt = el.innerText
            cort.push(el.innerText)
        })

        alert('Добавлено в кошик ' + tixt)

    })

}  

async function sent_http(){
    const responce = await fetch("https://backend-server-tea-shop.onrender.com/get_menu", {method: 'GET', headers:{
        "ngrok-skip-browser-warning": "true"
    }})

    const data = await responce.json()

    return data

}


/* <div class="tea">
    <img src="image_menu/tea1.png" alt="" class="tea1_img">
    <h4 class="text_tea">RIOBA Суміш чаю Альпійський луг трав`яний </h4>
    <span class="tea_1_price">215 грн</span>
    <button class="tea_buy" id="tea_1_buy">Додати до кошика</button>
</div> */