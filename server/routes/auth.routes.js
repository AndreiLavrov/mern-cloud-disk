const Router = require('express')
const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("config")
const { check, validationResult } = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware.js')
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

            const hashPassword = await bcryptjs.hash(password, 7)
            const user = new User({ email, password: hashPassword })

            await user.save()

            return res.json({ message: 'User was created' })
        } catch (e) {
            console.log(e)
            res.send({message: 'Server error'})
        }
    })

router.post('/login',
    async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            const isPasswordValid = bcryptjs.compareSync(password, user.password)
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Wrong password' })
            }

            const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' })
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: 'Server error'})
        }
    })

router.get('/auth',
    authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.user.id });
            const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' })
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: 'Server error'})
        }
    })

module.exports = router;
