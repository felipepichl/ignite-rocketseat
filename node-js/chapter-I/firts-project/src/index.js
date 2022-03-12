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

function getBalance(statment) {
  const { credit, debit } = statment.reduce((accumulator, document) => {
    switch (document.type) {
      case 'credit':
        accumulator.credit += document.amount;
        break;
      case 'debit':
        accumulator.debit += document.amount;
        break;
      default:
        break;
    }
    return accumulator;
  }, {
    credit: 0,
    debit: 0,
  });

  const total = credit - debit;

  return total;
}

function dateFormat(date) {
  try {
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    return formatter.format(new Date(date));
  } catch (error) {
    throw error;
  }
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

app.get('/statment/date', verifyIfExistsAccountCPF, (request, response) => {
  const { date } = request.query;
  const customer = request.customer;

  const statmentByDate = customer.statment.filter(operation => 
    dateFormat(operation.created_at) === dateFormat(date)
  );

  return response.json({
    statmentByDate,
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
  
  const balance = getBalance(customer.statment);

  if (amount > balance) {
    return response.status(400).json({ error: 'You not have enough balance' })
  }

  const statmentOperation = {
    amount,
    created_at: new Date(),
    type: 'debit'
  }
  
  customer.statment = [...customer.statment, statmentOperation] 
  
  return response.status(201).send();
});



app.listen(3333);