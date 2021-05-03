const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
      name: 'work',
      description: 'Earn money by working',
      cooldown: 300,
      aliases: ['wk'],
  
  run: async (client, message, args) => {
    let author = message.author;
    let author = await db.fetch(`money_${message.guild.id}_${user.id}`)

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

        let jobworked = Math.floor(Math.random() * jobs.length);
        let amount = Math.floor(Math.random() * 100);

        let embed = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You worked as a ${jobs[jobworked]} and earned ${amount}`)
        message.reply(embed) 

        let a = await db.add(`money_${message.guild.id}_${user.id}`, amount)
    
}
