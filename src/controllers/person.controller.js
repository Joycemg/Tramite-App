import Person from '../schemas/person.schema.js';

export const getPeople = async (_req, res) => {
  const people = await Person.find({});
  return res.status(200).send(people);
};

export const getPersonByID = async (_req, res) => {
  const { id } = _req.params;
  try {
    const person = await Person.findById(id);
    return res.status(200).json({
      message: 'Processing of the GET response by ID to /person',
      response: person,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

export const deletePersonByID = async (_req, res) => {
  const { id } = _req.params;
  try {
    const person = await Person.findByIdAndRemove(id);
    if (!person) {
      return res.status(404).json({ success: false, person: 'No found' });
    }
    return res.status(200).json({ success: true, delete: person });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

export const updatePersonByEmail = async (_req, res) => {
  const { id } = _req.params;
  try {
    const person = await Person.findOneAndUpdate({ email: id }, _req.body);
    return res.status(200).json({
      message: 'Management of PATCH requests by email on /person',
      updatePerson: { id: person.id, ..._req.body },
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

// export const login = () => {
//   return;
// };

export const register = async (req, res) => {
  const { name, surname, age, email, password } = req.body;
  const person = await Person.findOne({ email });
  if (person) return res.status(403).json({ error: { message: 'Email already in use!' } });
  const newUser = new Person({
    name,
    surname,
    age,
    email,
    password,
  });
  try {
    await newUser.save();
    return res.status(201).json({
      message: 'Handling POST requests to /register',
      createdPerson: newUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
