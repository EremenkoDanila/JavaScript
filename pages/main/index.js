import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {ProductPageCar} from "../product_avto/index.js";
import {ajax} from "../../XML/ajax.js";


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
        
    getHTML(data) {
        const indicatorsHTML = this.getIndicatorsHTML(data);
        return `
            <div class="container mt-5">
                <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        ${indicatorsHTML}
                    </div>
                    <div id="main-page" class="carousel-inner"></div>
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

    getData(callback) {
        // Используем ajax.get вместо ajax.post
        ajax.get('main_pics', (data) => {
            if (data) {
                console.log("Загруженные данные:", data);
                callback(null, data);
            } else {
                callback("Ошибка загрузки данных", null);
            }
        });
    }

    
    render() {
        this.parent.innerHTML = '';
        this.getData((error, data) => {
            if (error) {
                console.error(error);
                return;
            }

            const html = this.getHTML(data);
            this.parent.insertAdjacentHTML('afterbegin', html);
            
            data.forEach((item) => {
                const productCard = new ProductCardComponent(this.pageRoot);
                productCard.render(item, this.clickCard.bind(this));
            });
        });
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

