import Person from '../schemas/person.schema.js';

const postPerson = async (data) => {
  const { name, surname, age, dni, email } = data.body;
  const person = await Person.findOne({ dni });
  if (person) throw new Error('Person already exist!');
  const newPerson = new Person({
    name,
    surname,
    age,
    dni,
    email,
  });

  newPerson.createdBy.idAdm = data.user.id;
  newPerson.createdBy.name = data.user.name;
  newPerson.createdBy.surname = data.user.surname;
  newPerson.createdBy.dni = data.user.dni;

  await newPerson.save();
  return newPerson;
};

const getPeople = async (query) => {
  const { q } = query;
  let people;
  const expr = new RegExp(`${q}`);

  if (q) {
    people = await Person.find({
      $or: [{ name: { $regex: expr } }, { surname: { $regex: expr } }, { dni: { $regex: expr } }],
    });
  } else {
    people = await Person.find();
  }
  if (!people) throw new Error('No found people');
  return people;
};

const getPerson = async (id) => {
  const person = await Person.findOne({ dni: id });
  if (!person) throw new Error('no found person');
  return person;
};

const deletePerson = async (id) => {
  const person = await Person.deleteOne({ dni: id });
  if (!person) throw new Error('no found person');
  return person;
};

const patchPerson = async (data) => {
  const { id } = data.params;
  const person = await Person.findOneAndUpdate(id, data.body);
  if (!person) throw new Error('no found person');
  return person;
};

const service = {
  postPerson,
  getPeople,
  getPerson,
  deletePerson,
  patchPerson,
};

export default service;
