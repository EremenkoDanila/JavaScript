const {SberServiceDAO} = require('./SberServicesDAO');

class SberServicesService {
    static findSberServices(id) {
        if (id !== undefined) {
            return SberServiceDAO.findById(id).toJSON();
        }

        return SberServiceDAO.find().map((SberService) => SberService.toJSON());
    }

    static addSberService(SberService) {
        return SberServiceDAO.insert(SberService).toJSON();
    }

    static deleteSberService(id) {
        return SberServiceDAO.delete(id).map((SberService) => SberService.toJSON());
    }
}

module.exports = {
    SberServicesService,
}