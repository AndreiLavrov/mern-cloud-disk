const express = require("express")
const mongoose = require("mongoose")
const config = require("config")

const app = express()
const PORT = config.get('serverPort')

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
