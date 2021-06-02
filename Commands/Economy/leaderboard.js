const Discord = require('discord.js');
const db = require("quick.db");
const { MessageEmbed } = require('discord.js');

module.exports = {
        name: 'leaderboard',
        description: 'List the richest users',
        cooldown: 30,
        aliases: ['lb','top'],
    run: async (client, message, args) => {

        let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);
        
        var lb = "";
        for (var i in money) {
            splituser = message.guild.members.cache.get(money[i].ID.split('_')[2])
            lb += `**${money.indexOf(money[i]) + 1}. ${splituser} - ${money[i].data}** \n`;
        }

        let embed = new MessageEmbed()
            .setColor("#FFFFFF")
            .setTitle(`**${message.guild.name}'s Leaderboard**`)
            .setDescription(lb)
            .setColor(0x00AE86)
        message.reply(embed)
    }
}