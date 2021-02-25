const { Router } = require("express");
const { getStorage, getUsers, getProductsStatus, getProductsBought } = require("../services/analiticService.js");
const router = Router();

router.get("/init", async (req, res) => {
    const users = await getUsers().then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    const storage = await getStorage().then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    const productsStatus = await getProductsStatus().then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );

    res.json({ users, storage, productsStatus });
});

router.get("/getByDate/:start/:end", async (req, res) => {
    console.log(req.params.start, req.params.end);
    const productsBought = await getProductsBought(req.params.start, req.params.end).then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );

    res.json({ productsBought });
});

module.exports = router;
