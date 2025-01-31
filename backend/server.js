const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes'); // Asegúrate de que la ruta sea correcta
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
