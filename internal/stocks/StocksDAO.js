const {StocksRepository} = require('./StocksRespository');

class StockDAO {
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

    static _validate(stock) {
        if (
            stock.id === undefined ||
            stock.src === undefined ||
            stock.text === undefined
        ) {
            throw new Error('invalidate stock data');
        }

        this._validateId(stock.id);
    }

    static find() {
        const stocks = StocksRepository.read();

        return stocks.map(({id, src, text}) => {
            return new this(id, src, text);
        });
    }

    static findById(id) {
        this._validateId(id);

        const stocks = StocksRepository.read();
        const stock = stocks.find((s) => s.id === id);

        return new this(stock.id, stock.src, stock.text);
    }

    static insert(stock) {
        this._validate(stock);

        const stocks = StocksRepository.read();
        StocksRepository.write([...stocks, stock]);

        return new this(stock.id, stock.src, stock.text);
    }

    static delete(id) {
        this._validateId(id);

        const stocks = StocksRepository.read();
        const filteredStocks = stocks.filter((s) => s.id !== id);

        StocksRepository.write(filteredStocks);

        return filteredStocks.map(({id, src, text}) => {
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
    StockDAO,
}