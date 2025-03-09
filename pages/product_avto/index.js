import {ProductComponentCar} from "../../components/car/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPageCar {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }


    async getData() {
        try {
            const response = await fetch("../../db/stocks.json");

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
                <div class="cars">
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
    

    
    async  render() {
        
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButtonContainer = document.getElementById('back-button-container')
        const backButton = new BackButtonComponent(backButtonContainer)
        backButton.render(this.clickBack.bind(this))
    
        const data = await  this.getData()
        const productContainer = this.pageRoot.querySelector('.d-flex.flex-wrap') 
        data.forEach((item) => {
            const stock = new ProductComponentCar(productContainer) 
            stock.render(item)
        })
    }


}
