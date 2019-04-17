const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}
let mode = "listAll";
let name;
let number;
const password = process.argv[2]

if (process.argv.length === 5) {
  name = process.argv[3];
  number = process.argv[4];
  mode = "add";
} else if (process.argv.length !== 3) {
  console.log('give only password or password with person information as an argument');
  process.exit(1);
}

const url =
  `mongodb+srv://fullstack:${password}@cluster0-nrjvt.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (mode === 'listAll') {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (mode === 'add') {
  const person = new Person({
    name,
    number
  });
  
  person.save().then(response => {
    console.log('person saved!');
    mongoose.connection.close();
  });
}
