const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
require('dotenv').config()

client.config = config;
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

["command","event"].forEach(handler => {
	require(`./Handlers/${handler}`)(client);
});

client.login(process.env.DISCORD_TOKEN);