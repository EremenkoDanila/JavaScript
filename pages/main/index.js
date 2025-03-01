import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ProductPageCar} from "../product_avto/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }


    get pageRoot() {
        return document.getElementById('main-page')
    }

    getIndicatorsHTML(data) {
        return data.map((item, index) => `
            <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></button>
        `).join('');
    }
        
    getHTML() {
        const data = this.getData();
        const indicatorsHTML = this.getIndicatorsHTML(data);

        return `
            <div class="container mt-5">
                <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                    <!-- Индикаторы -->
                    <div class="carousel-indicators">
                        ${indicatorsHTML}
                    </div>

                    <div id="main-page" class="carousel-inner"></div>

                    <!-- Кнопки навигации -->
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        `;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://www.sberbank.com/common/files/main_page/main_page_desktop/images/main010325desk.webp",
                text: "Сбербанк для вас",
                class: "carousel-item active"
            },
            /*
            {
                id: 2,
                src: " https://www.sberbank.com/common/img/uploaded/mmb/smz-qr-s16092023//mobile.jpg",
                text: "Покупка иностранной валюты",
                class: "carousel-item"
            },
            */
            {
                id: 3,
                src: "https://sber.cdnvideo.ru/common/files/main_page/main_page_desktop/images/story-car-2110.webp",
                text: "СберАвто",
                class: "carousel-item"
            },

        ]
    }

    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('afterbegin', html)
        
        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    clickCard(e) {
        const cardId = e.target.closest('[data-id]').dataset.id;
        if(cardId == "1") {  // Убедитесь, что id соответствует тому, что вы ожидаете
            const productPage = new ProductPage(this.parent, cardId);
            productPage.render();
        } else if(cardId == "3") {
            const productPage = new ProductPageCar(this.parent, cardId);
            productPage.render();
        }
    }


    
}

