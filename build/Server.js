var express = require('express');
var app = express();
var mongoose = require('mongoose');
var collections = ["gebruikers","blurays"];
var connection = require('./connection');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

mongoose.connect(connection.connectionString);



app.get('/gebruikers', function (req, res) {
  console.log('I received a GET request');

  db.gebruikers.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.get('/blurays', function (req, res) {
  console.log('I received a GET request');

  db.blurays.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});


app.post('/blurays', function (req, res) {
  console.log(req.body);
  db.blurays.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.post('/gebruikers', function (req, res) {
  console.log(req.body);
  db.gebruikers.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});



app.delete('/blurays/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.blurays.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/blurays/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.blurays.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/blurays/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.blurays.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {titel: req.body.titel, genre: req.body.genre, beoordeling: req.body.beoordeling, kostprijs: req.body.kostprijs, voornaamste_acteur: req.body.voornaamste_acteur, voornaamste_actrice: req.body.voornaamste_actrice, youtubelink: req.body.youtubelink}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

var Port = process.env.PORT || 3000;
app.listen(Port);
console.log("server running on port " + Port);