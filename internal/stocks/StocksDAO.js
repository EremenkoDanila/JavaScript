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


    static update(id, updates) {
        this._validateId(id);
        const Stocks = StocksRepository.read();
        const index = Stocks.findIndex((s) => s.id === id);
        if (index === -1) {
            throw new Error('Service not found');
        }
        
        // Обновление данных
        const updatedService = { ...Stocks[index], ...updates };
        Stocks[index] = updatedService;
        StocksRepository.write(Stocks);
    
        return new this(updatedService.id, updatedService.src, updatedService.text);
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