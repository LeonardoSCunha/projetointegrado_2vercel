const { corsHandler, errorHandler, container } = require('./_utils.js');
const { FindAllPatientsService } = require('../src/modules/patients/services/FindAllPatientsService');
const { FindPatientByCodigoService } = require('../src/modules/patients/services/FindPatientByCodigoService');
const { RegisterPatientService } = require('../src/modules/patients/services/RegisterPatientService');
const { UpdatePatientService } = require('../src/modules/patients/services/UpdatePatientService');
const { DeletePatientService } = require('../src/modules/patients/services/DeletePatientService');

module.exports = async function handler(req, res) {
  if (corsHandler(req, res)) return;

  try {
    const { method, query, body } = req;

    switch (method) {
      case 'GET':
        if (query.id) {
          const findPatientService = container.resolve(FindPatientByCodigoService);
          const patient = await findPatientService.execute({ id: parseInt(query.id) });
          return res.status(200).json(patient);
        } else {
          const findAllPatientsService = container.resolve(FindAllPatientsService);
          const patients = await findAllPatientsService.execute();
          return res.status(200).json(patients);
        }

      case 'POST':
        const registerPatientService = container.resolve(RegisterPatientService);
        const newPatient = await registerPatientService.execute(body);
        return res.status(201).json(newPatient);

      case 'PUT':
        const updatePatientService = container.resolve(UpdatePatientService);
        const updatedPatient = await updatePatientService.execute(body);
        return res.status(200).json(updatedPatient);

      case 'DELETE':
        if (!query.id) {
          return res.status(400).json({ message: 'ID is required for deletion' });
        }
        const deletePatientService = container.resolve(DeletePatientService);
        await deletePatientService.execute({ id: parseInt(query.id) });
        return res.status(204).end();

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    return errorHandler(error, res);
  }
}