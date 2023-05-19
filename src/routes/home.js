const express = require('express')
const route = express.Router();
const CarController = require('../app/controller/CarController')
const authMiddleWare = require('../middlerware/authentication')
const AdminController = require('../app/controller/AdminController')

route.get('/',authMiddleWare.requireAuth,CarController.home)
route.get('/admin',authMiddleWare.requireAuthAdmin,AdminController.index)

module.exports= route;

