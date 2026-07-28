// BioPaper AI — Backend
// Servidor simples em Node.js + Express: calculadora de rendimento,
// cadastro de produtores e registro de resíduos.

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve o frontend estático (a pasta ../frontend)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ---------- "Banco de dados" em memória ----------
// Reinicia sempre que o servidor reinicia. Para persistir de verdade,
// trocar por um arquivo JSON ou um banco (SQLite, MongoDB etc).
let produtores = [];
let residuos = [];
let proximoIdProdutor = 1;
let proximoIdResiduo = 1;

// Base real observada nos testes: 3 kg de casca -> 1 folha de 2mm em 3 semanas
const KG_POR_LOTE = 3;
const SEMANAS_POR_LOTE = 3;
const TAXA_PADRAO = 1 / 3; // folhas por kg

// ---------- Rotas da calculadora (IA 1: estimativa de rendimento) ----------
app.post('/api/estimar', (req, res) => {
  const kg = Number(req.body.kg);
  const taxa = Number(req.body.taxa) || TAXA_PADRAO;
  const modo = req.body.modo === 'sequencial' ? 'sequencial' : 'paralelo';

  if (!Number.isFinite(kg) || kg <= 0) {
    return res.status(400).json({ erro: 'Informe um valor de kg válido e maior que zero.' });
  }

  const folhas = kg * taxa;
  const lotes = Math.ceil(kg / KG_POR_LOTE);
  const tempoSemanas = modo === 'paralelo'
    ? SEMANAS_POR_LOTE
    : lotes * SEMANAS_POR_LOTE;

  res.json({
    kg,
    taxa,
    modo,
    folhas_min: Math.floor(folhas),
    folhas_max: Math.ceil(folhas),
    lotes,
    tempo_semanas: tempoSemanas
  });
});

// ---------- Rotas de produtores ----------
app.get('/api/produtores', (req, res) => {
  res.json(produtores);
});

app.post('/api/produtores', (req, res) => {
  const { nome, contato } = req.body;
  if (!nome) {
    return res.status(400).json({ erro: 'O campo "nome" é obrigatório.' });
  }
  const produtor = { id: proximoIdProdutor++, nome, contato: contato || null };
  produtores.push(produtor);
  res.status(201).json(produtor);
});

// ---------- Rotas de resíduos ----------
app.get('/api/residuos', (req, res) => {
  res.json(residuos);
});

app.post('/api/residuos', (req, res) => {
  const { produtorId, kg } = req.body;
  const kgNum = Number(kg);
  if (!Number.isFinite(kgNum) || kgNum <= 0) {
    return res.status(400).json({ erro: 'Informe um valor de kg válido e maior que zero.' });
  }
  const registro = {
    id: proximoIdResiduo++,
    produtorId: produtorId || null,
    kg: kgNum,
    data: new Date().toISOString()
  };
  residuos.push(registro);
  res.status(201).json(registro);
});

// ---------- Relatório ----------
app.get('/api/relatorio', (req, res) => {
  const totalKg = residuos.reduce((soma, r) => soma + r.kg, 0);
  res.json({
    total_produtores: produtores.length,
    total_registros_residuo: residuos.length,
    total_kg_residuo: totalKg,
    folhas_estimadas_total: Math.round(totalKg * TAXA_PADRAO)
  });
});

app.listen(PORT, () => {
  console.log(`BioPaper AI backend rodando em http://localhost:${PORT}`);
});
