const Discord = require('discord.js');                                            // API Wrapper
const db = require("quick.db");                                                   // Database Engine

module.exports = {
    name: 'leaderboard',
    description: 'List the richest users',
    cooldown: 30,
    aliases: ['lb','top'],
    run: async (client, message, args) => {
        return;
    }
}