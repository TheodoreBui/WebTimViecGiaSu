const express = require('express')
const route = express.Router();
const CarController = require('../app/controller/CarController')
const authMiddleWare = require('../middlerware/authentication')

route.get('/',authMiddleWare.requireAuth,CarController.index)

module.exports= route;

