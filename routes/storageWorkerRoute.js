const { Router } = require("express");
const router = Router();
const { getInit, addCount, delProduct } = require("./../services/storageWorkerService");

router.get("/init", async (req, res) => {
    const initData = await getInit().then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    res.json(initData);
});

router.put("/addCount", async (req, res) => {
    const id = req.body.id;
    const idStorageHouse = req.body.idStorageHouse;
    const message = req.body.message;
    const getValue = req.body.getValue;
    const countExist = req.body.countExist;

    const aggreApplication = await addCount(id, idStorageHouse, message, getValue, countExist).then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );

    res.json(aggreApplication);
});

router.delete("/delProduct/:id", async (req, res) => {
    const id = req.params.id;

    const data = await delProduct(id).then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    res.json(data);
});
module.exports = router;
