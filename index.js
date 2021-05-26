const Discord = require('discord.js');
const Enmap = require("enmap");
const fs = require("fs");
const ytdl = require('ytdl-core');

const client = new Discord.Client();
const config = require("./config.json");

client.config = config;
client.commands = new Enmap();
client.cooldowns = new Discord.Collection();

["command","event"].forEach(handler => {
	require(`./Handlers/${handler}`)(client);
});

client.login(config.token);