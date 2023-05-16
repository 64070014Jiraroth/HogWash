const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')

const app = express();
var cors = require('cors')

app.use(cors())

// // set the view engine to ejs
// app.set('view engine', 'ejs')
// // set root folder for views
// app.set('views', path.join(__dirname, 'views'))

// // Statics
app.use(express.static(path.join(__dirname, 'static')))

// // Encode body
// app.use(bodyParser.urlencoded({ extended: false}));


// app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Statics
// app.use(express.static('static'))
// app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const historyRouter = require('./routes/history')
const contactRouter = require('./routes/contact')

app.use(indexRouter.router)
app.use(loginRouter.router)
app.use(historyRouter.router)
app.use(contactRouter.router)

app.use(express.json())

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})