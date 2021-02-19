const newsSchema = require("../models/news");

const getInit = async () => {
    try {
        const List = newsSchema;
        let data = await List.find({});
        return { err: false, data };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const addNews = async (newsData) => {
    try {
        const addNews = new newsSchema(newsData);
        let data = await addNews.save();

        return { err: false, data };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

const deleteNews = async (id) => {
    try {
        const deleteNews = newsSchema;
        let data = await deleteNews.deleteOne({ _id: id });

        return { err: false, data };
    } catch (error) {
        return { err: true, errMess: error };
    }
};

module.exports = {
    getInit,
    addNews,
    deleteNews,
};
