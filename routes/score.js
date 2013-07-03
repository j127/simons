var mongo = require('mongodb');

var Server = mongo.Server,
  Db = mongo.Db,
  BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('simons', server);

db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'simons' database");
    db.collection('scores', {strict:true}, function(err, collection) {
      if(err) {
        console.log("The 'scores' collection doesn't exist. Check your code...");
        // populateDB();
      }
    });
  }
});

exports.addScore = function(req, res) {
  var score = req.body;
  console.log("Received: " + score);
  console.log('Adding score: ' + score);
  db.collection('scores', function(err, collection) {
    collection.insert(score, {safe:true}, function(err, result) {
      if(err) {
        res.send({'error':'An error has occured'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
}

