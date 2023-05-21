const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./routes/index')
const db = require('./config/db/index')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const { mongooseViewPrice } = require('./util/mongoose')
const { slogan } = require('./util/mongoose')
const { formatDate } = require('./util/mongoose')

app.use(cookieParser())

db.connect();

app.use(methodOverride('_method'))


app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.engine(
    'hbs', 
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            price: (gia) => mongooseViewPrice(gia),
            slogan: (input) => slogan(input),
            isEqual: (value1,value2,options)=> value1 === value2,
            formatDate: (date) => formatDate(date)
        }
    }),
)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, 'public')));

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})