const Car = require('../models/Car')
const {multipleMongooseToObject} = require('../../util/mongoose')

class CarController{
    //[GET]/
    index(req, res,next) {
        Car.find({})
            .then(cars => {
                // cars = cars.map(course=> course.toObject())
                res.render('home', { 
                    layout: 'main',
                    cars: multipleMongooseToObject(cars) }
                )
            })
            .catch(error => next(error))
        
    }

    
}

module.exports = new CarController();
