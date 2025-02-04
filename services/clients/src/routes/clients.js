const express = require('express');
const { Client } = require('../models/client');
const router = express.Router();

// Listar todos os clientes
router.get('/', async (req, res) => {
    const clients = await Client.findAll();
    res.json(clients);
});

// Adicionar um cliente
router.post('/', async (req, res) => {
    const { name, phone } = req.body;
    const client = await Client.create({ name, phone });
    res.status(201).json({ message: 'Client created', id: client.id });
});

module.exports = router;