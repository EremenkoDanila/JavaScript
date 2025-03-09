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
        
    async getHTML() {
        const data = await this.getData(); // Ждем загрузки данных
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

    async getData() {
        try {
            const response = await fetch("../../db/MainPics.json");

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json(); // Декодируем JSON
            console.log("Загруженные данные:", data, Array.isArray(data)); // Проверяем, массив ли это
            return data;
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
            return [];
        }
    }

    
    async render() {
        this.parent.innerHTML = ''
        const html = await this.getHTML()
        this.parent.insertAdjacentHTML('afterbegin', html)
        
        const data = await this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    clickCard(e) {
        const cardId = e.target.closest('[data-id]').dataset.id;
        if(cardId == "1") { 
            const productPage = new ProductPage(this.parent, cardId);
            productPage.render();
        } else if(cardId == "3") {
            const productPage = new ProductPageCar(this.parent, cardId);
            productPage.render();
        }
    }


    
}

