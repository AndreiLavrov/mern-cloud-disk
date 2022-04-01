const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")
const corsMiddleware = require('./middleware/cors.middleware.js')

const app = express()
const PORT = config.get('serverPort')

app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)

const start = async () => {
    try {
        mongoose.connect(config.get('dbUrl'));

        // just example from the doc
        // const Cat = mongoose.model('Cat', { name: String });
        // const kitty = new Cat({ name: 'Zildjian' });
        // kitty.save().then(() => console.log('meow'));

        app.listen(PORT, () => {
            console.log(`Server was started by port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }

}

start()
