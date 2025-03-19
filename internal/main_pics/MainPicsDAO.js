const {MainPicsRepository} = require('./MainPicsRespository');

class MainPicDAO {
    constructor(id, src, text, class_id) {
        this.id = id;
        this.src = src;
        this.text = text;
        this.class_id = class_id
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('invalidate id');
        }
    }

    static _validate(MainPic) {
        if (
            MainPic.id === undefined ||
            MainPic.src === undefined ||
            MainPic.text === undefined ||
            MainPic.class_id === undefined
        ) {
            throw new Error('invalidate MainPic data');
        }

        this._validateId(MainPic.id);
    }

    static find() {
        const MainPics = MainPicsRepository.read();

        return MainPics.map(({id, src, text, class_id}) => {
            return new this(id, src, text, class_id);
        });
    }

    static findById(id) {
        this._validateId(id);

        const MainPics = MainPicsRepository.read();
        const MainPic = MainPics.find((s) => s.id === id);

        return new this(MainPic.id, MainPic.src, MainPic.text, MainPic.class_id);
    }

    static insert(MainPic) {
        this._validate(MainPic);

        const MainPics = MainPicsRepository.read();
        MainPicsRepository.write([...MainPics, MainPic]);

        return new this(MainPic.id, MainPic.src, MainPic.text, MainPic.class_id);
    }

    static delete(id) {
        this._validateId(id);

        const MainPics = MainPicsRepository.read();
        const filteredMainPics = MainPics.filter((s) => s.id !== id);

        MainPicsRepository.write(filteredMainPics);

        return filteredMainPics.map(({id, src, text, class_id}) => {
            return new this(id, src, text, class_id);
        });
    }


    static update(id, updates) {
        this._validateId(id);
        const MainPics = MainPicsRepository.read();
        const index = MainPics.findIndex((s) => s.id === id);
        if (index === -1) {
            throw new Error('Service not found');
        }
        
        // Обновление данных
        const updatedService = { ...MainPics[index], ...updates };
        MainPics[index] = updatedService;
        MainPicsRepository.write(MainPics);
    
        return new this(updatedService.id, updatedService.src, updatedService.text);
    }




    toJSON() {
        return {
            id: this.id,
            src: this.src,
            text: this.text,
            class_id: this.class_id
        }
    }
}

module.exports = {
    MainPicDAO,
}