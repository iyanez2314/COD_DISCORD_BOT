require('dotenv').config();
const API = require("call-of-duty-api");
const { Warzone, platforms } = require("call-of-duty-api");

module.exports = {
    name: 'weekly',
    description: 'This will show the user the daily match history',
    async execute(client, message, args, Discord){
        if(!args[0]) return message.channel.send('Please enter a players gamer tag');

        try {
            API.login(process.env.WZ_TOKEN);
            let data = await API.Warzone.fullData(args[0], API.platforms.Activision)
            
            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Weekly Stats (Last 7 days)')
            .addFields(
                {name: 'Caldera Duos KD', value: data.data.weekly.mode.br_brduos.properties.kdRatio.toFixed().toString(), inline: true},
                {name: 'Caldera Duos Kills', value: data.data.weekly.mode.br_brduos.properties.kills.toString(), inline: true },
                {name: 'Caldera Duos Deaths', value: data.data.weekly.mode.br_brduos.properties.deaths.toString(), inline: true},
                {name: 'Caldera Duos Gulag Ws', value: data.data.weekly.mode.br_brduos.properties.gulagKills.toString(), inline: true},
                {name: 'Caldera Duos Gulag Ls', value: data.data.weekly.mode.br_brduos.properties.gulagDeaths.toString(), inline: true},
                { name: '\u200B', value: '\u200B' },
                {name: 'Caldera Trios KD', value: data.data.weekly.mode.br_brtrios.properties.kdRatio.toFixed(2).toString(), inline: true},
                {name: 'Caldera Trios Kills', value: data.data.weekly.mode.br_brtrios.properties.kills.toString(), inline: true},
                {name: 'Caldera Trios Deaths', value: data.data.weekly.mode.br_brtrios.properties.deaths.toString(), inline: true},
                {name: 'Caldera Trios Gulag Ws', value: data.data.weekly.mode.br_brtrios.properties.gulagKills.toString(), inline: true},
                {name: 'Caldera Trios Gulag Ls', value: data.data.weekly.mode.br_brtrios.properties.gulagDeaths.toString(), inline: true},
                { name: '\u200B', value: '\u200B' },
                {name: 'Caldera Quads KD', value: data.data.weekly.mode.br_brquads.properties.kdRatio.toFixed(2).toString()},
                {name: 'Caldera Quads Kills', value: data.data.weekly.mode.br_brquads.properties.kills.toString(), inline: true},
                {name: 'Caldera Quads Deaths', value: data.data.weekly.mode.br_brquads.properties.deaths.toString(), inline: true},
                {name: 'Caldera Quads Gulag Ws', value: data.data.weekly.mode.br_brquads.properties.gulagKills.toString()},
                {name: 'Caldera Quads Gulag Ls', value: data.data.weekly.mode.br_brquads.properties.gulagDeaths.toString()},
                { name: '\u200B', value: '\u200B' },
                {name: 'Resurgance Quads', value: data.data.weekly.mode.br_rebirth_rbrthquad.properties.kdRatio.toFixed(2).toString()},
                {name: 'Resurgance Quads', value: data.data.weekly.mode.br_rebirth_rbrthquad.properties.kills.toString(), inline: true},
                {name: 'Resurgance Quads', value: data.data.weekly.mode.br_rebirth_rbrthquad.properties.deaths.toString(), inline: true},
            )
            .setFooter({ text: 'Created by cozy'})
            message.channel.send({ embeds: [embed] });

            console.log(data.data.weekly.mode);
        } catch(error){
            message.channel.send('There was a problem fetching this player')
            throw error;
        }
    }
}