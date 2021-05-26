const Discord = require('discord.js');                                            // API Wrapper
const db = require("quick.db");                                                   // Database Engine
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'work',
    description: 'Earn money by working',
    cooldown: 30,
    aliases: ['wk'],
  
  run: async (client, message, args) => {   
    try {
      let authorid = message.author.id

      authorbal = await db.fetch(`money_${message.guild.id}_${authorid}`)
      if (authorbal === null) authorbal = 0; 

      let jobs = require('../../Resources/workplaces.js')

      let jobworked = Math.floor(Math.random() * jobs.length);                        // Pick a random job
      let amount = Math.floor(Math.random() * 100);                                   // Pick a random amount

      let embed = new MessageEmbed()                                                  // Embed Creation
      .setColor("#FFFFFF")
      .setDescription(`You worked at ${jobs[jobworked]} and earned ${amount}`)
      .setColor(0x00AE86)
      message.reply(embed) 

      let a = await db.add(`money_${message.guild.id}_${authorid}`, amount)            // Add money to the database
  } catch (error) {
      console.log(error.message)
  }
}
}