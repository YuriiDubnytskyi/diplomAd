const { Router } = require("express");
const { getInit, switchProduct } = require("../services/sellingService.js");
const router = Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.EMAIL_ID,
    process.env.EMAIL_SECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.EMAIL_REFRESH,
});

router.get("/init", async (req, res) => {
    const initData = await getInit().then((data) => (data.err ? { err: true, errMess: data.errMess } : data));

    res.json(initData);
});

router.post("/switch", async (req, res) => {
    const id = req.body.id;
    const options = req.body.options;
    const result = await switchProduct(id).then((data) => (data.err ? { err: true, errMess: data.errMess } : data));
    const accessToken = oauth2Client.getAccessToken();
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        // auth: {
        //     user: process.env.EMAIL_ADRESS,
        //     pass: process.env.EMAIL_PASSWORD,
        // },
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL_ADRESS,
            clientId: process.env.EMAIL_ID,
            clientSecret: process.env.EMAIL_SECRET,
            refreshToken: process.env.EMAIL_REFRESH,
            accessToken: accessToken,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_ADRESS,
        to: `${options.email},${process.env.EMAIL_ADRESS}`,
        subject: "Buy Check",
        html: `
        <p>Hi we send you your products</p>
        <p>Name ${options.name}</p>
        <p>Adress ${options.adress}</p>
        <p>You Buy</p>
        ${options.products.map((el) => {
            return `
                    <div>
                        <p>Name ${el.name}</p>
                        <p>Price ${el.price}</p>
                        <p>Count ${el.count}</p>
                        <a href=http://localhost:3000/product/${el._id}/:FromMyBilling/:${el.name}>More</a>
                    </div>
                    `;
        })}
        `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({ err: false, status: 404, comment: "User not found" });
        } else {
            res.json({ success: true });
        }
    });
});

module.exports = router;
