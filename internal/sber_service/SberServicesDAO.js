const {SberServicesRepository} = require('./SberServicesRespository');

class SberServiceDAO {
    constructor(id, src, text) {
        this.id = id;
        this.src = src;
        this.text = text;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('invalidate id');
        }
    }

    static _validate(SberService) {
        if (
            SberService.id === undefined ||
            SberService.src === undefined ||
            SberService.text === undefined
        ) {
            throw new Error('invalidate SberService data');
        }

        this._validateId(SberService.id);
    }

    static find() {
        const SberServices = SberServicesRepository.read();

        return SberServices.map(({id, src, text}) => {
            return new this(id, src, text);
        });
    }

    static findById(id) {
        this._validateId(id);

        const SberServices = SberServicesRepository.read();
        const SberService = SberServices.find((s) => s.id === id);

        return new this(SberService.id, SberService.src, SberService.text);
    }

    static insert(SberService) {
        this._validate(SberService);

        const SberServices = SberServicesRepository.read();
        SberServicesRepository.write([...SberServices, SberService]);

        return new this(SberService.id, SberService.src, SberService.text);
    }

    static delete(id) {
        this._validateId(id);

        const SberServices = SberServicesRepository.read();
        const filteredSberServices = SberServices.filter((s) => s.id !== id);

        SberServicesRepository.write(filteredSberServices);

        return filteredSberServices.map(({id, src, text}) => {
            return new this(id, src, text);
        });
    }

    toJSON() {
        return {
            id: this.id,
            src: this.src,
            text: this.text,
        }
    }
}

module.exports = {
    SberServiceDAO,
}