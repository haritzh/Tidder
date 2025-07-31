const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)

app.listen(port, () => {
  console.log(`(6000 / 2) - (50 * 1) + (100 % 50) + (2500 / 50) = ${port}`);
})