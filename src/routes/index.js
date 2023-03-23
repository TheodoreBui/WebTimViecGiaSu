const carRoute = require('./car')
const authRoute = require('./authentication')
const homeRote = require('./home')
function route(app){
    app.use('/car',carRoute)
    app.use('/home',homeRote)
    app.use('/',authRoute)
}

module.exports= route;
