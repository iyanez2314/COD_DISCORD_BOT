const Discord = require('discord.js');
require('dotenv').config()
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS" 
    ]
})

let bot = {
    client,
    prefix: "n.",
    owners: ['451806721011220481']
}

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require('./Handlers/events')(bot, reload)
client.loadEvents(bot, false )

module.exports = bot

// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}`)
// })

// client.on('messageCreate', (message) => {
//     if(message.content === 'hi'){
//         message.reply('hello')
//     }
// })

// const welcomeChannelId = '987139870545817671'

// client.on("guildMemberAdd", (member) => {
//     member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}> Welcome to the server!`)
// })

client.login(process.env.TOKEN);