const mongoose = require('mongoose')
const { model, Schema } = mongoose

const TaskSchema = new Schema({
    name: { type: String, required: true }
})
module.exports = model('Task', TaskSchema)