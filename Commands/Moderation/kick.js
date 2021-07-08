const db = require('quick.db')

const { MessageEmbed } = require("discord.js");


module.exports = {
        name: "kick",
        category: "moderation",
        description: "Kicks the user",
        accessableby: "Administrator",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        aliases: [],
    run: async (client, message, args) => {
    
        try {
          
            if (!message.member.hasPermission("KICK_MEMBERS")) {
                message.channel.send("**You Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**")
                return;
            }

            if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
                message.channel.send("**I Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**")
                return;
            }

            if (!args[0]) {
                message.channel.send('**Enter A User To Kick!**')
                return;
            }

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
                
                if (!kickMember) {
                message.channel.send("**User Is Not In The Guild!**")
                return;
            }

            if (kickMember.id === message.member.id) {
                message.channel.send("**You Cannot Kick Yourself!**")
                return;
            }

            if (!kickMember.kickable) {
                message.channel.send("**Cannot Kick This User!**")
                return;
            }

            if (kickMember.user.bot) {
                message.channel.send("**Cannot Kick A Bot!**")
                return;
            }

            var reason = args.slice(1).join(" ");

            try {
                const sembed2 = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**You Have Been Kicked From ${message.guild.name} for - ${reason || "No Reason!"}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                kickMember.send(sembed2).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }

            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** has been kicked for ${reason}`)
            message.channel.send(sembed);
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** has been kicked`)
            message.channel.send(sembed2);
            }

        } catch (error) {
            message.reply("Something went wrong!")
        }
    }
}