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

let currentOldName = null
const cards = {}

function productImage(src) {
    if (!src) return src
    if (src.startsWith('http://') || src.startsWith('https://') || src.includes('/')) {
        return src
    }
    return 'image_menu/' + src
}

sent_http().then((data) => {
    for (const key of Object.keys(data)) {
        const item = data[key]
        const main_div = document.createElement('div')
        const img = document.createElement('img')
        const text_tea = document.createElement('h4')
        const price = document.createElement('span')
        const buy_btn = document.createElement('button')

        img.src = productImage(item.image)
        main_div.appendChild(img)

        text_tea.textContent = item.name
        main_div.appendChild(text_tea)

        price.textContent = item.price + ' грн'
        main_div.appendChild(price)

        buy_btn.classList.add('tea_buy')
        buy_btn.innerText = 'Змінити дані'

        const card = { main_div, img, text_tea, price, item, dbKey: key }
        buy_btn.addEventListener('click', () => {
            currentOldName = card.dbKey
            n_name.value = card.item.name
            n_image.value = card.item.image
            n_price.value = card.item.price
            main_box.style = 'display: none;'
            change.classList.add('change')
            change.classList.remove('change-invis')
        })

        main_div.appendChild(buy_btn)
        main_div.classList.add('tea')
        main_box.appendChild(main_div)
        cards[key] = card
    }
})

sumbit_new_change.addEventListener('click', async () => {
    if (!currentOldName) {
        return
    }

    const newName = n_name.value
    const newImage = n_image.value
    const newPrice = parseInt(n_price.value)
    const oldName = currentOldName

    const response = await fetch('https://backend-server-tea-shop.onrender.com/change_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            old_name: oldName,
            new_name: newName,
            new_image: newImage,
            new_price: newPrice
        })
    })

    const data = await response.json()
    console.log(data.message)

    if (data.message === 'добре пройшло') {
        const card = cards[oldName]
        if (card) {
            card.item.name = newName
            card.item.image = newImage
            card.item.price = newPrice
            card.text_tea.textContent = newName
            card.img.src = productImage(newImage)
            card.price.textContent = newPrice + ' грн'
            card.dbKey = newName
            if (oldName !== newName) {
                cards[newName] = card
                delete cards[oldName]
            }
        }
        currentOldName = newName
    }

    main_box.style = 'display: grid;'
    change.classList.add('change-invis')
    change.classList.remove('change')
})

async function reg() {
    const response = await fetch('https://backend-server-tea-shop.onrender.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login.value,
            password: password.value
        })
    })

    return await response.json()
}

btn.addEventListener('click', async () => {
    const sign = await reg()

    if (sign.message == 'true') {
        box.classList.add('yes_reg')
        box.classList.remove('box')
        main_box.classList.add('main-box')
        main_box.classList.remove('main-box-invis')
        alert('Вхід здійснено')
    } else {
        alert('Пароль або логін неправильні')
    }
})

async function sent_http() {
    const responce = await fetch('https://backend-server-tea-shop.onrender.com/get_menu', {
        method: 'GET',
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

    return await responce.json()
}
