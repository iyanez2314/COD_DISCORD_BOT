const Discord = require('discord.js'); // Importing discord js
const { MessageEmbed } = require('discord.js'); // Importing the embed feature
require('dotenv').config() // using the enviorment variables
const client = new Discord.Client({ // Here we are creating the client aka bot we need to import guilds so the client can do certain things in the disord
    intents: [ // We need to have the intents without the intents the bot will not run
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "GUILD_BANS",
    ]
})
const PREFIX = '!'; // The user will have to use this before any of their 

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter( file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

client.on('ready', () => { // When the bot goes online the the console will let us know
    console.log('The bot is online')
});

client.on('message', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return; 

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }  else if (command === 'lifetime'){
        client.commands.get('lifetime').execute(client, message, args, Discord)
    } else if (command === 'weekly'){
        client.commands.get('weekly').execute(message, args, Discord)
    } else if(command === 'list'){
        client.commands.get('list').execute(client, message, args, Discord)
    } else if(command === 'clear'){
        client.commands.get('clear').execute(message, args)
    } else if (command === 'rebirth'){
        client.commands.get('rebirth').execute( message, args, Discord)
    } else if (command === 'fortuneskeep'){
        client.commands.get('fortunesKeep').execute(message, args, Discord)
    }
})



client.login(process.env.TOKEN);