require('dotenv').config();
const express = require('express')
const app = express()
const port = 3000

const token = process.env.TOKEN

const axios = require('axios').create({
  baseURL: 'https://slack.com',
  headers: {
    post: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }
})

app.listen(port, () => console.log(`Service listening at http://localhost:${port}`))

app.all('/', (_, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
})

app.post('/lunch', (_, res) => {
  
  // Get unix timestamp one hour from now
  const exp = new Date().setHours(new Date().getHours() + 1) / 1000
  
  const data = {
    profile: {
      status_text: 'Lunchrast',
      status_emoji: ':knife_fork_plate:',
      status_expiration: exp
    }
  }
  
  axios.post('/api/users.profile.set', data)
    .then(() => {
      console.log('Lunchrast');
    })
    .catch(err => {
      console.log('error: ', err);
    })
    res.send()
})


