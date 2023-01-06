const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/react'
mongoose.connect(url, { useNewUrlParser: true })

const connection = mongoose.connection
connection.once('open', _ => {
  console.log('Database connected')
})

connection.on('error', err => {
  console.error('connection error:', err)
})


module.exports = mongoose;