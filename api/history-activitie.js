const { corsHandler, errorHandler, container } = require('./_utils.js');
const { FindAllHistoryActivitiesService } = require('../src/modules/historyActivities/services/FindAllHistoryActivitiesService');
const { FindHistoryActivitieByCodigoService } = require('../src/modules/historyActivities/services/FindHistoryActivitieByCodigoService');
const { RegisterHistoryActivitieService } = require('../src/modules/historyActivities/services/RegisterHistoryActivitieService');
const { UpdateHistoryActivitieService } = require('../src/modules/historyActivities/services/UpdateHistoryActivitieService');
const { DeleteHistoryActivitieService } = require('../src/modules/historyActivities/services/DeleteHistoryActivitieService');

module.exports = async function handler(req, res) {
  if (corsHandler(req, res)) return;

  try {
    const { method, query, body } = req;

    switch (method) {
      case 'GET':
        if (query.id) {
          const findHistoryActivitieService = container.resolve(FindHistoryActivitieByCodigoService);
          const history = await findHistoryActivitieService.execute({ id: parseInt(query.id) });
          return res.status(200).json(history);
        } else {
          const findAllHistoryActivitiesService = container.resolve(FindAllHistoryActivitiesService);
          const histories = await findAllHistoryActivitiesService.execute();
          return res.status(200).json(histories);
        }

      case 'POST':
        const registerHistoryActivitieService = container.resolve(RegisterHistoryActivitieService);
        const newHistory = await registerHistoryActivitieService.execute(body);
        return res.status(201).json(newHistory);

      case 'PUT':
        const updateHistoryActivitieService = container.resolve(UpdateHistoryActivitieService);
        const updatedHistory = await updateHistoryActivitieService.execute(body);
        return res.status(200).json(updatedHistory);

      case 'DELETE':
        if (!query.id) {
          return res.status(400).json({ message: 'ID is required for deletion' });
        }
        const deleteHistoryActivitieService = container.resolve(DeleteHistoryActivitieService);
        await deleteHistoryActivitieService.execute({ id: parseInt(query.id) });
        return res.status(204).end();

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    return errorHandler(error, res);
  }
}