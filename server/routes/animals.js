var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/zoo';
var num = require('./random-number');

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM animals', function (err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var animal = req.body;

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
console.log('animalType', animal.animalType);
console.log('number', num(1,100));
    client.query('INSERT INTO animals (name, amount) ' +
                  'VALUES ($1, $2)',
                   [animal.animalType, num(1,100)],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   res.sendStatus(201);
                 });
  });
});

module.exports = router;
