const Car = require('../models/Car')
const User = require('../models/User')
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')
const {slogan} = require('../../util/mongoose')

class CarController {
    //[GET]/
    index(req, res, next) {
        Car.find({})
            .then(cars => {
                // cars = cars.map(course=> course.toObject())
                res.render('car/home', {
                    layout: 'home',
                    cars: multipleMongooseToObject(cars)
                }
                )
            })
            .catch(error => next(error))

    }

    //[GET]/car/create
    create(req, res, next) {
        res.render('car/create', {
            layout: 'main'
        })
    }

    //[POST]/car/create
    postCreate(req, res, next) {
        User.findOne({ sdt: req.cookies.sdtlogin })
            .then(user => {
                const car = new Car({
                    tenxe: req.body.ten,
                    bienso: req.body.bienso,
                    giaban: req.body.gia,
                    videoId: req.body.videoId,
                    sdt: req.cookies.sdtlogin,
                    namsx: req.body.nam,
                    diachi: user.diachi,
                    nguoiban: user.ten,
                    slug: req.body.ten+'_'+req.body.bienso,
                    slogan: slogan(req.body.ten)
                })
                car.save()
                    .then(() => res.redirect('/home'))
                    .catch(next)
            })
            .catch(next)
    }

    //[GET]/car/stored
    stored(req, res, next) {
        Promise.all([Car.find({ sdt: req.cookies.sdtlogin }), Car.countDeleted()])
            .then(([cars, countDeleted]) => {
                res.render('car/stored', {
                    layout: 'main',
                    cars: multipleMongooseToObject(cars),
                    countDeleted
                })
            })
            .catch(next)
    }

    //[GET]/car/trash
    trash(req, res, next) {
        Promise.all([Car.findDeleted({}), Car.countDocuments({sdt: req.cookies.sdtlogin})])
        .then(([cars, count]) => {
            res.render('car/trash', {
                layout: 'main',
                cars: multipleMongooseToObject(cars),
                count
            })
        })
        .catch(next)
    }

    //[GET]/car/edit/:id
    edit(req, res, next) {
        Car.findById(req.params.id)
            .then(car => res.render('car/edit', {
                layout: 'main',
                car: mongooseToObject(car)
            }))
            .catch(next)
    }

    //[GET]/car/restore/:id
    restore(req, res, next) {
        Car.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[PUT]/car/edit/:id
    putEdit(req, res, next) {
        Car.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/car/stored'))
            .catch(next)
    }

    //[DELETE]/car/delete/:id
    delete(req, res, next) {
        Car.delete({ _id: req.params.id })
            .then(() => res.redirect('/car/stored'))
            .catch(next)
    }

    //[DELETE]/car/destroy/:id
    destroy(req, res, next) {
        Car.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[POST]/car/action-with-multi-car
    actionWithMultiCar(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Car.delete({ _id: { $in: req.body.carIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'restore':
                Car.restore({ _id: { $in: req.body.carIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'destroy':
                Car.deleteOne({ _id: { $in: req.body.carIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action Invalid' })
        }
    }
}

module.exports = new CarController();
