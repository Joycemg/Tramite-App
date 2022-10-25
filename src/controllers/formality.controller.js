import Formality from '../schemas/formality.schema.js';
import Person from '../schemas/person.schema.js';

export const getFormalityByID = async (_req, res) => res.json({ errr: 'test' });

export const insertFormality = async (_req, res) => {
  const { title, description, email } = _req.body;
  const person = await Person.findOne({ email });
  if (!person) return res.status(404).json({ error: { message: 'Email does not exist!' } });

  const newFormality = new Formality({
    title,
    description,
  });

  newFormality.createdBy = person.id;
  try {
    const formality = await newFormality.save();

    const { _doc } = { ...formality };

    // console.log(formality.createdAt.toLocaleDateString('en-US'));
    return res.status(200).json({
      message: 'Handling POST requests to /formality',
      response: {
        ..._doc,
        createdAt: _doc.createdAt.toLocaleDateString('en-US'),
      },
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
