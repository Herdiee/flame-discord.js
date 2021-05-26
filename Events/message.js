const db = require("quick.db")
const Discord = require("discord.js");

module.exports = (client, message) => {

  if (message.author.bot) return;
  if(!message.guild) return;

  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = client.config.prefix;

  if(!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  const cmd = client.commands.get(command) || 
              client.commands.find(commandName => commandName.aliases && commandName.aliases.includes(command));

  if (!cmd) return;
  cmd.run(client, message, args);
};
