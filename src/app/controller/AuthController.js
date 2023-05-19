const User = require('../models/User')
const Admin = require('../models/Admin')
const { multipleMongooseToObject } = require('../../util/mongoose')

class AuthController {
    //[GET]/
    index(req, res, next) {
        res.render('authentication/login', { layout: 'login' })
    }

    //[GET]/register
    register(req, res, next) {
        res.render('authentication/register', { layout: 'login' })
    }

    //[POST]/check (signup)
    check(req, res, next) {
        var value = req.body.user + ' ' + req.body.password;

        User.findOne({ user: req.body.user })
            .then(user => {
                if (user) {
                    res.render('authentication/register', {
                        layout: 'login',
                        error: 'Tài khoản đã tồn tài. Vui lòng đăng nhập !!',
                        values: req.body
                    })
                }
                else {
                    if (req.body.password === req.body.repassword) {
                        res.render('authentication/infomation', {
                            layout: 'login',
                            values: value
                        })
                    }
                    else {
                        res.render('authentication/register', {
                            layout: 'login',
                            error: 'Vui lòng xác nhận lại mật khẩu !!',
                            values: req.body
                        })
                    }
                }
            })
            .catch(next)
    }

    //[POST]/signup/:value
    signup(req, res, next) {
        const arr = req.params.value.split(' ')
        const user = arr[0]
        const passwordd = arr[1]

        const userr = new User({
            user: user,
            sdt: req.body.sdt,
            password: passwordd,
            ten: req.body.ten,
            tuoi: req.body.tuoi,
            diachi: req.body.diachi,
        })
        userr.save()
            .then(() => {
                res.cookie('user', user)
                res.redirect('/home')
            })
            .catch(next)
    }

    //[POST]/login
    login(req, res, next) {
        Promise.all([Admin.findOne({ user: req.body.user }), User.findOne({ user: req.body.user })])
            .then(([admins, users]) => {
                
                if (admins && admins.password === req.body.password) {
                    res.cookie('admin', admins.user, { maxAge: 90000000000, httpOnly: true })
                    res.redirect('/admin/car/stored')

                } else {
                    if (!users) {
                        res.render('authentication/login', {
                            layout: 'login',
                            error: 'Tài khoản không tồn tại',
                            user: req.body.user,
                            password: req.body.password
                        });
                    } else {
                        if (req.body.password !== users.password) {
                            res.render('authentication/login', {
                                layout: 'login',
                                error: 'Mật khẩu sai',
                                user: req.body.user,
                                password: req.body.password
                            });
                        }
                        else {
                            res.cookie('user', users.user, { maxAge: 90000000000, httpOnly: true })
                            res.redirect('/home')
                        }
                    }
                }

            })
            .catch(next)
    }

    //[GET]/logout
    logout(req, res, next) {
        res.clearCookie('user');
        res.redirect('/')
    }

    //[GET]/logoutAdmin
    logoutAdmin(req, res, next) {
        res.clearCookie('admin');
        res.redirect('/')
    }
}

module.exports = new AuthController();
