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

    const commentTitle = req.body.comment_title;
    const commentDetail = req.body.comment_detail;

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        console.log('password', commentTitle)
        console.log('email', commentDetail)
        let results = await conn.query(
            "INSERT INTO comment(comment_title, comment_detail) VALUES(?, ?)",
            [commentTitle, commentDetail]
        )
        // const userID = results[0].insertId

        await conn.commit()

        this.online = true
        this.online_user = this.user_email

        res.redirect('/')


    } catch (err) {
        await conn.rollback();
        next(err)
    } finally {
        console.log('finally')
        conn.release();
    }

})

exports.router = router;
