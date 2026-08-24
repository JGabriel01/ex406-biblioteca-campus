const express = require("express");

const router = express.Router();

// ─── Tarefa A — Acervo (Livros) ───────────────────────────────────────────────
// Armazenamento EM MEMÓRIA (não use banco de dados neste trabalho).
const livros = [];
let proximoId = 1;

// GET /livros — lista todos os livros do acervo.
router.get("/", (req, res) => {
  //TODO (Tarefa A): responda com status 200 e o array `livros`.
  res.status(200).json(livros);
});

// POST /livros — cadastra um livro { titulo, autor } (ambos TEXTO/string).
router.post("/", (req, res) => {
  // TODO (Tarefa A):
  //  1. Leia titulo (texto) e autor (texto) de req.body.
  //  2. Se faltar titulo OU autor, responda 400.
  //  3. Crie { id: proximoId++, titulo, autor }, adicione em `livros`
  //     e responda 201 com o livro criado.
  const {titulo, autor} = req.body
  if (!titulo || !autor) {
   return res.status(400).json({error: "Faltando Livro ou Autor."})
  }
  let livro = {
      id: proximoId++,
      titulo,
      autor
  }
  livros.push(livro)
  res.status(201).json(livro);
});

module.exports = router;
