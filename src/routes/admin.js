const express = require('express')
const route = express.Router();
const AdminController = require('../app/controller/AdminController')
const authMiddleWare = require('../middlerware/authentication')

route.delete('/customer/delete/:id',AdminController.deleteCustomer)
route.delete('/customer/destroy/:id',AdminController.destroyCustomer)
route.get('/contract/require/:id',AdminController.requireContract)
route.get('/contract',AdminController.getContract)
route.get('/check/:id',AdminController.checkCar)
route.get('/confirm/:idXe/:idKh',AdminController.confirm)
route.get('/delete/:idXe/:idKh',AdminController.deleteRequire)
route.get('/customer/restore/:id',AdminController.restoreCustomer)
route.get('/customer/trash',authMiddleWare.requireAuthAdmin,AdminController.trashCustomer)
route.get('/customer/stored',authMiddleWare.requireAuthAdmin,AdminController.storedCustomer)
route.get('/car/stored',authMiddleWare.requireAuthAdmin,AdminController.index)
route.get('/car/trash',authMiddleWare.requireAuthAdmin,AdminController.trash)
module.exports= route;

