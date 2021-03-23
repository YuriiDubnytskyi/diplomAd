const { Router } = require("express");
const { getRoles, getUsers, getProducts, deleteRole } = require("../services/adminService.js");
const router = Router();

router.get("/init", async (req, res) => {
    const roles = await getRoles().then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    const users = await getUsers().then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    const products = await getProducts().then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    res.json({ roles, users, products });
});

router.get("/isAuth", (req, res) => {
    if (req.session.passport === undefined) {
        res.json({ status: 400 });
    } else if (req.session.passport.user !== undefined) {
        res.json({ status: 200, role: req.session.passport.user.role });
    }
});

router.delete("/deleteRole/:id", (req, res) => {
    const user = deleteRole(req.params.id).then((data) => {
        data.err ? { err: true, errMess: data.errMess } : data;
    });

    res.json(user);
});

module.exports = router;
