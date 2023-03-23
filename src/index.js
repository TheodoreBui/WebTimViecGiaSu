const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./routes/index')
const db = require('./config/db/index')
const cookieParser = require('cookie-parser')


app.use(cookieParser())

db.connect();

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