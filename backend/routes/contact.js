const express = require("express");
const pool = require("../config");
const path = require("path")
const multer = require('multer');

router = express.Router();

//เผื่อ upload รูปปัญหาที่พบ
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './static/uploads') // path to save file
    },
    filename: function (req, file, callback) {
      // set file name
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router.get("/contact", async function (req, res, next) {
    return res.render("contact");
});

// contactBox
router.post("/contact",multer().any(), async function (req, res, next) {

    // res.send(JSON.stringify(req.body));

    const feedbackTitle = req.body.feedbackTitle;
    const feedbackDes = req.body.feedbackDes;

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {

        const [rows1, fields1] = await conn.query(
            'INSERT INTO `feedback` (`user_id`, `title`, `description`, `feedback_date`) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
            [1, feedbackTitle, feedbackDes]
        )
        const [rows2, fields2] = await conn.query(
            'SELECT * FROM `feedback` WHERE `id` = ?',
            [rows1.insertId]
        )
        
        await conn.commit()
        
        // res.redirect('/')

        // console.log('req.user.id', req.user.id)
        return res.json(rows2[0])


    } catch (err) {
        await conn.rollback();
        return res.status(500).json(err)
    } finally {
        console.log('finally')
        conn.release();
    }

})

exports.router = router;
