const sendMessage = require('../modules/conversation');

const handleRequest = async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      res.status(400);
      res.end();
      return;
    }

    const result = await sendMessage(message, context);

    if (!result) {
      res.status(500);
      res.json({ error: 'internal_server_error' });
      return;
    }

    if (!Object.keys(result).length) {
      res.status(404);
      res.end();
      return;
    }

    res.json(result);
  } catch (error) {
    console.log(error); //eslint-disable-line
    res.status(500);
    res.json({ error: 'internal_server_error' });
  }
};

module.exports = handleRequest;
