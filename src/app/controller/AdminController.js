const Car = require('../models/Car')
const User = require('../models/User')
const Admin = require('../models/Admin')
const Require = require('../models/Require')
const Contract = require('../models/Contract')
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')

class AdminController {
    //[GET]/admin/car/stored
    index(req, res, next) {
        Promise.all([Car.find({ status: { $ne: 'hired' } }), Car.countDeleted()])
            .then(([cars, countDeleted]) => {
                res.render('admin/storedCar', {
                    layout: 'admin',
                    cars: multipleMongooseToObject(cars),
                    countDeleted
                })
            })
            .catch(next)
    }

    //[GET]/admin/car/trash
    trash(req, res, next) {
        Promise.all([Car.findDeleted({}), Car.countDocuments()])
            .then(([cars, count]) => {
                res.render('admin/trashCar', {
                    layout: 'admin',
                    cars: multipleMongooseToObject(cars),
                    count
                })
            })
            .catch(next)
    }
    //[GET]/admin/customer/stored
    storedCustomer(req, res, next) {
        Promise.all([User.find(), User.countDeleted()])
            .then(([users, countDeleted]) => {
                res.render('admin/storedCustomer', {
                    layout: 'admin',
                    customers: multipleMongooseToObject(users),
                    countDeleted
                })
            })
            .catch(next)
    }
    //[DELETE]/admin/customer/delete/:id
    deleteCustomer(req, res, next) {
        User.delete({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }
    //[GET]/admin/customer/trash
    trashCustomer(req, res, next) {
        Promise.all([User.findDeleted({}), User.countDocuments()])
            .then(([users, count]) => {
                res.render('admin/trashCustomer', {
                    layout: 'admin',
                    customers: multipleMongooseToObject(users),
                    count
                })
            })
            .catch(next)
    }
    //[DELETE]/admin/customer/destroy/:id
    destroyCustomer(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }
    //[GET]/admin/customer/restore/:id
    restoreCustomer(req, res, next) {
        User.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //[GET]/admin/contarct/require/:id
    requireContract(req, res, next) {
        Promise.all([User.findOne({ user: req.cookies.user }),
        Car.findByIdAndUpdate(req.params.id, { $set: { status: 'check' } })
        ])
            .then(([user]) => {
                const require = new Require({
                    maXe: req.params.id,
                    maKh: user._id
                })
                require.save()
                    .then(() => res.redirect('/car/list'))
                    .catch(next)
            }).catch(next)
    }

    //[GET]/admin/check/:id
    checkCar(req, res, next) {
        Require.find({ maXe: req.params.id })
            .then(requires => {
                let arr = []
                requires.forEach(require => arr.push(require.maKh))

                Promise.all([User.find({ _id: { $in: arr } }), Car.findById(req.params.id)])
                    .then(([users, car]) => {
                        res.render('admin/checkCar', {
                            layout: 'admin',
                            customers: multipleMongooseToObject(users),
                            tenXe: car.tenxe,
                            id: req.params.id
                        })
                    }).catch(next)

            }).catch(next)
    }

    //[GET]/admin/confirm/idXe/idKh
    confirm(req, res, next) {

        Promise.all([Car.findById(req.params.idXe),
        User.findById(req.params.idKh),
        Require.deleteMany({ maXe: req.params.idXe }),
        Car.findByIdAndUpdate(req.params.idXe, { $set: { status: 'hired' } })
        ])
            .then(([car, user]) => {

                const contract = new Contract({
                    maKh: user.user,
                    tenKh: user.ten,
                    tenXe: car.tenxe,
                    bienso: car.bienso,
                    giaban: car.giaban
                })
                contract.save()
                    .then(() => res.redirect('/admin/contract'))
                    .catch(next)
            }).catch(next)
    }

    //[GET]/admin/delete/idXe/idKh
    deleteRequire(req, res, next) {
        Require.deleteOne({ maXe: req.params.idXe, maKh: req.params.idKh })
            .then(() => {
                Require.countDocuments({ maXe: req.params.idXe })
                    .then(count => {
                        if (count == 0) {
                            Car.findByIdAndUpdate(req.params.idXe, { $set: { status: 'still' } })
                                .then(() => res.redirect('/admin/car/stored'))
                                .catch(next)
                        }
                        else res.redirect('back')
                    })
                    .catch(next)
                
            })
            .catch(next)

    }

    //[GET]/admin/contract
    getContract(req, res, next) {
        Contract.find()
            .then(contracts => {
                res.render('admin/contract', {
                    layout: 'admin',
                    contracts: multipleMongooseToObject(contracts)
                })
            })
            .catch(next)
    }
}

module.exports = new AdminController();
