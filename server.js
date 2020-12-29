
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
const bodyparser = require('body-parser')
const db = require('./dbParser');


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

// importing routes
app.use('/',require('./routes/user.js'))
app.use('/',require('./routes/book.js'))



app.get('/', function (req, res) {
  Promise.all([db.getAllUsers() ,db.getAllBooks()]).then((values) => {
    res.render('home', {users: values[0], books : values[1]})
  })
})

app.use(function(req, res, next) {
  res.status(404).render('404')
})

app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403)
  res.render('403')
})

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('500')
})

app.listen(port, () => console.log('app is running on http://localhost:' + port))

