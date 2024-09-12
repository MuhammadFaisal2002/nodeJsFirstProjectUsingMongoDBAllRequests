const express = require("express");
const router = express.Router();
const fs = require('fs')
const {handlerGetAllUsers, handlerGetUserById, handlerUpdateUserById, handlerDeleteUserById, handlerCreateNewUser} = require('../controllers/user') 
router.use(express.urlencoded({ extended: false }))
router.use((req, res, next) => {
    fs.appendFile('./log.txt', `${Date.now()} : ${req.method} : ${req.path}\n`, (err, data) => {
        next()
    })

})
router.use((req, res, next) => {
    console.log("response from middleware 2");
    next()
})

router.route('/:id').get(handlerGetUserById)
.patch(handlerUpdateUserById)
.delete(handlerDeleteUserById)


router.route('/').get(handlerGetAllUsers).post(handlerCreateNewUser)
module.exports = router;