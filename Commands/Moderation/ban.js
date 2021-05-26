const { MessageEmbed } = require('discord.js');
const db = require('quick.db')

module.exports = {
        name: "ban",
        aliases: ["b", "banish"],
        description: "Bans the user",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
    run: async (bot, message, args) => {
      
        try {
          
            if (!message.member.hasPermission("BAN_MEMBERS") &&
                message.author.id != client.config.OWNER_ID)
            {
                message.channel.send("**You Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**");
                return;
            }

            if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
                message.channel.send("**I Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**")
                return;
            }
          
            if (!args[0]) {
                message.channel.send("**Please Provide A User To Ban!**")
                return;
            }

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            
            if (!banMember) {
                message.channel.send("**User Is Not In The Guild**")
                return;
            }

            if (banMember === message.member) {
                message.channel.send("**You Cannot Ban Yourself**")
                return;
            }
            
            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) {
                message.channel.send("**Cant Ban That User**")
                return;
            }
          
            try {
                message.guild.members.ban(banMember)
                let dm_ban_msg = `**Hello, You Have Been Banned From ${message.guild.name} for - ${reason || "No Reason"}**`
                banMember.send(dm_ban_msg)
            } catch {
                message.guild.members.ban(banMember)
            }
            
            if (reason) {
                var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** has been banned for ${reason}`)
                message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** has been banned`)
                message.channel.send(sembed2)
            }

        } catch (error) {
            return message.reply("Something went wrong!")
        }
    }
};