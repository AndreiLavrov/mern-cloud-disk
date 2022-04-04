const mongoose = require('mongoose')

const { Schema, model, ObjectId } = mongoose

const File = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    accessLink: { type: String },
    size: { type: Number, default: 0 },
    path: { type: String, default: '' },
    user: { type: ObjectId, ref: 'User' },
    parent: { type: ObjectId, ref: 'File' },
    date: { type: Date, default: Date.now() },
    children: [{ type: ObjectId, ref: 'File' }], // TODO: potentially bug here(changed name of the key)
})

module.exports = model('File', File)

