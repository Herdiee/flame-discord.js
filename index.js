const Discord = require('discord.js');
const fs = require("fs");
const ytdl = require('ytdl-core');

const client = new Discord.Client();
const config = require("./config.json");

client.config = config;
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

["command","event"].forEach(handler => {
	require(`./Handlers/${handler}`)(client);
});

client.login(config.token);