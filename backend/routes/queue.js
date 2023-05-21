const express = require("express");
const pool = require("../config");

router = express.Router();

const { isLoggedIn } = require('../middlewares')

router.get("/queue/:id", async function (req, res, next) {

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [queueRows, historyField] = await conn.query(
            "SELECT * FROM queue WHERE wm_id = ?",
            [req.params.id]
        )
        conn.commit()
        console.log(queueRows)
        return res.json({
            queue: queueRows,
        })
    } catch (err) {
        conn.rollback()
        return res.send(err);
    } finally {
        conn.release()
    }

});

router.post("/queue", isLoggedIn, async function (req, res, next) {

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    const { wm_id } = req.body;

    try {
        const addQueue = await conn.query(
            `INSERT INTO queue (wm_id, user_id, booking_time) VALUES (?, ?, CURRENT_TIMESTAMP)`,
            [wm_id, req.user.id]
        )

        await conn.commit()
        res.send("queue added successfully !");

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