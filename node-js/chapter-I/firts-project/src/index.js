const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();
app.use(express.json());

const customers = [];

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const id = uuid();

  const userAlreadyExists = customers.find(user => user.cpf === cpf);

  if(userAlreadyExists) {
    return response.status(400).json({
      message: "User already exists" 
    });
  }

  customers.push({
    id,
    name,
    cpf,
    statment: []
  });

  console.log('====================================');
  console.log(customers);
  console.log('====================================');

  return response.status(201).send();

});
app.listen(3333);