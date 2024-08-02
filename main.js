async function getData() {
    const res = await fetch('./data.json');
    const data = await res.json();
    return data;
}

const data = await getData();
const btns = document.querySelectorAll("button");
const allProducts = document.querySelector("button.all-products");
const availableProducts = document.querySelector("button.available-products");
const mainSection = document.querySelector("main");
for (let item of data) {
    mainSection.innerHTML += `
            <div class="item" data-available="${item['available']}" data-popular="${item['popular']}">
                <div class="wraper">
                    ${item['popular'] ? '<div class="popular">popular</div>': ''}
                    <img src="${item['image']}" alt="coffee">
                    <div class="name-price">
                        <h3>${item['name']}</h3>
                        <div class="price"><span>${item['price']}</span></div>
                    </div>
                    <div class="rating">
                        ${item['rating'] != null ? 
                            `<i class="fa-solid fa-star"></i><strong>${item["rating"]}</strong><p>(<span>${item["votes"]}</span> votes)</p>`
                            : '<i class="fa-regular fa-star"></i><p>Not rating</p>'}
                    </div> 
                    ${item['available'] == true ? '': '<p class="sold-out">sold out</p>'}
                </div>
            </div>
    `
}

const items = document.querySelectorAll('.item');
btns.forEach(btn => {
    btn.addEventListener("click", function () {
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.remove('active');
            items.forEach(item => {
                item.style.display = 'flex';
            })
        }
        this.classList.add('active');
        if (this.classList.contains('available-products')) {
            items.forEach(item => {
                if (item.dataset.available == "true") {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            })
        }
    })
})