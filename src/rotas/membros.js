const express = require('express');
const router = express.Router();

// Armazenamento em memória
const membros = [];
let proximoId = 1;

// GET /membros - Lista todos os membros
router.get('/', (req, res) => {
  return res.status(200).json(membros);
});

// POST /membros - Cria um novo membro
router.post('/', (req, res) => {
  const { nome, matricula } = req.body;

  // Valida se o corpo possui 'nome' e 'matricula' (ambos devem existir)
  if (!nome || !matricula) {
    return res.status(400).json({ mensagem: 'Nome e matrícula são obrigatórios.' });
  }

  const novoMembro = {
    id: proximoId++,
    nome,
    matricula
  };

  membros.push(novoMembro);

  return res.status(201).json(novoMembro);
});
module.exports = router;