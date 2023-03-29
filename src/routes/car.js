const express = require('express')
const route = express.Router();
const CarController = require('../app/controller/CarController')
const authMiddleWare = require('../middlerware/authentication')

route.get('/create',CarController.create)
route.post('/create',CarController.postCreate)
route.post('/search',CarController.search)
route.post('/action-with-multi-car',CarController.actionWithMultiCar)
route.get('/stored',CarController.stored)
route.get('/trash',CarController.trash)
route.get('/edit/:id',CarController.edit)
route.get('/restore/:id',CarController.restore)
route.put('/edit/:id',CarController.putEdit)
route.delete('/delete/:id',CarController.delete)
route.delete('/destroy/:id',CarController.destroy)
route.get('/',authMiddleWare.requireAuth,CarController.index)

module.exports= route;

