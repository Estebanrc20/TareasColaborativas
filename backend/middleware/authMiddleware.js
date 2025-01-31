const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('Token:', token); // Verificar el token
    if (!token) {
      return res.status(401).json({ error: 'Sin token, autorización denegada' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error de verificación de token:', error); // Log detallado del error
    res.status(401).json({ error: 'El token no es válido' });
  }
};
