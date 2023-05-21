const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {

    // Query data from 3 tables
    const promise1 = pool.query('SELECT * FROM washing_machine');
    const promise2 = pool.query("SELECT path FROM images");
    const promise3 = pool.query("SELECT * FROM options");
    const promise4 = pool.query("SELECT * FROM payments");
    const promise5 = pool.query("SELECT wm_id, COUNT(user_id) AS number FROM queue GROUP BY (wm_id) ");

    // Use Promise.all() to make sure that all queries are successful
    Promise.all([promise1, promise2, promise3, promise4, promise5])
        .then((results) => {
        const [wms, wmsFields] = results[0];
        const [images, imagesFields] = results[1];
        const [options, optionsFields] = results[2];
        const [payments, paymentsFields] = results[3];
        const [queueNums, queueFields] = results[4];
        res.json({
            wms: wms,
            images: images,
            options: options,
            payments: payments,
            queueNums: queueNums
        });
        // console.log(wms[1].powder)
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

router.put("/:id", async function (req, res, next) {

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        console.log(req.params.id)
        let refillTank = await conn.query(
            `UPDATE washing_machine SET powder=?, softener=? WHERE id=?`,
            [100, 100, req.params.id]
        )

        await conn.commit()
        res.send("success!");

    } catch (err) {
        await conn.rollback();
        next(err);
    } finally {
        console.log('finally')
        conn.release();
    }
    return;
});

router.put("/finish/:id", async function (req, res, next) {

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        console.log(req.params.id)
        let finish = await conn.query(
            `UPDATE washing_machine SET status=?, time=? WHERE id=?`,
            [0, 0, req.params.id]
        )

        await conn.commit()
        res.send("wm finished !");

    } catch (err) {
        await conn.rollback();
        next(err);
    } finally {
        console.log('finally')
        conn.release();
    }
    return;
});

router.post("/timers", async function (req, res, next) {

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    const { id, time } = req.body;

    try {
        let timer = await conn.query(
            `UPDATE washing_machine SET time=? WHERE id=?`,
            [time, id]
        )

        await conn.commit()
        res.send("timer updated successfully !");

    } catch (err) {
        await conn.rollback();
        next(err);
    } finally {
        conn.release();
    }
    return;
});

router.get("/timers", async function (req, res, next) {

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        let [timers] = await conn.query(`SELECT * FROM washing_machine`)
        await conn.commit()
        return res.json({
            timer: timers
        });

    } catch (err) {
        await conn.rollback();
        next(err);
    } finally {
        console.log('finally')
        conn.release();
    }
    return;
});

exports.router = router;
