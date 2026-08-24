const express = require("express");

const router = express.Router();

// ─── Tarefa C — Sugestões de compra + votação ─────────────────────────────────
// Armazenamento EM MEMÓRIA (não use banco de dados neste trabalho).
const sugestoes = [];
let proximoId = 1;

// GET /sugestoes — lista as sugestões, cada uma com sua contagem de votos.
router.get("/", (req, res) => {
  res.status(200).json(sugestoes);
});

// POST /sugestoes — cria uma sugestão { titulo } (TEXTO), começando com 0 votos.
router.post("/", (req, res) => {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
    return res.status(400).json({ erro: "O campo 'titulo' é obrigatório." });
  }

  const novaSugestao = {
    id: proximoId++,
    titulo: titulo.trim(),
    votos: 0,
  };

  sugestoes.push(novaSugestao);
  return res.status(201).json(novaSugestao);
});

// POST /sugestoes/voto — registra um voto na sugestão de id informado { id }.
router.post("/voto", (req, res) => {
  const { id } = req.body;

  if (id === undefined || id === null) {
    return res.status(400).json({ erro: "O campo 'id' é obrigatório." });
  }

  const sugestao = sugestoes.find((item) => item.id === Number(id));

  if (!sugestao) {
    return res.status(400).json({ erro: "Sugestão não encontrada." });
  }

  sugestao.votos += 1;
  return res.status(200).json(sugestao);
});

module.exports = router;