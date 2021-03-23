const { Router } = require("express");
const {
    getInit,
    createProductMain,
    createProductSubMain,
    createProductList,
    addCount,
    changeProductInfo,
    deleteProductFromList,
    deleteSubProduct,
    deleteTitleProduct,
} = require("../services/managerService.js");
const router = Router();

const cloudinary = require("cloudinary").v2;

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
        isGroup: req.body.isGroup,
    };
    const result = await createProductSubMain(productSubMain).then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );
    res.json(result);
});

router.post("/createProductInfo", async (req, res) => {
    console.log(req.body);
    const { idSubProduct, name, price, shortInfo, image, info, groupName, imgFolder, producer, properties } = req.body;
    const productList = {
        name,
        price: Number(price),
        shortInfo,
        idSubProduct,
        imageMain: image[0],
        groupName,
    };

    const productInfo = {
        idProduct: "",
        name,
        price: Number(price),
        info,
        images: image,
        imgFolder,
        producer,
        properties: properties.properties,
        groupName,
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
    const name = req.body.name;

    const obj = {
        status: "Pending",
        idProduct: id,
        productName: name,
        needCount: count,
        timeStart: new Date().toISOString(),
        timeEnd: "",
        message: "",
        countGet: "",
    };

    const result = await addCount(obj).then((data) => (data.err ? { err: true, errMess: data.errMess } : data));
    res.json(result);
});

router.delete("/deleteByTag/:tag", async (req, res) => {
    const tag = req.params.tag;
    const result = await cloudinary.api.delete_resources_by_tag(tag);

    res.json(result);
});

router.put("/changeProductInfo", async (req, res) => {
    const { idListProduct, price, shortInfo, info, producer, propertiesFinaly } = req.body;
    const productList = {
        price: Number(price),
        shortInfo,
    };

    const productInfo = {
        idProduct: idListProduct,
        price: Number(price),
        info,
        producer,
        properties: propertiesFinaly,
    };

    const result = await changeProductInfo(productList, productInfo, idListProduct).then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );
    res.json(result);
});

router.delete("/deleteProductFromList/:id", async (req, res) => {
    const id = req.params.id;

    const result = await deleteProductFromList(id).then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );

    res.json(result);
});

router.delete("/deleteSubProduct/:id", async (req, res) => {
    const id = req.params.id;

    const result = await deleteSubProduct(id).then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    res.json(result);
});

router.post("/deleteTitleProduct", async (req, res) => {
    const { id, arrId } = req.body;

    const result = await deleteTitleProduct(id, arrId).then((data) =>
        data.err ? { err: true, errMess: data.errMess } : data
    );

    res.json(result);
});

module.exports = router;
