const express = require('express');
const { createPassword, getPasswords, UpdatePassword,DeletePassword,getpassworddetbyid } = require('../controllers/passwordController');

const router = express.Router();

router.post('/:userid/', createPassword);
router.get('/:userid/', getPasswords);
router.put('/:userid/:passwordId/',UpdatePassword)
router.delete('/:userid/:passwordId/',DeletePassword)
router.get('/getuser/:userid',getpassworddetbyid)

module.exports = router;
