const Task = require('../model/Task')

exports.get_all_item = async (req, res) => {
    try {
        const data = await Task.find({})
        res.json(data)
    } catch (err) {
        res.send({
            message: 'loiroi'
        })
    }
}
exports.post_a_item = async (req, res) => {
    try {
        const data = req.body
        const newDoc = new Task(data)
        const saveDoc = await newDoc.save()
        res.json({
            message: 'oke roi',
            saveDoc
        })
    } catch (err) {
        res.send({
            message: 'loiroi'
        })
    }
}
exports.del_a_item = async (req, res) => {
    try {
        const id = req.params.id
        await Task.findByIdAndDelete(id)
        res.json({
            message: 'oke roi',
            id
        })
    } catch (err) {
        res.send({
            message: 'loiroi'
        })
    }
}
exports.put_a_item = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        await Task.findByIdAndUpdate(id, data)
        res.json({
            message: 'oke roi',
            id,
            data
        })
    } catch (err) {
        res.send({
            message: 'loiroi'
        })
    }
}
exports.pagi_item = async (req, res) => {
    try {
        const { limit, page } = req.query
        const _limit = parseInt(limit)
        const _page = parseInt(page)
        const skip = (_page - 1) * _limit
        const data = await Task.find({}).limit(_limit).skip(skip)
        const totalItems = await Task.estimatedDocumentCount()
        const totalPage = Math.ceil(totalItems / _limit)
        res.json({
            message: 'thành công',
            data,
            totalPage
        })
    } catch (err) {
        res.send({
            message: 'loiroi'
        })
    }
}
exports.pagi_search_item = async (req, res) => {
    try {
        const { name, limit, page } = req.query
        const _limit = parseInt(limit)
        const _page = parseInt(page)
        const skip = (_page - 1) * _limit
        const data = await Task.find({ name: { $regex: name, $options: 'i' } }).limit(_limit).skip(skip)
        const totalItems = await Task.countDocuments({
            name: { $regex: name, $options: 'i' }
        })
        const totalPage = Math.ceil(totalItems / _limit)
        res.json({
            message: 'thành công',
            data,
            totalPage
        })
    } catch (err) {
        res.send({
            message: 'loiroi'
        })
    }
}
