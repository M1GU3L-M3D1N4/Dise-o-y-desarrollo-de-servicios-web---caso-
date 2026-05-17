// constantes de la aplicación para el registro de usuarios utilizando Express.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(__dirname));

// Ruta explícita para servir el index desde la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Objeto para almacenar los usuarios registrados (en memoria)
let users = {
    user: '',
    password: ''
};

// Ruta para manejar el registro de usuarios
app.post('/register', (req, res) => {
    const { user, password } = req.body;
    
    if (!user || !password) {
        return res.status(400).json({ message: 'User and password are required' });
    }

    // Guardar el usuario y la contraseña en el objeto users
    users.user = user;
    users.password = password;

    // Responder con un mensaje de éxito
    res.status(201).json({ message: 'User registered successfully' });
});

// Ruta para manejar el inicio de sesión de los usuarios
app.post('/login', (req, res) => {
    const { user, password } = req.body;

    if (user === users.user && password === users.password) {
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Iniciar el servidor en el puerto especificado y mostrar un mensaje en la consola
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


     
