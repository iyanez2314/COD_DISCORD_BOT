const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
require('dotenv').config()
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "GUILD_BANS",
    ]
})
const PREFIX = '!';


client.on('ready', () => {
    console.log('The bot is online')
});

client.on('message', (message) => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            message.channel.send('pong!');
            break;
        case 'website':
            message.reply('youtube.com');
            break;
        case 'info':
            if(args[1] === 'version'){
                message.channel.send('version 1.2'); 
            }  else {
                message.reply('This comman does not exsist!')
            }
            break;
        case 'clear':
            if(!args[1]) return message.reply('Please specify how many you want to delete');
            message.channel.bulkDelete(args[1]);
            break;
        case 'embed':
            const embed = new MessageEmbed()
                .setTitle('User Information')
                .addField('Player name', message.author.username)
                .setColor('#afdcec')
                .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                message.channel.send({ embeds: [embed] });
            break;
    }
});


client.login(process.env.TOKEN);