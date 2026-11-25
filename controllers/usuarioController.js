const Usuario = require('../models/Usuario');

// 7. POST /api/usuarios/registro - Registrar usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json({ status: 'OK', message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(400).json({ status: 'Error', error: error.message });
  }
};

// 8. POST /api/usuarios/login - Autenticar usuario
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    res.json({ 
      status: 'OK', 
      token: 'mock-jwt-token-adso-2026', 
      usuario: { email: usuario.email } 
    });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
};

// 9. GET /api/usuarios - Listar usuarios (sin contraseña)
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-password');
    res.json({ status: 'OK', data: usuarios });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
};