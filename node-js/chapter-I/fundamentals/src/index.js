const express = require('express');


const app = express();
app.use(express.json());

app.get('/courses', (request, response) => {
  const query = request.query;

  console.log(query);
  return response.json(["Curso 01", "Curso 02", "Curso 03"])
})

app.post('/courses', (request, response) => {
  const body = request.body;

  console.log(body);
  return response.json(["Curso 01", "Curso 02", "Curso 03", "Curso 04"])
})

app.put('/courses/:id', (request, response) => {
  const { id } = request.params;

  console.log(id);
  return response.json(["Curso 06", "Curso 02", "Curso 03", "Curso 04"])
})

app.patch('/courses/:id', (request, response) => {
  return response.json(["Curso 06", "Curso 07", "Curso 03", "Curso 04"])
})

app.delete('/courses/:id', (request, response) => {
  return response.json(["Curso 06", "Curso 07", "Curso 04"])
})

app.listen(3333);