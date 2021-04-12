// Dependancies
const Discord = require('discord.js');
const Enmap = require("enmap");
const fs = require("fs");
const ytdl = require('ytdl-core');

const client = new Discord.Client();
const config = require("./config.json");
client.config = config;
client.commands = new Enmap();
client.cooldowns = new Discord.Collection();

fs.readdirSync('./Commands').forEach(dirs => {
    const commands = fs.readdirSync(`./Commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./Commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        let props = require(`./Commands/${dirs}/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
    };
});

fs.readdir("./Events/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
	  const event = require(`./Events/${file}`);
	  let eventName = file.split(".")[0];
	  client.on(eventName, event.bind(null, client));
	});
  });

 client.login(config.token);










/*
const InfoCmds = require("./cmd/info.js");
const FunCmds = require("./cmd/fun.js");
const EcoCmds = require("./cmd/eco.js");
const SettingCmds = require("./cmd/settings.js");
const ErrorCmds = require("./cmd/errorhandle.js");
const queue = new Map();
var fs = require('file-system');
var levels 
var userconf
fs.readFile('./configs/levels.json', 'utf8', function(err, contents) {
    levels = JSON.parse(contents);
});
fs.readFile('./configs/userconf.json', 'utf8', function(err, contents) {
    userconf = JSON.parse(contents);
});
var contents = null

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`); // Indicates you were logged in.
	console.log(`Flame Discord client By Edgewurth`);
})



function sortObject(o) {
   var a = [],i;
   for(i in o){ 
     if(o.hasOwnProperty(i)){
         a.push([i,o[i]]);
     }
   }
   a.sort(function(a,b){ return a[0]>b[0]?1:-1; })
   return a;
}


    }
	if (cmd[0] === clientPrefix + "printid") {
		msg.channel.send (msg.id)
	}
	if (cmd[0] === clientPrefix + "help") {
		if (typeof userconf[msg.author.id + "_dmhelp"] === "undefined") {
		userconf[msg.author.id + "_dmhelp"] = "true";
		};
		if (userconf[msg.author.id + "_dmhelp"] === "true") {
			msg.channel.send ("Please check your inbox to see the help list. If your private messages are closed, then please type ``&settings``, and press the User/Send Help to Inbox buttons.");
			msg.author.send(InfoCmds.help(cmd[1]))
		} else {
			msg.reply(InfoCmds.help(cmd[1]))
		};
		
    }
	if (cmd[0] === clientPrefix + "sendname") {
		msg.channel.send (msg.guild.members.get(msg.author.id).user.username);
    }
	if (cmd[0] === clientPrefix + "ban") {
		const user = msg.mentions.users.first();
		var reason;
		var i;
		for (i = 2; i < cmd.length; i++) {
			reason += cmd[i] + " ";
		}
		if (user) {
			 const member = msg.guild.members.resolve(user);
			if (member) {
				member
					.ban(reason)
					.then(() => {
						msg.reply("Banned ${user.tag}");
					})
					.catch(err => { msg.reply("Could not ban that member"); });
			}
			else
			{
				msg.reply("Member not in server");
			}
		}
		else
		{
			msg.reply("Please mention a user");
		}
    }
	if (cmd[0] === clientPrefix + "unban") {
		const user = msg.mentions.users.first();
		var reason;
		var i;
		for (i = 2; i < cmd.length; i++) {
			reason += cmd[i] + " ";
		}
		if (user) {
			 const member = msg.guild.members.resolve(user);
			if (member) {
				member
					.unban(reason)
					.then(() => {
						msg.reply("Unban ${user.tag}");
					})
					.catch(err => { msg.reply("Could not unban that member"); });
			}
			else
			{
				msg.reply("Member not in server");
			}
		}
		else
		{
			msg.reply("Please mention a user");
		}
    }
	if (cmd[0] === clientPrefix + "kick") {
		const user = msg.mentions.users.first();
		var reason;
		var i;
		for (i = 2; i < cmd.length; i++) {
			reason += cmd[i] + " ";
		}
		if (user) {
			 const member = msg.guild.members.resolve(user);
			if (member) {
				member
					.kick(reason)
					.then(() => {
						msg.reply("Kicked ${user.tag}");
					})
					.catch(err => { msg.reply("Could not kick that member"); });
			}
			else
			{
				msg.reply("Member not in server");
			}
		}
		else
		{
			msg.reply("Please mention a user");
		}
    }
	if (cmd[0] === clientPrefix + "8ball") {
        msg.channel.send (FunCmds.eightball())
    }
	
	if (cmd[0] === clientPrefix + "dbg") {
		if (msg.author.id === "354512960250576896") {
			if (cmd[1] === "shutdown") {
				msg.channel.send("DEBUG - Shutting Down...");
				process.exit()
			}
			if (cmd[1] === "reload") {
				msg.channel.send("DEBUG - Reloading");
				process.reset()
			}
		} else {
			msg.channel.send("DEBUG - You're not Ryan Edgewurth. Task Failed");
		}
    }
	
	if (cmd[0] === clientPrefix + "ping") {
		var date = new Date();
        var timestampbef = date.getMilliseconds();
		msg.channel.send ("Please Wait...");
		var date = new Date();
		var timestampaft = date.getMilliseconds();
		var latency = timestampaft - timestampbef;
		msg.channel.send ("Pong! The latency is " + latency.toFixed(0) + "ms");
    }
	if (cmd[0] === clientPrefix + "bal") {
		if (typeof levels[msg.author.id] === "undefined") {
		levels[msg.author.id] = 0;
		}
        msg.channel.send ("Your Current Balance Is $" + levels[msg.author.id]);
    }
	if (cmd[0] === clientPrefix + "leaderboard") {
		if (typeof levels[msg.author.id] === "undefined") {
			levels[msg.author.id] = 0;
		}
		var levelsort = sortObject(levels);
      msg.channel.send ("__**Leaderboard**__\n10. " + levelsort[Object.keys(levelsort)[1]].name);
    }
	if (cmd[0] === clientPrefix + "work") {
		var job = EcoCmds.getjob();
		var pay = EcoCmds.getworkpay(job);
		var jobname = EcoCmds.getworkplace(job);
		if (typeof levels[msg.author.id] === "undefined") {
		levels[msg.author.id] = pay;
		} else {
		levels[msg.author.id] = levels[msg.author.id] + pay;}
		msg.reply("You worked at " + jobname + " and got $" + pay);
    }
	
	if (cmd[0] === clientPrefix + "testembed") {
		const exampleEmbed = new Discord.MessageEmbed()
		.setColor('#ee5615')
		.setTitle('Some title')
		.setURL('https://discord.js.org/')
		.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		.setDescription('Some description here')
		.setThumbnail('https://i.imgur.com/wSTFkRM.png')
		.addFields(
			{ name: 'Regular field title', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
		)
		.addField('Inline field title', 'Some value here', true)
		.setImage('https://i.imgur.com/wSTFkRM.png')
		.setTimestamp()
		.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
	
	msg.channel.send(exampleEmbed);
    }
	
	if (typeof levels[msg.author.id] === "undefined") {
		levels[msg.author.id] = 0;
	} else {
	levels[msg.author.id] = levels[msg.author.id] + 1;}
	fs.writeFile("./configs/levels.json",JSON.stringify(levels)); }
	catch(err) {
		msg.reply(ErrorCmds.errorhandle(err.message, err.name, msg.content, msg.author.id));
	}
});

client.login('yeet');
*/
