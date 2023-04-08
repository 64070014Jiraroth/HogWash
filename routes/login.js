const express = require("express");
const pool = require("../config");
const path = require("path")
const multer = require('multer');
const { sign } = require("crypto");

router = express.Router();

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

router.get("/login", async function (req, res, next) {
    
    return res.render("login");
});

// sign up
router.post("/login",multer().any(), async function (req, res, next) {

    // res.send(JSON.stringify(req.body));

    const signUpEmail = req.body.signUpEmail;
    const signUpPassword = req.body.signUpPassword;

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        console.log('password', signUpPassword)
        console.log('email', signUpEmail)
        let results = await conn.query(
            "INSERT INTO user(user_password, user_email) VALUES(?, ?)",
            [signUpPassword, signUpEmail]
        )
        const userID = results[0].insertId

        await conn.commit()

        // alert('Sign in sucessfully')
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
