
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Conectar ao banco de dados
mongoose.connect('mongodb://localhost:27017/sitepi', { useNewUrlParser: true, useUnifiedTopology: true });

// Modelo de Usuário
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});
const User = mongoose.model('User', userSchema);

// Rota de Cadastro
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    
    try {
        await user.save();
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (err) {
        res.status(400).send('Erro ao cadastrar: ' + err.message);
    }
});

// Rota de Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).send('Usuário não encontrado.');
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send('Senha inválida.');
    
    const token = jwt.sign({ id: user._id }, 'seu_segredo', { expiresIn: '1h' });
    res.status(200).send({ message: 'Login realizado com sucesso!', token });
});

// Iniciar o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));




fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
})
    .then((response) => response.json())
    .then((data) => {
        localStorage.setItem('token', data.token);
        alert('Login realizado com sucesso!');
    })
    .catch((error) => console.error('Erro:', error));

    // Função para alternar entre as seções
    function showSection(sectionId) {
        // Oculta todas as seções
        document.querySelectorAll('section').forEach(section => section.classList.remove('active'));

        // Mostra apenas a seção selecionada
        document.getElementById(sectionId).classList.add('active');
    }
    // Animação para elementos de entrada
window.onload = function () {
const fadeElements = document.querySelectorAll(".fade-in");
fadeElements.forEach((el, index) => {
    setTimeout(() => {
        el.style.opacity = 1;
    }, index * 200); // Atraso para cada elemento
});
};
function showLoginForm() {
    document.getElementById('login-form').classList.add('active');
}

function showRegisterForm() {
    document.getElementById('register-form').classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}