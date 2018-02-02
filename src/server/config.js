require('dotenv').config();

const config = {
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  workspaceId: process.env.CONVERSATION_WORKSPACE_ID,
};

module.exports = config;
