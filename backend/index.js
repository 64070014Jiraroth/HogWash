const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')

const app = express();

const cors = require('cors')
const { logger } = require('./middlewares')
  
app.use(logger)
app.use(cors())

// // set the view engine to ejs
// app.set('view engine', 'ejs')
// // set root folder for views
// app.set('views', path.join(__dirname, 'views'))

// // Statics
// app.use(express.static(path.join(__dirname, 'static')))
// app.use(express.json())


// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const historyRouter = require('./routes/history')
const contactRouter = require('./routes/contact')
const feedbackRouter = require('./routes/feedback') 

app.use(indexRouter.router)
app.use(userRouter.router)
app.use(historyRouter.router)
app.use(feedbackRouter.router)

app.use(express.json())

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})