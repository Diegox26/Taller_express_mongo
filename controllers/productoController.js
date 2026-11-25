const Producto = require('../models/Producto');

// 1. POST /api/productos - Crear producto
exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const guardado = await nuevoProducto.save();
    res.status(201).json({ status: 'OK', data: guardado });
  } catch (error) {
    res.status(400).json({ status: 'Error', error: error.message });
  }
};

// 2. GET /api/productos - Listar todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find().sort({ fechaCreacion: -1 });
    res.json({ status: 'OK', total: productos.length, data: productos });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
};

// 3. GET /api/productos/:id - Obtener producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ status: 'OK', data: producto });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
};

// 4. PUT /api/productos/:id - Actualizar producto
exports.actualizarProducto = async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!actualizado) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ status: 'OK', data: actualizado });
  } catch (error) {
    res.status(400).json({ status: 'Error', error: error.message });
  }
};

// 5. DELETE /api/productos/:id - Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ message: 'No existe el producto' });
    res.json({ status: 'OK', message: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
};

// 6. GET /api/productos/categoria/:cat - Filtrar por categoría
exports.filtrarPorCategoria = async (req, res) => {
  try {
    const productos = await Producto.find({ categoria: req.params.cat });
    res.json({ status: 'OK', categoria: req.params.cat, data: productos });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
};