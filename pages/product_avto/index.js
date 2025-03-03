import {ProductComponentCar} from "../../components/car/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPageCar {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }


    getData() {
        return [
            {
                id: 1,
                src: "https://sberauto.com/_next/image?url=https%3A%2F%2Fstrapi-multiaz.obs.ru-moscow-1.hc.sbercloud.ru%2Fcar_selection_2_desk_92ca397647.png&w=750&q=75",
                text: "Автомабили от СберАвто"
            },
            {
                id: 2,
                src: "https://sberauto.com/_next/image?url=https%3A%2F%2Fstrapi-multiaz.obs.ru-moscow-1.hc.sbercloud.ru%2Fcar_selection_9_desk_78473eaefe.png&w=750&q=75",
                text: "Автомабили со скидкой"
            },
            {
                id: 3,
                src: "https://sberauto.com/_next/image?url=https%3A%2F%2Fstrapi-multiaz.obs.ru-moscow-1.hc.sbercloud.ru%2Fcar_selection_7_desk_a943ec0680.png&w=750&q=75",
                text: "Без пробега по РФ"
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
    

    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButtonContainer = document.getElementById('back-button-container')
        const backButton = new BackButtonComponent(backButtonContainer)
        backButton.render(this.clickBack.bind(this))
    
        const data = this.getData()
        const productContainer = this.pageRoot.querySelector('.d-flex.flex-wrap') 
        data.forEach((item) => {
            const stock = new ProductComponentCar(productContainer) 
            stock.render(item)
        })
    }


}
