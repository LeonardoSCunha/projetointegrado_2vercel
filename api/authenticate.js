const { corsHandler, errorHandler, container } = require('./_utils.js');
const { AuthenticateService } = require('../src/modules/users/services/AuthenticateService');

module.exports = async function handler(req, res) {
  if (corsHandler(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({ message: 'Usuario and senha are required' });
    }

    const authenticateService = container.resolve(AuthenticateService);
    const { access_token, refresh_token } = await authenticateService.execute({
      usuario,
      senha,
    });

    return res.status(200).json({
      access_token,
      refresh_token,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
}