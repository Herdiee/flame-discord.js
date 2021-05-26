const Discord = require('discord.js');                                            // API Wrapper
const db = require("quick.db");   
const { MessageEmbed } = require('discord.js');                                            

module.exports = {
    name: 'balance',
    description: 'Check your own or another users balance',
    cooldown: 30,
    aliases: ['bal'],
    run: async (client, message, args) => {

        authorbal = await db.fetch(`money_${message.guild.id}_${message.author.id}`)
        if (authorbal === null) authorbal = 0;

        message.reply(`Your balance is ${authorbal}`)
    }
}