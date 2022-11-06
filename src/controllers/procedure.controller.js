import service from '../service/procedure.service.js';

export const seeProcedures = async (_req, res) => {
  try {
    const procedure = await service.getProcedures(_req);

    return res.status(200).json({
      message: 'Processing of the GET response by id on /precedures',
      resp: procedure,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const insertProcedure = async (_req, res) => {
  try {
    const procedure = await service.postProcedure(_req);

    return res.status(200).json({
      message: 'Management of Post requests by id on /precedure',
      resp: procedure,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const seeProcedure = async (_req, res) => {
  try {
    const procedure = await service.getProceduresByPerson(_req.params);

    return res.status(200).json({
      message: 'Processing of the GET response by id on /precedure',
      resp: procedure,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const updateProcedureById = async (_req, res) => {
  try {
    const procedure = await service.patchProcedures(_req);

    return res.status(200).json({
      message: 'Processing of the Patch response by id on /precedure',
      resp: procedure,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const deleteProcedureById = async (_req, res) => {
  try {
    const procedure = await service.deleteProcedure(_req);

    return res.status(200).json({
      message: 'Processing of the delete response by id on /precedure',
      resp: procedure,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
