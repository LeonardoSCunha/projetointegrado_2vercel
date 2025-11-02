const { corsHandler, errorHandler, container } = require('./_utils.js');
const { FindAllFixedActivitiesService } = require('../src/modules/fixedActivities/services/FindAllFixedActivitiesService');
const { FindFixedActivitieByCodigoService } = require('../src/modules/fixedActivities/services/FindFixedActivitieByCodigoService');
const { RegisterFixedActivitieService } = require('../src/modules/fixedActivities/services/RegisterFixedActivitieService');
const { UpdateFixedActivitieService } = require('../src/modules/fixedActivities/services/UpdateFixedActivitieService');
const { DeleteFixedActivitieService } = require('../src/modules/fixedActivities/services/DeleteFixedActivitieService');

module.exports = async function handler(req, res) {
  if (corsHandler(req, res)) return;

  try {
    const { method, query, body } = req;

    switch (method) {
      case 'GET':
        if (query.codigo) {
          const findFixedActivitieService = container.resolve(FindFixedActivitieByCodigoService);
          const activity = await findFixedActivitieService.execute({ codigo: query.codigo });
          return res.status(200).json(activity);
        } else {
          const findAllFixedActivitiesService = container.resolve(FindAllFixedActivitiesService);
          const activities = await findAllFixedActivitiesService.execute();
          return res.status(200).json(activities);
        }

      case 'POST':
        const registerFixedActivitieService = container.resolve(RegisterFixedActivitieService);
        const newActivity = await registerFixedActivitieService.execute(body);
        return res.status(201).json(newActivity);

      case 'PUT':
        const updateFixedActivitieService = container.resolve(UpdateFixedActivitieService);
        const updatedActivity = await updateFixedActivitieService.execute(body);
        return res.status(200).json(updatedActivity);

      case 'DELETE':
        if (!query.codigo) {
          return res.status(400).json({ message: 'Codigo is required for deletion' });
        }
        const deleteFixedActivitieService = container.resolve(DeleteFixedActivitieService);
        await deleteFixedActivitieService.execute({ codigo: query.codigo });
        return res.status(204).end();

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    return errorHandler(error, res);
  }
}