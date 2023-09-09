const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.get('/', (req, res) => {
//     res.render('home');
// });
router.get('/',userController.view);
router.post('/',userController.find);
router.get('/viewuser/:id',userController.viewall);
router.get('/edituser/:id',userController.edituser);
router.get('/deleteuser/:id',userController.deleteuser);
router.post('/updateuser/:id',userController.updateuser);
router.get('/inactiveuser',userController.inactive);
router.get('/adduser',userController.showform);
router.post('/adduser',userController.adduser);
router.get('/activateuser/:id',userController.activateuser);
router.get('/deleteper/:id',userController.deleteper);
module.exports = router;