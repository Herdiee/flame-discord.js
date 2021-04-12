// Dependancies
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config")

module.exports = {
        name: "prefix",
        description: "Changes/Discovers The server's Prefix or the Global Prefix",
        usage: "!prefix <new prefix/reset>",
        example: "!prefix",
        aliases: ["prefix"],

    run: async (bot, message, args) => {
        let option = args[0];

     // If the user does not have the perms manage_guild, return perm error.
     if(!message.member.hasPermission("MANAGE_GUILD")) {
                return message.channel.send("You are not allowed or do not have permission to change prefix")
              }
            
            // If no arguments were provided, send the current prefix from the databse
            if(!option) {
                prefix = db.fetch(`prefix_${message.guild.id}`)
                if (!prefix) prefix = PREFIX;
                let prefEmbed = new MessageEmbed()
                .setColor('YELLOW')
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**\nMy prefix for \`${message.guild.name}\`  is  **` + `  \`${prefix}\` \n**Type \`${prefix}help\` for help**`)
              
              message.channel.send(prefEmbed);
            }
            
            // Reset Prefix
            if(option.toLowerCase() === "reset") {
                db.delete(`prefix_${message.guild.id}`)
                return await message.channel.send("Reseted Prefix ✅")
            }
            
            // Error: The user provided too many arguments
            if(args[1]) {
              return message.channel.send("You can not set prefix a double argument")
            }
            
            // Error: Prefix can not be set to anything more than 4 characters long.
            if(args[0].length > 4) {
              return message.channel.send("You can not send prefix more than 4 characters")
            }
            
            // Delete the current prefix from the database
            if(args.join("") === PREFIX) {
              db.delete(`prefix_${message.guild.id}`)
             return await message.channel.send("Reseted Prefix ✅")
            }
            
            // Set the new prefix in the database
            db.set(`prefix_${message.guild.id}`, args[0])
          await message.channel.send(`Done ✅ | Bot Prefix Set to ${args[0]}`)
            

        }
        
    }
