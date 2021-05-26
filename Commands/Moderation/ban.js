const { MessageEmbed } = require('discord.js');                             // Required to create embeds
const db = require('quick.db')                                              // Database                          // Owner ID

module.exports = {
        name: "ban",
        aliases: ["b", "banish"],
        description: "Bans the user",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
    run: async (bot, message, args) => {
      
        try {
          
            if (!message.member.hasPermission("BAN_MEMBERS") &&             // If user does not have permissions
                message.author.id != client.config.OWNER_ID)
            {
                message.channel.send("**You Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**");
                return;
            }

            if (!message.guild.me.hasPermission("BAN_MEMBERS")) {           // If bot does not have permissions
                message.channel.send("**I Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**")
                return;
            }
          
            if (!args[0]) {                                                 // No Arguments error
                message.channel.send("**Please Provide A User To Ban!**")
                return;
            }

            // Check the user is in the guild and is bannable
            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            
            if (!banMember) {                                               // Check user is in guild
                message.channel.send("**User Is Not In The Guild**")
                return;
            }

            if (banMember === message.member) {                             // Check user is not trying to ban themselves
                message.channel.send("**You Cannot Ban Yourself**")
                return;
            }
            
            var reason = args.slice(1).join(" ");                           // Get the punishment reason

            if (!banMember.bannable) {
                message.channel.send("**Cant Ban That User**")
                return;
            }
          
            try {
                message.guild.members.ban(banMember)
                let dm_ban_msg = `**Hello, You Have Been Banned From ${message.guild.name} for - ${reason || "No Reason"}**`
                banMember.send(dm_ban_msg)                                  // DM the banned user
            } catch {
                message.guild.members.ban(banMember)
            }
            
            // Include punishment reason in DMs
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

            let channel = db.fetch(`modlog_${message.guild.id}`)               // Fetch logging channel
            if (channel == null) return;                                       // if none do nothing

            if (!channel) return;

            const embed = new MessageEmbed()                                   // Logging embed
                .setAuthor(`${message.guild.name} Moderation Logging`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**Banned**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Banned By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)            // Fetch logging channel
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};