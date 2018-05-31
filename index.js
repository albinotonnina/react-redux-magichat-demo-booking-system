const http = require('http')
const express = require('express')
const path = require('path')

const app = express()
app.server = http.createServer(app)

app.use(express.static(__dirname + '/dist'))

app.server.listen(process.env.PORT || 5000)
console.log(`Server started on port ${app.server.address().port}`)

module.exports = app
