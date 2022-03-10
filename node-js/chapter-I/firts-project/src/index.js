const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();
app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if(!customer) {
    return response.status(400).json({
      message: "Customer not found " 
    });
  }

  request.customer = customer

  return next();
}

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

  return response.status(201).send();
});

app.get('/statment', verifyIfExistsAccountCPF, (request, response) => {
  const customer = request.customer;

  return response.json({
    statment: customer.statment,
  });
});

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;
  const customer = request.customer;

  const statmentOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  }

  customer.statment = [...customer.statment, statmentOperation] 

  return response.status(201).send();
});

app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const customer = request.customer;

  if (customer.statment.length === 0) {
    return response.status(400).json({ error: 'You not have enough balance' })
  }

  const credits = customer.statment.map(statment => {
    if (statment.type === 'credit'){
      return statment.amount
    }
  })

  const balance = credits.reduce((accumulator, credit) => {
    return accumulator += credit;
  })

  if (amount > balance) {
    return response.status(400).json({ error: 'You not have enough balance' })
  }

  const statmentOperation = {
    amount,
    created_at: new Date(),
    type: 'debit',
    balance: balance - amount,
  }
  
  customer.statment = [...customer.statment, statmentOperation] 

  return response.status(201).send();
});



app.listen(3333);