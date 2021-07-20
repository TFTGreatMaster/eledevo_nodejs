const express = require('express')
const router = express.Router()

const todo = require('../controller/todoController')

router.route('/items').get(todo.get_all_item).post(todo.post_a_item)

router.route('/items/:id').delete(todo.del_a_item).put(todo.put_a_item)

router.route('/items/pagi').get(todo.pagi_item)
router.route('/items/search').get(todo.pagi_search_item)

module.exports = router