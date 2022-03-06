const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();
app.use(express.json());

const customers = [];

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.find(customer => customer.cpf === cpf);

  if(customerAlreadyExists) {
    return response.status(400).json({
      message: "User already exists" 
    });
  }

  customers.push({
    id: uuid(),
    name,
    cpf,
    statment: []
  });

  console.log('====================================');
  console.log(customers);
  console.log('====================================');

  return response.status(201).send();
});

app.get('/account/:id', (request, response) => {

  const customer = customers.map(customer => customer.id === id);

  statment = customer.statment;

  return response.json({
    statment: statment
  });
});


app.listen(3333);