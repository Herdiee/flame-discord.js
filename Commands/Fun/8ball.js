const Discord = require('discord.js');
const db = require("quick.db");
const { MessageEmbed } = require('discord.js');
let answers = require('../../Resources/eightball.js')

module.exports = {
        name: '8ball',
        description: 'Get an 8ball reply',
        cooldown: 5,
        aliases: ['eightball'],
    run: async (client, message, args) => {   

        let response = Math.floor(Math.random() * answers.length);

        let embed = new MessageEmbed()                                     
        .setColor("#FFFFFF")
        .setDescription(`${response}`)
        .setColor(0x00AE86)
        message.reply(embed) 
        
    }
}
        