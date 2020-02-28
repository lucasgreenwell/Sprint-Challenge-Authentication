const router = require('express').Router();
const cors = require('cors')
const bcrypt = require('bcryptjs')
const session = require('express-session');

const db = require('../database/dbConfig');

router.post('/register', (req, res) => {
  // implement registration

  if (!req.body.username || !req.body.password) {
    res.status(400).json({ err: 'include all required fields' })
  } else {

    const hash = bcrypt.hashSync(req.body.password, 12)
    req.body.password = hash;
    db('users').insert(req.body)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err: "look, we aren't happy about this either" })
      })
  }
});

router.post('/login', (req, res) => {
  // implement login
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ err: 'include all required fields' })
  } else {
    db('users').select('*').where({ username: req.body.username })
      .then(user => { 
        if (user) {
          // console.log(user)
          if (bcrypt.compareSync(req.body.password, user[0].password)) {
            req.session.user = user[0]
            req.session.loggedIn = true;
            res.status(200).json({ message: 'success' })
          }
          else {
            res.status(403).json({ message: 'invalid credentials' })
          }
        }
        else {
          res.status(403).json({ message: 'invalid credentials' })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err: "look, we aren't happy about this either" })
      })
  }
});

module.exports = router;
