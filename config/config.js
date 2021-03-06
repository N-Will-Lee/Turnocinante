const { Intents } = require('discord.js');
const {
    DIRECT_MESSAGES,
    GUILD_MESSAGES,
    GUILDS,
  } = Intents.FLAGS;

  const botIntents = [
    DIRECT_MESSAGES,
    GUILD_MESSAGES,
    GUILDS,
  ];

  const commands = {
    getName: 'get-name',
    tellJoke: 'tell-a-joke',
    sad: 'sad',
    lastMsgs: 'last-messages',
    addTurns: 'add-turns',
  };
  const prefix = '!';

  module.exports = { botIntents, commands, prefix };