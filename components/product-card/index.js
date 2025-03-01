export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }
    getHTML(data) {
        return `
        <div id="product-page">
            <div class="${data.class}" id="click-card-${data.id}" data-id="${data.id}">
                <div class="test2" style="background-image: url('${data.src}');">
                    <div class="test2_text">
                        <p>${data.text}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    


    
    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }
    
    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}
