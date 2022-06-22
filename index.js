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


client.on('ready', () => { // When the bot goes online the the console will let us know
    console.log('The bot is online')
});

client.on('message', (message) => { // here we are callng for the client when it receives a message from the user.
    let args = message.content.substring(PREFIX.length).split(" "); // here we are creating a varaible that will get the prefix length and split it from the arg example => !something it will split the string and get the !

    // Here we will be using a switch case.
    switch(args[0]){ // Here we are checking the arg[0] whcih should be ! if the case is !ping the bot will reply with 'pong!'
        case 'ping':
            message.channel.send('pong!');
            break;
        case 'info':
            if(args[1] === 'version'){ // here we are checking what the second argument is in the command. This if statement will check if the second argument is version if it is we will reply with a version if they do not provide a second arg
                message.channel.send('version 0.1'); 
            }  else { // we will reply with this command does not exsist. 
                message.reply('This comman does not exsist!') 
            }
            break;
        case 'clear':
            if(!args[1]) return message.reply('Please specify how many you want to delete'); // This is the clearing of any messages in the chat you may need to clear. On this line we are checking to see if the second argument of arg[1] is there if not we will let the user know they need to add a value of how many messages they need to delete
            message.channel.bulkDelete(args[1]); // Here we are calling the bulk delete from the discord package and giving it the second argument if it does pass the first conditional statement
            break;
        case 'cozy': 
            const embed = new MessageEmbed() // This is the embed message we will send to the user
                .setTitle('User Gamertags') // Here we are setting the title of the embed 
                .addFields( // this is adding feilds to the emebed 
                    {name: 'Battlenet', value: 'something#34567', inline: true},
                    {name: 'Activision', value: 'something#34567', inline: true},
                    {name: 'PSN', value: 'something#34567', inline: true},

                )
                .setColor('#afdcec') // This is adding color to the emebed
                .setThumbnail('https://i.imgur.com/AfFp7pu.png') // This is the picture that will come out in the embed
                .setFooter({ text: 'Created by cozy', iconURL: 'https://i.imgur.com/AfFp7pu.png' }) // this will come out at the bottom of the embed
                message.channel.send({ embeds: [embed] }); 
            break;
    }
});


client.login(process.env.TOKEN);