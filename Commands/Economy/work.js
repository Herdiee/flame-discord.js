const Discord = require('discord.js');                                            // API Wrapper
const db = require("quick.db");                                                   // Database Engine
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'work',
    description: 'Earn money by working',
    cooldown: 30,
    aliases: ['wk'],
  
  run: async (client, message, args) => {   
    let authorid = message.author.id

    authorbal = await db.fetch(`money_${message.guild.id}_${authorid}`)
    if (authorbal === null) authorbal = 0; 

    let jobs = [                                                           
    'a Fast Food Restaurant',
    'an Supermarket',
    'a School',
    'a Swimming Pool',
    'an Department Store',
    'an Hotel',
    'the Government',
    'the Police',
    'the Fire Department',
    'the Hospital',
    'an Insurance Company',
    'a Football Club',
    'an Film Production Team',
    'an Funeral Director\'s Company',
    'an IT Repair Shop',
    'an Video Game Development Company',
    'a Museum.',
    ];

    let jobworked = Math.floor(Math.random() * jobs.length);                        // Pick a random job
    let amount = Math.floor(Math.random() * 100);                                   // Pick a random amount

    let embed = new MessageEmbed()                                                  // Embed Creation
    .setColor("#FFFFFF")
    .setDescription(`You worked as a ${jobs[jobworked]} and earned ${amount}`)
    message.reply(embed) 

    let a = await db.add(`money_${message.guild.id}_${authorid}`, amount)            // Add money to the database
    
}
}
