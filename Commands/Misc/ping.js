const { MessageEmbed } = require('discord.js');

module.exports = {
        name: "ping",
        description: "see your ping",
        usage: "ping",
        aliases: ['latency'],
    run: async (bot, message, args) => {
                const embed = new MessageEmbed()
                .setTitle('Pong')
                .setDescription('Test')
                .addField(`Latency is :`, `${Date.now() - message.createdTimestamp}ms.`)
                .addField(`API Latency is :`, `${Math.round(client.ws.ping)}ms`)
                .setFooter('Made with <3 by Herdie#9541')
                .setColor(0x00AE86)
                message.reply(embed)
        } catch (error) {
                message.reply("**Something went wrong!**")
                console.log(`Something went wrong! ${message.guild.id}`)
              }
};
}
