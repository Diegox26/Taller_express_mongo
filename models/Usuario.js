const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'El email es obligatorio'], 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: [true, 'La contraseña es requerida'] 
  },
  fechaCreacion: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);