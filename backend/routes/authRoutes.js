const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // Asegúrate de que la ruta sea correcta

router.post('/register', register);
router.post('/login', login);

module.exports = router;
