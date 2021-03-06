const mongoose = require('mongoose');

const { Schema, model, ObjectId } = mongoose;

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diskSpace: { type: Number, default: 1024 * 3 * 1000000 },
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String },
  file: [{ type: ObjectId, ref: 'File' }],
});

module.exports = model('User', User);
