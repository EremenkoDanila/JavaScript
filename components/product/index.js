export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }
    getHTML(data) {
        return (
            `
            <div class="cart1" id="click-card-${data.id}">
                <p class="pic1_text">${data.text}</p>
                <div class="pic1">
                    <img src="${data.src}" alt="Описание картинки">
                </div>
            </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}