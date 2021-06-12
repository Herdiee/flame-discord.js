const { MessageEmbed } = require('discord.js');
const { eightball } = require('../../Resources/resources.js')

module.exports = {
        name: '8ball',
        description: 'Get an 8ball reply',
        cooldown: 5,
        aliases: ['eightball'],
    run: async (client, message, args) => {   

        let response = Math.floor(Math.random() * eightball.length);

        let embed = new MessageEmbed()                                     
        .setColor("#FFFFFF")
        .setDescription(`${response}`)
        .setColor(0x00AE86)
        message.reply(embed) 
        
    }
}
        