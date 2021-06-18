require('dotenv').config()
const express = require('express')
const qs      = require('qs')
const fetch   = require('node-fetch')
const app     = express()
const port    = 3000

const apiURL  = 'http://api.openweathermap.org/data/2.5/weather'

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const query     = req.query
  query.appid     = process.env.API_KEY
  let queryString = qs.stringify(query)
  fetch(`${apiURL}?${queryString}`)
    .then(response => response.json())
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})