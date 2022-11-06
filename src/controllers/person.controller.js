import service from '../service/person.service.js';

export const addPerson = async (_req, res) => {
  try {
    const person = await service.postPerson(_req);
    return res.status(201).json({
      message: 'Handling POST requests to /person',
      createdPerson: person,
    });
  } catch (error) {
    const { message } = error;
    return res.status(404).json({
      message,
    });
  }
};

export const seePerson = async (_req, res) => {
  try {
    const person = await service.getPerson(_req.params.id);
    return res.status(200).json({
      message: 'Processing of the GET response by DNI to /person',
      response: person,
    });
  } catch (error) {
    const { message } = error;
    return res.status(404).json({
      message,
    });
  }
};

export const seePeople = async (_req, res) => {
  try {
    const people = await service.getPeople(_req.query);
    return res.status(200).json({
      message: 'Processing of the GET response by DNI to /person',
      response: people,
    });
  } catch (error) {
    const { message } = error;
    return res.status(404).json({
      message,
    });
  }
};

export const eliminateThePerson = async (_req, res) => {
  try {
    const person = await service.deletePerson(_req.params.id);
    return res.status(200).json({
      message: 'Processing of the Delete response by DNI to /person',
      response: person,
    });
  } catch (error) {
    const { message } = error;
    return res.status(404).json({
      message,
    });
  }
};

export const updatePersonalData = async (_req, res) => {
  try {
    const person = await service.patchPerson(_req);
    return res.status(200).json({
      message: 'Processing of the Patch response by DNI to /person',
      response: person,
    });
  } catch (error) {
    const { message } = error;
    return res.status(404).json({
      message,
    });
  }
};
