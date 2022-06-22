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
        case 'cozy':
            const embed = new MessageEmbed()
                .setTitle('User Gamertags')
                .addFields(
                    {name: 'Battlenet', value: 'something#34567', inline: true},
                    {name: 'Activision', value: 'something#34567', inline: true},
                    {name: 'PSN', value: 'something#34567', inline: true},

                )
                .setColor('#afdcec')
                .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                .setFooter({ text: 'Created by cozy', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
                message.channel.send({ embeds: [embed] });
            break;
    }
});


client.login(process.env.TOKEN);