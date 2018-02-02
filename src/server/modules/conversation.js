const config = require('../config');
const watson = require('watson-developer-cloud');

const conversation = new watson.ConversationV1({
  username: config.username,
  password: config.password,
  version_date: '2017-05-26',
});

const send = (text, lastContext) =>
  new Promise((resolve, reject) => {
    const parameters = {
      workspace_id: config.workspaceId,
      input: { text },
    };

    if (lastContext) { parameters.context = lastContext; }

    conversation.message(parameters, (err, response) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(response);
    });
  });

const sendMessage = async (message, lastContext) => {
  try {
    const response = await send(message, lastContext);
    const { output } = response;
    const { context } = response;

    if (!output || !output.text || !output.text.length || !context) { return {}; }

    return { message: output.text[0], context };
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = sendMessage;
