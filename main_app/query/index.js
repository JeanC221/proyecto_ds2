require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Configurar OpenAI
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servicio de consultas funcionando!');
});

// Endpoint para consultas en lenguaje natural
app.post('/consulta', async (req, res) => {
  const { pregunta } = req.body;

  if (!pregunta) {
    return res.status(400).json({ error: 'Falta la pregunta' });
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: pregunta }],
    });

    res.json({ respuesta: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la consulta' });
  }
});

app.listen(port, () => {
  console.log(`Servicio de consultas en http://localhost:${port}`);
});
