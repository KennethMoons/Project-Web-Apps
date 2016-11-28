// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('bluraylist', ['bluraylist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/bluraylist', function (req, res) {
  console.log('I received a GET request');

  db.bluraylist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/bluraylist', function (req, res) {
  console.log(req.body);
  db.bluraylist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});



app.delete('/bluraylist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.bluraylist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/bluraylist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.bluraylist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/bluraylist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.bluraylist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {titel: req.body.titel, genre: req.body.genre, beoordeling: req.body.beoordeling, kostprijs: req.body.kostprijs, voornaamste_acteur: req.body.voornaamste_acteur, voornaamste_actrice: req.body.voornaamste_actrice, youtubelink: req.body.youtubelink}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");