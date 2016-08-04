const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userController = require('./controllers/user_controller')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, User-Email, Auth-Token')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
  next()
})

mongoose.connect(process.env.MONGODB_URI)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to our Co-founders API',
    'IMPORTANT': 'Note that our API, for login areas, verifies through the User-Email and a Auth-Token generated upon signup. To receive more information, please contact us.',
    'User Routes': {
      'POST /signup': 'For user signup',
      'POST /signin': 'For user login',
      'PUT /profile': 'Edit user profile'
    }
  })
})

// User routes
app.post('/signup', userController.signUp)
app.post('/signin', userController.signIn)
app.put('/profile', userController.userLoggedIn, userController.editUser)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

module.exports = app
