export class Urls {
    constructor() {
        this.url = 'http://localhost:8000'
    }
    
    getAllInfo(paig) {
        if (paig === 'main_pics') {

            return `${this.url}/main_pics`; // Возвращаем только путь, без базового URL
        } else {
            return `${this.url}/${paig}`; // Возвращаем только путь, без базового URL
        }
    }
}

export const url_all = new Urls()