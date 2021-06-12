const db = require("quick.db");
const { MessageEmbed } = require('discord.js');
const { workplaces } = require('../../Resources/resources.js')
const abusePrevention = new Set();   
   
module.exports = {
    name: 'work',
    description: 'Earn money by working',
    cooldown: 30,
    aliases: ['wk'],
  
    run: async (client, message, args) => {   

    if (abusePrevention.has(message.author.id)) {
      message.reply("You are currently unable to use this command. Please try again later")
    } else {

        try {
            let authorid = message.author.id

            authorbal = await db.fetch(`money_${message.guild.id}_${authorid}`)
            if (authorbal === null) authorbal = 0; 

            let jobworked = Math.floor(Math.random() * workplaces.length);      
            let amount = Math.floor(Math.random() * 100);        

            let embed = new MessageEmbed()                                     
            .setColor("#FFFFFF")
            .setDescription(`You worked at ${workplaces[jobworked]} and earned ${amount}`)
            .setColor(0x00AE86)
            message.reply(embed) 

            let a = await db.add(`money_${message.guild.id}_${authorid}`, amount)     
            
            abusePrevention.add(message.author.id);
            setTimeout(() => {
                abusePrevention.delete(message.author.id);
            }, 600000);
      
        } catch (error) {
            console.log(error.message)
        }
    }
  }
}