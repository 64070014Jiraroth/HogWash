const express = require("express");
const pool = require("../config");
const Joi = require('joi')

router = express.Router();

const emailValidator = async (value, helpers) => {
    const [rows, _] = await pool.query(
        "SELECT user_email FROM user WHERE user_email = ?",
        [value]
    )
    if (rows.length > 0) {
        throw new Joi.ValidationError('This email is already used')
    }
    return value
}

const passwordValidator = (value, helpers) => {
    if (value.length < 6) {
        throw new Joi.ValidationError('Password must contain at least 6 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const signupSchema = Joi.object({
    signUpEmail: Joi.string().required().email().external(emailValidator),
    signUpPassword: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().valid(Joi.ref('password')), 
})

router.get("/login", async function (req, res, next) {
    return res.render("login");
});

// sign up
router.post("/login", async function (req, res, next) {

    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
        res.send('ok')
    } catch (err) {
        return res.status(400).json(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    const { signUpEmail, signUpPassword } = req.body;

    try {
        await conn.query(
            "INSERT INTO user(user_password, user_email) VALUES(?, ?)",
            [signUpPassword, signUpEmail]
    )
        conn.commit()
        return res.status(201).send()
    } catch (err) {
        conn.rollback()
        return res.status(400).json(err.toString());
    } finally {
        conn.release()
    }

})

exports.router = router;
