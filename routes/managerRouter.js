const { Router } = require("express");
const {
    getInit,
    createProductMain,
    createProductSubMain,
    createProductList,
    addCount,
} = require("../services/managerService.js");
const router = Router();

router.get("/init", async (req, res) => {
    const initData = await getInit().then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    res.json(initData);
});

router.post("/createProductMain", async (req, res) => {
    console.log(req.body);
    const productMain = {
        productTitle: req.body.productTitle,
        isImg: req.body.isImg,
        imgSrc: req.body.imgSrc,
        imgFolder: req.body.imgFolder,
    };
    const result = await createProductMain(productMain).then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );

    res.json(result);
});

router.post("/createProductSubMain", async (req, res) => {
    const productSubMain = {
        productSubTitle: req.body.productSubTitle,
        idProductTitle: req.body.idProductTitle,
        isImg: req.body.isImg,
        imgSrc: req.body.imgSrc,
        imgFolder: req.body.imgFolder,
    };
    const result = await createProductSubMain(productSubMain).then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );
    res.json(result);
});

router.post("/createProductInfo", async (req, res) => {
    console.log(req.body);
    const { idSubProduct, name, price, shortInfo, image, info, imgFolder, producer, properties } = req.body;
    const productList = {
        name,
        price,
        shortInfo,
        idSubProduct,
        imageMain: image[0],
    };

    const productInfo = {
        idProduct: "",
        name,
        price,
        info,
        images: image,
        imgFolder,
        producer,
        properties,
    };

    const storageInfo = {
        idStorageHouse: "",
        name,
        count: 0,
    };

    const result = await createProductList(productList, productInfo, storageInfo).then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );
    res.json(result);
});

router.put("/addCount", async (req, res) => {
    const id = req.body.id;
    const count = req.body.count;

    const result = await addCount(id, count).then((data) => (data.err ? { err: true, errMess: data.errMess } : data));
    res.json(result);
});

module.exports = router;
