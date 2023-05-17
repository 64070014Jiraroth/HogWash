const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {

    // Query data from 3 tables
    const promise1 = pool.query('SELECT * FROM washing_machine');
    const promise2 = pool.query("SELECT path FROM images");
    const promise3 = pool.query("SELECT * FROM options");
    const promise4 = pool.query("SELECT * FROM payments");

    // Use Promise.all() to make sure that all queries are successful
    Promise.all([promise1, promise2, promise3, promise4])
        .then((results) => {
        const [wms, wmsFields] = results[0];
        const [images, imagesFields] = results[1];
        const [options, optionsFields] = results[2];
        const [payments, paymentsFields] = results[3];
        res.json({
            wms: wms,
            images: images,
            options: options,
            payments: payments
        });
        // console.log(wms[1].powder)
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

exports.router = router;
