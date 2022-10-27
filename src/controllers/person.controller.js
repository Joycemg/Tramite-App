import Person from '../schemas/person.schema.js';
// import Procedure from '../schemas/procedure.schema.js';

// export const search = async (_req, res) => {
//   return;
// };

export const getPeople = async (_req, res) => {
  const { q } = _req.query;

  let people;
  const expr = new RegExp(`${q}`);

  try {
    if (q) {
      people = await Person.find({
        $or: [
          { name: { $regex: expr } },
          { surname: { $regex: expr } },
          { email: { $regex: expr } },
        ],
      });
    } else {
      people = await Person.find();
    }
    return res.status(200).json({
      message: 'Processing of the search response to /people',
      response: people,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
  // const procedures = await Procedure.find({});
};

export const getPersonByID = async (_req, res) => {
  const { id } = _req.params;
  try {
    const person = await Person.findOne({ _id: id });

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
    const person = await Person.findOneAndUpdate({ _id: id }, _req.body);
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
