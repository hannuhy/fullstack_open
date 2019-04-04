const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());

morgan.token('body', function (req, res) { return req.method === 'POST' ? JSON.stringify(req.body) : '' });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  {
    "name": "Arto HellasX",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 4
  }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  
  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    });
  } else if (persons.find(person => person.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 99999999999)
  }

  persons = persons.concat(person);
  res.json(person);
});

app.get('/info', (req, res) => {
  const html = `<div><p>Puheliluettelossa on ${persons.length} henkilön tiedot</p><p>${new Date().toISOString()}</p></div>`;
  res.send(html);
});

// no route handler for request url
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  