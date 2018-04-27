var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.post('/notes', (req, res) => {
    const note = {
      text: req.body.body,
      title: req.body.title
    }  
    db.collection('blogs').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });


    app.get('/notes/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('blogs').findOne(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send(item);
        } 
      });
    });
  
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id
    const details = { '_id' : new ObjectID(id) };
      db.collection('blogs').deleteOne(details, (err, item) => {
        if(err){
          res.send({'error': 'is happen again bro..'})
        }else{
          res.send("1 document deleted")
        }
      })
  });

  app.get('/notes', (req, res) => {
      db.collection("blogs").find({}).toArray(function(err, result) {
        if(err){
          res.send({'error': 'is happen again bro..'})
        }else{
          res.send(result)
        }
      })
  });

};


