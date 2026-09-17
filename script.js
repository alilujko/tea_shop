const text = document.querySelector('#all_cost')
const linies = document.querySelector('.linies')

const cort = []
let all_cost = 0

function productImage(src) {
    if (!src) return src
    if (src.startsWith('http://') || src.startsWith('https://') || src.includes('/')) {
        return src
    }
    return 'image_menu/' + src
}

sent_http().then((data) => {
    for (const key in data) {
        const item = data[key]
        const main_div = document.createElement('div')
        const img = document.createElement('img')
        const text_tea = document.createElement('h4')
        const price = document.createElement('span')
        const btn = document.createElement('button')

        img.src = productImage(item.image)
        main_div.appendChild(img)

        text_tea.textContent = item.name
        main_div.appendChild(text_tea)

        price.textContent = item.price + ' грн'
        main_div.appendChild(price)

        btn.classList.add('tea_buy')
        btn.innerText = 'Додати до кошика'
        btn.addEventListener('click', () => {
            all_cost += parseInt(item.price)
            cort.push(item.name)
            text.textContent = 'Загальна сума:' + all_cost
            alert('Добавлено в кошик ' + item.name)
        })
        main_div.appendChild(btn)

        main_div.classList.add('tea')
        linies.appendChild(main_div)
    }
})

async function sent_http() {
    const responce = await fetch('https://backend-server-tea-shop.onrender.com/get_menu', {
        method: 'GET',
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })

    const data = await responce.json()
    return data
}
