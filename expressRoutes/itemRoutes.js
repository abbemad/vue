

let express = require('express');
let app = express();
let itemRoutes = express.Router();

let Item = require('../models/Item');

itemRoutes.route('/add').post(function (req, res) {
  let item = new Item(req.body);
      item.save()
    .then(item => {
    res.status(200).json({'item': 'Item added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


itemRoutes.route('/').get(function (req, res) {
  Item.find(function (err, items){
    if(err){
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
});


itemRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Item.findById(id, function (err, item){
      res.json(item);
  });
});


itemRoutes.route('/update/:id').post(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.name = req.body.name;
      item.price = req.body.price;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});


itemRoutes.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


itemRoutes.route('/details/:id').get(function (req, res) {
  let id = req.params.id;
  Item.findById(id, function (err, item){
      res.json(item);
  });
});

module.exports = itemRoutes;