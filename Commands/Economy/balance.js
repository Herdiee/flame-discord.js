const Discord = require('discord.js');
const db = require("quick.db");  
const { MessageEmbed } = require('discord.js');                                           

module.exports = {
    name: 'balance',
    description: 'Check your own or another users balance',
    cooldown: 30,
    aliases: ['bal'],
    run: async (client, message, args) => {

        const test = client.users.cache.get(args[0])
        let user = message.mentions.users.first() || test;
        if (typeof user == "undefined") user = message.author;

        console.log(`Fetching Balance of ${user.id} As requested by ${message.author.id}`)
        userbalance = await db.fetch(`money_${message.guild.id}_${user.id}`)
        if (userbalance === null) userbalance = 0;

        let embed = new MessageEmbed()
        .setColor("#FFFFFF")
        .setTitle(`Balance of ${user.tag}`)
        .setDescription(`${user.tag} Has a balance of ${userbalance}`)
        .setColor(0x00AE86)

        message.reply(embed)
    }
}