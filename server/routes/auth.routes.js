const Router = require("express")
const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const { check, validationResult } = require("express-validator")
const router = new Router()


router.post('/registration',
    [
        check('email', 'wrong email').isEmail(),
        check('password', 'password should be longer then 3, but shorter then 12').isLength({ min: 3, max: 12 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'wrong request', errors })
            }

            const { email, password } = req.body
            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: `User with email ${email} already exists` })
            }

            const hashPassword = await bcryptjs.has(password, 15)
            const user = new User({ email, password: hashPassword })

            await user.save()

            return res.json({ message: 'User was created' })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

module.exports = router;
