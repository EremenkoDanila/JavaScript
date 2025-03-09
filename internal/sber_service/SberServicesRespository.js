const {DBConnector} = require('../../modules/DBConnector');

class SberServicesRepository {
    static db = new DBConnector('SberServices.json');

    static read() {
        const file = this.db.readFile();

        return JSON.parse(file);
    }

    static write(json) {
        this.db.writeFile(JSON.stringify(json));
    }
}

module.exports = {
    SberServicesRepository,
}