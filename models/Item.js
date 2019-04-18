
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Item = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  }
},{
    collection: 'items'
});

module.exports = mongoose.model('Item', Item);