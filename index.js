const Discord = require('discord.js');                          // Discord API Wrapper
const Enmap = require("enmap");                                 // Data Storage Stuff
const fs = require("fs");                                       // JS File System
const ytdl = require('ytdl-core');                              // Youtube Downloader

const client = new Discord.Client();                            // Create a discord client
const config = require("./config.json");                        // Config File

client.config = config;
client.commands = new Enmap();
client.cooldowns = new Discord.Collection();

["command","event"].forEach(handler => {                        // Command and Event Handler
	require(`./Handlers/${handler}`)(client);
});

client.login(config.token);                                     // Log in using bot token