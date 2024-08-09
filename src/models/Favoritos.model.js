const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoritoSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }]
});

const Favoritos = mongoose.model('Favoritos', favoritoSchema);
module.exports = Favorito;
