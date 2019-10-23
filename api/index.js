const express = require('express')
const app = express()
require('dotenv').config()

// mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.error(err)
  console.log('mongoose connected!')
});



// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));



// passport
const passport = require('./user/userPassport.js')
const session = require('express-session')
app.use(passport.initialize())
app.use(passport.session())



// 라우팅 등록
app.use('/user', require('./user/index.js'))
app.use('/product', require('./product/index.js'))
app.use('/comment', require('./comment/index.js'))

module.exports = {
  path: '/api',
  handler: app
}
