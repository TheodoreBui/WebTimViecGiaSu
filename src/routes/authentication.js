const express = require('express')
const route = express.Router();
const AuthController = require('../app/controller/AuthController')

route.post('/login',AuthController.login)
route.post('/check',AuthController.check)
route.post('/signup/:value',AuthController.signup)
route.get('/logout',AuthController.logout)
route.get('/logoutAdmin',AuthController.logoutAdmin)
route.get('/register',AuthController.register)
route.get('/',AuthController.index)

module.exports= route;

