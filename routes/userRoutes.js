const { Router } = require("express");
const router = Router();

router.get("/isAuth", (req, res) => {
    console.log(req.session);
    if (req.session.passport === undefined) {
        res.json({ status: 400 });
    } else if (req.session.passport.user !== undefined) {
        res.json({ status: 200, role: req.session.passport.user.role });
    }
});

module.exports = router;
