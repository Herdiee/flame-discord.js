const Discord = require('discord.js');                                            // API Wrapper
const db = require("quick.db");                                                   // Database Engine

module.exports = {
    name: 'balance',
    description: 'Check your own or another users balance',
    cooldown: 30,
    aliases: ['bal'],
    run: async (client, message, args) => {
        return;
    }
}