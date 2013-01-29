
// routes for cats
var Cat = require('../models/cat')

// listing all the cats
exports.list = function(req, res){
  // get the list of cats
  var cat = Cat.find({}).sort('age').exec(function (err, docs) {
    if (err)
      return console.log("error", cat);
    // send it back
    res.render('cats', {cats: docs, title: 'Cats: the database'});
  });
};

// creating a new cat
var names = ["Amy","Rory","River","Clara","Rose","Jack","Mickey","Donna","Martha"];
var colors = ["black","brown","white","orange","gray"];
function randomInt(largest) {
    // returns a random element of a list
    return Math.floor(Math.random()*(largest));
};

exports.create = function(req, res){
  // create the cat
  var randomName = names[randomInt(names.length)];

//get colors
  var randomColors = [];
  var randLen = randomInt(3)+1;
  var i = 0;
  while (i<randLen){
    var newColor = colors[randomInt(colors.length)];
    if (randomColors.indexOf(newColor)){
      randomColors[i] = newColor;
      i++;
    }
  }

//  var randomColor = colors[randomInt(colors.length)];
  var randomAge = randomInt(200)/10;
  var companion = new Cat({ name: randomName, color: randomColors, age: randomAge });
  companion.save(function (err) {
    if (err)
      return console.log("error. The doctor couldn't save the companion. I'm sorry, so sorry.");
    // redirect to the list of users
    res.redirect('/cats');
  });
};

//removing the oldest cat
exports.remove = function(req, res){
  // get the list of cats
  var cat = Cat.findOne().sort('-age').exec(function (err, oldCat) {
    oldCat.remove()
    if (err)
      return console.log("error", cat);
    // send it back
    res.redirect('/cats');
  });
};

// listing cats of a certain color
exports.color = function(req, res){
  // get the list of cats
  var color = req.params.color;
  var cat = Cat.find({"color":color}).sort('age').exec(function (err, docs) {
    if (err)
      return console.log("error", cat);
    // send it back
    res.render('cats', {cats: docs, title: 'Cats: the database'});
  });
};




