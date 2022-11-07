import Procedure from '../schemas/procedure.schema.js';
import Person from '../schemas/person.schema.js';

const postProcedure = async (data) => {
  const { title, description, type } = data.body;
  const { id } = data.params;
  const person = await Person.findOne({ dni: id });
  if (!person) throw new Error('no found person');

  const procedures = await Procedure.findOne({
    title,
    closingDate: { $type: 'null' },
    key: id,
  }).populate({
    path: 'from',
  });

  if (procedures) throw new Error('a procedure is already underway');

  const newProcedure = new Procedure({
    title,
    description,
    type,
  });

  newProcedure.from = person.id;
  newProcedure.key = id;
  newProcedure.closingDate = null;
  const procedure = await newProcedure.save();
  return procedure;
};

const getProcedures = async (data) => {
  const { t, q } = data.query;
  let procedures;
  const expr = new RegExp(`${t}`);
  const expr2 = new RegExp(`${q}`);

  if (q && t) {
    procedures = await Procedure.find({
      type: { $regex: expr },
      title: { $regex: expr2 },
    }).populate('from');
  } else if (q || t) {
    procedures = await Procedure.find({
      $or: [{ type: { $regex: expr } }, { title: { $regex: expr2 } }],
    }).populate('from');
  } else {
    procedures = await Procedure.find().populate('from');
  }

  if (!procedures.length) throw new Error('no found procedure');

  return procedures;
};

const getProceduresByPerson = async (data) => {
  const { id } = data;
  const procedures = await Procedure.find({ key: id }).populate({ path: 'from' });
  if (!procedures.length) throw new Error('no found procedures');
  return procedures;
};

const patchProcedures = async (data) => {
  const { id } = data.params;
  const { t } = data.query;
  let { body } = data;

  if (!Object.keys(body).length) throw new Error('empty body');

  const date = new Date();
  let procedure = await Procedure.findOne({
    key: id,
    title: t,
    closingDate: { $type: 'null' },
  }).populate({
    path: 'from',
  });

  if (!procedure) throw new Error('no found procedures');

  const uax = body?.closingDate;
  body = uax ? { ...body, closingDate: date } : body;
  procedure = await Procedure.findByIdAndUpdate(procedure.id, body);
  return procedure;
};

const deleteProcedure = async (data) => {
  const { id } = data.params;
  const { t } = data.query;

  let procedure = await Procedure.findOne({
    key: id,
    title: t,
    closingDate: { $type: 'null' },
  }).populate({
    path: 'from',
  });

  if (!procedure) throw new Error('no found procedures');

  procedure = await Procedure.findByIdAndRemove(procedure.id);
  return procedure;
};

const service = {
  getProcedures,
  postProcedure,
  patchProcedures,
  getProceduresByPerson,
  deleteProcedure,
};

export default service;
