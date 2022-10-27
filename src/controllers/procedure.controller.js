/* eslint-disable max-len */
import Procedure from '../schemas/procedure.schema.js';
import Person from '../schemas/person.schema.js';

// export const getProcedures = async (_req, res) => {
//   const { id } = _req.params;
//   try {
//     const procedures = await Procedure.find({ createdBy: id });
//     return res.status(200).json({
//       message: 'Processing of the GET response by ID to /procedure',
//       response: procedures,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       message: error,
//     });
//   }
// };

export const getProcedures = async (_req, res) => {
  const { id } = _req.params;

  try {
    let procedures = await Procedure.find({ type: id }).populate('createdBy');
    if (!procedures.length) {
      procedures = await Procedure.find({ createdBy: id }).populate('createdBy');
    }

    return res.status(200).json({
      message: 'Processing of the GET response by ID to /procedures',
      response: procedures,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
export const getProcedureByID = async (_req, res) => {
  const { id } = _req.params;
  try {
    const procedure = await Procedure.findById(id).populate('createdBy');
    return res.status(200).json({
      message: 'Processing of the GET response by ID to /procedure',
      response: procedure,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

export const insertProcedure = async (_req, res) => {
  const { title, description, type, email } = _req.body;
  const person = await Person.findOne({ email });
  if (!person) return res.status(404).json({ error: { message: 'Email does not exist!' } });

  const newProcedure = new Procedure({
    title,
    description,
    type,
  });

  newProcedure.createdBy = person.id;
  try {
    const procedure = await newProcedure.save();

    const { _doc } = { ...procedure };

    // console.log(formality.createdAt.toLocaleDateString('en-US'));
    return res.status(200).json({
      message: 'Handling POST requests to /Procedure',
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

export const updateProcedureById = async (_req, res) => {
  const { id } = _req.params;

  try {
    const procedure = await Procedure.findOneAndUpdate({ _id: id }, _req.body);
    return res.status(200).json({
      message: 'Management of PATCH requests by id on /precedure',
      updateProcedure: { id: procedure.id, ..._req.body },
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

export const deleteProcedureById = async (_req, res) => {
  const { id } = _req.params;
  try {
    const procedure = await Procedure.findByIdAndRemove(id);
    if (!procedure) {
      return res.status(404).json({ success: false, person: 'No found' });
    }
    return res.status(200).json({ success: true, delete: procedure });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
