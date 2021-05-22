const { MessageEmbed } = require("discord.js");                 // Required to create embeds
const db = require('quick.db')                                  // Database

module.exports = {
        name: "kick",
        category: "moderation",
        description: "Kicks the user",
        accessableby: "Administrator",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
        aliases: [],
    run: async (bot, message, args) => {
    
        try {
          
            if (!message.member.hasPermission("KICK_MEMBERS")) {                    // User Perm Error
                message.channel.send("**You Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**")
                return;
            }

            if (!message.guild.me.hasPermission("KICK_MEMBERS")) {                  // Bot Perm Error
                message.channel.send("**I Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**")
                return;
            }

            if (!args[0]) {                                                         // No Args Error
                message.channel.send('**Enter A User To Kick!**')
                return;
            }

            // Get the member that is to be kicked and check that they are in the guild.
            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
                
                if (!kickMember) {                                                  // Check user is in guild
                message.channel.send("**User Is Not In The Guild!**")
                return;
            }

            if (kickMember.id === message.member.id) {                              // Check user is not the message author
                message.channel.send("**You Cannot Kick Yourself!**")
                return;
            }

            if (!kickMember.kickable) {                                              // Check user can be kicked
                message.channel.send("**Cannot Kick This User!**")
                return;
            }

            if (kickMember.user.bot) {                                                // Check the user is not a bot
                message.channel.send("**Cannot Kick A Bot!**")
                return;
            }

            var reason = args.slice(1).join(" ");                                       // Get the reason for the kick 

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

            let channel = db.fetch(`modlog_${message.guild.id}`)    // Fetch logging channel
            if (!channel) return;

            const embed = new MessageEmbed()                        // Logging embed
                .setAuthor(`${message.guild.name} Moderation Logging`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "kick")
                .addField("**User Kicked**", kickMember.user.username)
                .addField("**Kicked By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)        // Get the logging channel and send embed
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
}