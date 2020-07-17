require('dotenv').config();
const express = require('express')
const https = require('https')
const fs = require('fs')
const app = express()
const port = 443

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


// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/hallon1.ddns.net/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/hallon1.ddns.net/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/hallon1.ddns.net/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () => console.log(`Service listening at https://localhost:${port}`));
// app.listen(port, () => console.log(`Service listening at http://localhost:${port}`))

app.post('/lunch', (_, response) => {
  
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
    response.send()
})


