const express = require("express");
const pool = require("../config");
const path = require("path")
const multer = require('multer');

const { isLoggedIn } = require('../middlewares')

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

    const promise = pool.query("SELECT path FROM images");

    Promise.all([promise])
        .then((results) => {
            const [images, imagesFields] = results[0];
            res.json({
                images: images,
            });
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

// contactBox
router.post("/contact", isLoggedIn, async function (req, res, next) {

    const feedbackTitle = req.body.feedbackTitle;
    const feedbackDes = req.body.feedbackDes;

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {

        const [rows1, fields1] = await conn.query(
            'INSERT INTO `feedback` (`user_id`, `title`, `description`, `feedback_date`) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
            [req.user.id, feedbackTitle, feedbackDes]
        )
        
        await conn.commit()
        return res.json({
            message : 'Send feedback successfully'
        })
    } catch (err) {
        await conn.rollback();
        return res.status(500).json(err)
    } finally {
        console.log('finally')
        conn.release();
    }

})

exports.router = router;
