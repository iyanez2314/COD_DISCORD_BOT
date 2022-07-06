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
            let lifetimeWins = data.data.lifetime.mode.br.properties.wins.toString();
            let lifetimeKd = data.data.lifetime.mode.br.properties.kdRatio.toFixed(2).toString();
            let lifetimeKills = data.data.lifetime.mode.br.properties.kills.toString();
            let lifetimeGamesPlayed = data.data.lifetime.mode.br.properties.gamesPlayed.toString();
            let lifetimeTopTen = data.data.lifetime.mode.br.properties.topTen.toString();
            let lifetimeTopFive = data.data.lifetime.mode.br.properties.topFive.toString();
            let lifetimeTopTwentyFive = data.data.lifetime.mode.br.properties.topTwentyFive.toString();

            const embed = new Discord.MessageEmbed()
            .setColor('#BFCDEB')
            .setTitle('Lifetime Stats')
            .addField('Lifetime Wins', `${lifetimeWins}`, true)
            .addField('Lifetime KD', `${lifetimeKd}`, true)
            .addField('Lifetime Kills', `${lifetimeKills}`, true)
            .addField('Lifetime Games Played', `${lifetimeGamesPlayed}`, true)
            .addField('Lifetime Top 5', `${lifetimeTopFive}`, true)
            .addField('Lifetime Top 10', `${lifetimeTopTen}`, true)
            .addField('Lifetime Top 25', `${lifetimeTopTwentyFive}`, true)
            .setFooter({ text: 'Created by cozy'})
            .setTimestamp()
            message.channel.send({ embeds: [embed] }); 
        } catch(error){
            message.channel.send('There was a problem fetching this player')
            throw error;
        }
    }
}