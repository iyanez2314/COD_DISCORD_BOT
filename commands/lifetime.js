require('dotenv').config();
const API = require("call-of-duty-api");
const { Warzone, platforms } = require("call-of-duty-api");

module.exports = {
    name: 'lifetime',
    description: 'This will look for the players wz stats',
    async execute(client, message, args, Discord){
        if(!args[0]) return message.channel.send('Please enter a players gamer tag');
        // if(!args[1]) return message.channel.send('Please enter the players platform');

        

        try {
            API.login(process.env.WZ_TOKEN);
            let data = await API.Warzone.fullData(args[0],API.platforms.Activision)

            const embed = new Discord.MessageEmbed()
            .setColor('#BFCDEB')
            .setTitle('Life time stats')
            .addFields(
                {name: 'Wins', value: data.data.lifetime.mode.br.properties.wins.toString()},
                {name: 'KD', value: data.data.lifetime.mode.br.properties.kdRatio.toFixed(2).toString()},
                {name: 'Kills', value: data.data.lifetime.mode.br.properties.kills.toString()},
                {name: 'Games Played', value: data.data.lifetime.mode.br.properties.gamesPlayed.toString()}

            )
            .setFooter({ text: 'Created by cozy', iconURL: 'https://i.imgur.com/AfFp7pu.png'})
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            message.channel.send({ embeds: [embed] }); 
        } catch(error){
            message.channel.send('There was a problem fetching this player')
            throw error;
        }
    }
}