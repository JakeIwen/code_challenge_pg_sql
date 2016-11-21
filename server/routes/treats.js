var express = require('express');
var router = express.Router();
var pg = require('pg');
var bodyParser = require('body-parser');

var config = {
  database: 'treats',
};

var pool = new pg.Pool(config);

router.get('/:id', function (req, res) {
  searchTerm = req.params.id;
  console.log('search term:', searchTerm);
  pool.connect()
  .then(function (client) {
    client.query('SELECT * FROM treats WHERE name LIKE $1', [searchTerm])
      .then(function (result) {
        client.release();
        res.send(result.rows);
    });
  })
  .catch(function (err) {
    console.log('error on SELECT', err);
    res.sendStatus(500);git 
  });
});

router.get('/', function (req, res) {
  pool.connect()
  .then(function (client) {
    client.query('SELECT * FROM treats')
      .then(function (result) {
        client.release();
        res.send(result.rows);
    });
  })
  .catch(function (err) {
    console.log('error on SELECT', err);
    res.sendStatus(500);
  });
});

router.post('/', function (req, res) {
  var treat = req.body;
  pool.connect()
  .then(function (client) {
    client.query('INSERT INTO treats (name, description, pic) VALUES($1, $2, $3)', [treat.name, treat.description, treat.url])
      .then(function () {
        client.release();
        res.sendStatus(201);
    });
  })
  .catch(function (err) {
    res.sendStatus(500);
  });
});

//
// router.patch('/:id', function (req, res) {
//   var treat = req.body;
//   var treatId = req.params.id;
//
//   pool.connect()
//     .then(function (client) {
//       client.query('UPDATE treats ' +
//       'SET completed = $1 ' +
//       'WHERE id = $2', [treat.completed, treatId])
//         .then(function () {
//           client.release();
//           res.sendStatus(204);
//         });
//     })
//     .catch(function (err) {
//       res.sendStatus(500);
//     });
// });
//
// router.delete('/:id', function (req, res) {
//   var treatId = req.params.id;
//
//   pool.connect()
//     .then(function (client) {
//       client.query('DELETE FROM treats ' +
//       'WHERE id = $1', [treatId])
//         .then(function () {
//           client.release();
//           res.sendStatus(204);
//         });
//     })
//     .catch(function (err) {
//       res.sendStatus(500);
//     });
// });

module.exports = router;
