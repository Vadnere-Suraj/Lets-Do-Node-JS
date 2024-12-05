
const express = require('express');
const router = express.Router();

const {getUsers, getUser, postUser, deleteUser, updateUser} = require('../controller/user')



router.route('/').get(getUsers).post(postUser)

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)


module.exports = router;
