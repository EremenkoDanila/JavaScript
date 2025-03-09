const {MainPicDAO} = require('./MainPicsDAO');

class MainPicsService {
    static findMainPics(id) {
        if (id !== undefined) {
            return MainPicDAO.findById(id).toJSON();
        }

        return MainPicDAO.find().map((MainPic) => MainPic.toJSON());
    }

    static addMainPic(MainPic) {
        return MainPicDAO.insert(MainPic).toJSON();
    }

    static deleteMainPic(id) {
        return MainPicDAO.delete(id).map((MainPic) => MainPic.toJSON());
    }
}

module.exports = {
    MainPicsService,
}