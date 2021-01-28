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

router.post("/createProductSubMain", (req, res) => {
    console.log(req.body);
    const productSubMain = {
        productSubTitle: req.body.productSubTitle,
        idProductTitle: req.body.idProductTitle,
        isImg: req.body.isImg,
        imgSrc: req.body.imgSrc,
        imgFolder: req.body.imgFolder,
    };
    const result = createProductSubMain(productSubMain).then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );
    res.json(result);
});

router.post("/createProductInfo", async (req, res) => {
    console.log(req.body);
    const productList = {
        name: req.body.name,
        price: req.body.price,
        shortInfo: req.body.shortInfo,
        idSubProduct: req.body.idSubProduct,
        imageMain: req.body.image[0],
    };

    const productInfo = {
        idProduct: "",
        name: req.body.name,
        price: req.body.price,
        info: req.body.info,
        images: req.body.image,
        imgFolder: req.body.imgFolder,
        producer: req.body.producer,
        properties: req.body.properties,
    };

    const storageInfo = {
        idStorageHouse: "",
        name: req.body.name,
        count: 0,
    };

    const result = await createProductList(productList, productInfo, storageInfo).then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );
    res.json(result);
});

router.put("/addCount", (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const count = req.body.count;

    const result = addCount(id, count).then((data) => (data.err ? { err: true, errMess: data.errMess } : data));
    res.json(result);
});

module.exports = router;