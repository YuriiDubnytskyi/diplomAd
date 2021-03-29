const { Router } = require("express");
const {
    getStorage,
    getUsers,
    getProductsStatus,
    getProductsBought,
    getBoughtByDate,
    getProductsTop,
} = require("../services/analiticService.js");
const router = Router();

router.get("/init", async (req, res) => {
    const users = await getUsers().then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    const storage = await getStorage().then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    const productsStatus = await getProductsStatus().then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );

    const productsTop = await getProductsTop().then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    res.json({ users, storage, productsStatus, productsTop });
});

router.get("/getByDate/:start/:end", async (req, res) => {
    console.log(req.params.start, req.params.end);
    const productsBought = await getProductsBought(req.params.start, req.params.end).then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );

    res.json({ productsBought });
});

router.get("/getBoughtByDate/:start/:end", async (req, res) => {
    console.log(req.params.start, req.params.end);
    const boughtDate = await getBoughtByDate(req.params.start, req.params.end).then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );

    res.json({ boughtDate });
});

module.exports = router;
