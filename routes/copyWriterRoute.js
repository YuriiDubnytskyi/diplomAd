const { Router } = require("express");
const { getInit, deleteNews, addNews } = require("../services/copyWriterService.js");
const router = Router();

router.get("/init", async (req, res) => {
    const initData = await getInit().then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    res.json(initData);
});

router.post("/addnews", async (req, res) => {
    const newsData = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription,
        imageMain: req.body.imageMain,
        time: new Date(),
    };

    const news = await addNews(newsData).then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    res.json(news);
});

router.delete("/deletenews/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteNews(id).then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    res.json(deleted);
});

module.exports = router;
