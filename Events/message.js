// Dependancies
const db = require("quick.db")
const Discord = require("discord.js");

module.exports = (client, message) => {

  // Ignore messages sent by bots
  if (message.author.bot) return;

  // Ignore DMS
  if(!message.guild) return;

  // Get prefix from the database
  let prefix = db.get(`prefix_${message.guild.id}`)

  // If no prefix is set, use the default prefix from the configuration file.
  if(prefix === null) prefix = client.config.prefix;

  // If the message does not start with the bots prefix, ignore it.
  if(!message.content.startsWith(prefix)) return;

  // Command Arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command)
    || client.commands.find(commandName => commandName.aliases && commandName.aliases.includes(command));

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
