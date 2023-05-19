const carRoute = require('./car')
const authRoute = require('./authentication')
const homeRote = require('./home')
const adminRote = require('./admin')

function route(app){
    app.use('/car',carRoute)
    app.use('/admin',adminRote)
    app.use('/home',homeRote)
    app.use('/',authRoute)
}

module.exports= route;
