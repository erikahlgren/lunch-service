const express = require('express')
// const https = require('https')
// const fs = require('fs')
const app = express()
const port = 8888
const token = process.env.TOKEN

const axios = require('axios').create({
  baseURL: 'https://slack.com',
  headers: {
    post: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + token
    }
  }
})

// const privateKey = fs.readFileSync('./cert/server.key', 'utf8');
// const certificate = fs.readFileSync('./cert/server.crt', 'utf8');
// const credentials = {
//   key: privateKey,
//   cert: certificate
//   };
// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(port);
app.listen(port, () => console.log(`Service listening at http://localhost:${port}`))

app.post('/lunch', (_, response) => {
  console.log('get lunch')
  const exp = new Date().setHours(new Date().getHours() + 1)

  const data = {
    profile: {
      status_text: 'Lunch',
      status_emoji: ':knife_fork_plate:',
      status_expiration: exp
    }
  }

  axios.post('/api/users.profile.set', data)
    .then(res => {
      console.log(res.body);
    })
    .catch(err => {
      console.log('error: ', err);
    })
    response.send('Lunch!')
})


