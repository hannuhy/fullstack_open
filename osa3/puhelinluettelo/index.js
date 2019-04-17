if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());

// logger
morgan.token('body', (req) => { return req.method === 'POST' ? JSON.stringify(req.body) :  ''; });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    });
  }


  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON());
  })
    .catch(error => next(error));
});

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    const html = `<div><p>Puheliluettelossa on ${persons.length} henkilön tiedot</p><p>${new Date().toISOString()}</p></div>`;
    res.send(html);
  });
});

// no route handler for request url
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
};
app.use(unknownEndpoint);

// error handler
const errorHandler = (error, request, response, next) => {
  console.log('error: ', error);
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});