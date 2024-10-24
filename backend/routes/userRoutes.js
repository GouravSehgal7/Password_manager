const express = require('express');
const { createUser, getUsers,changePassword,CheckUser } = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.post('/checkuser',CheckUser)
router.put('/:id/',changePassword)


module.exports = router;
