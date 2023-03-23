const User = require('../models/User')
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
        var value = req.body.sdt + ' ' + req.body.password;

        User.findOne({ sdt: req.body.sdt })
            .then(user => {
                if (user) {
                    res.render('authentication/register', {
                        layout: 'login',
                        error: 'Số điện thoại đã tồn tài. Vui lòng đăng nhập !!',
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
        const sdtt = arr[0]
        const passwordd = arr[1]

        const user = new User({
            sdt: sdtt,
            password: passwordd,
            ten: req.body.ten,
            tuoi: req.body.tuoi,
            diachi: req.body.diachi,
        })
        user.save()
            .then(() => {
                res.cookie('sdtlogin',sdtt)
                res.redirect('/home')
            })
            .catch(next)
    }

    //[POST]/login
    login(req, res, next) {
        User.findOne({ sdt: req.body.sdt })
            .then(users => {
                if (!users) {
                    res.render('authentication/login', {
                        layout: 'login',
                        error: 'Tài khoản không tồn tại',
                        sdt: req.body.sdt,
                        password: req.body.password
                    });
                } else {
                    if (req.body.password !== users.password) {
                        res.render('authentication/login', {
                            layout: 'login',
                            error: 'Mật khẩu sai',
                            sdt: req.body.sdt,
                            password: req.body.password
                        });
                    }
                    else {
                        res.cookie('sdtlogin', users.sdt, { maxAge: 900000, httpOnly: true })
                        res.redirect('/home')
                    }
                }
            })
            .catch(next)
    }

    //[GET]/logout
    logout(req, res, next) {
        res.clearCookie('sdtlogin');
        res.redirect('/')
    }
}

module.exports = new AuthController();
