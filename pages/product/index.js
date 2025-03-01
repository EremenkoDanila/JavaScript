import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }


    getData() {
        return [
            {
                id: 1,
                src: "https://www.sberbank.ru//common/files/main_page/main_page_desktop/images/seg-all-ulibka-mob.png",
                text: "Оформление кредитной карты"
            },
            {
                id: 2,
                src: "http://www.sberbank.ru/common/img/uploaded/_new_site/person/main_page_pilot/img/money-2x.png",
                text: "Покупка иностранной валюты"
            },
            {
                id: 3,
                src: "http://www.sberbank.ru/common/img/uploaded/_new_site/person/main_page_pilot/img/prime-2x.png",
                text: "Онлайн покупки"
            },
        ]
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

            
    getHTML() {
        return (
            `
         <div id="product-page">
            <div id="back-button-container"></div>
            <div id="main_pic">
                <div id="main_text">
                    <p>Что часто ищут</p>
                </div>
                <div class="carts">
                    <div id="product-page" class="d-flex flex-wrap">
                    </div>
                </div>
            </div>
        </div> `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
    

    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButtonContainer = document.getElementById('back-button-container')
        const backButton = new BackButtonComponent(backButtonContainer)
        backButton.render(this.clickBack.bind(this))
    
        const data = this.getData()
        const productContainer = this.pageRoot.querySelector('.d-flex.flex-wrap') // Находим контейнер для продуктов
        data.forEach((item) => {
            const stock = new ProductComponent(productContainer) // Передаем правильный контейнер
            stock.render(item)
        })
    }


}
