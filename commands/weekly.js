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
            .setTitle('Weekly Stats')
            .setDescription('Last 7 days')
            .addFields(
                {name: 'Caldera Duos KD', value: data.data.weekly.mode.br_brduos.properties.kdRatio.toFixed().toString()},
                {name: 'Caldera Duos Kills', value: data.data.weekly.mode.br_brduos.properties.kills.toString()},
                {name: 'Caldera Duos Deaths', value: data.data.weekly.mode.br_brduos.properties.deaths.toString()},
                {name: 'Caldera Duos Gulag Ws', value: data.data.weekly.mode.br_brduos.properties.gulagKills.toString()},
                {name: 'Caldera Duos Gulag Ls', value: data.data.weekly.mode.br_brduos.properties.gulagDeaths.toString()},
                { name: '\u200B', value: '\u200B' },
                {name: 'Caldera Trios KD', value: data.data.weekly.mode.br_brtrios.properties.kdRatio.toFixed(2).toString()},
                {name: 'Caldera Trios Kills', value: data.data.weekly.mode.br_brtrios.properties.kills.toString()},
                {name: 'Caldera Trios Deaths', value: data.data.weekly.mode.br_brtrios.properties.deaths.toString()},
                {name: 'Caldera Trios Gulag Ws', value: data.data.weekly.mode.br_brtrios.properties.gulagKills.toString()},
                {name: 'Caldera Trios Gulag Ls', value: data.data.weekly.mode.br_brtrios.properties.gulagDeaths.toString()},
                { name: '\u200B', value: '\u200B' },
                {name: 'Caldera Quads KD', value: data.data.weekly.mode.br_brquads.properties.kdRatio.toFixed(2).toString()},
                {name: 'Caldera Quads Kills', value: data.data.weekly.mode.br_brquads.properties.kills.toString()},
                {name: 'Caldera Quads Deaths', value: data.data.weekly.mode.br_brquads.properties.deaths.toString()},
                {name: 'Caldera Quads Gulag Ws', value: data.data.weekly.mode.br_brquads.properties.gulagKills.toString()},
                {name: 'Caldera Quads Gulag Ls', value: data.data.weekly.mode.br_brquads.properties.gulagDeaths.toString()},
                { name: '\u200B', value: '\u200B' },
                {name: 'Resurgance Quads KD', value: data.data.weekly.mode.br_rebirth_rbrthquad.properties.kdRatio.toFixed(2).toString()},
                {name: 'Resurgance Quads Kills', value: data.data.weekly.mode.br_rebirth_rbrthquad.properties.kills.toString()},
                {name: 'Resurgance Quads Deaths', value: data.data.weekly.mode.br_rebirth_rbrthquad.properties.deaths.toString()},
            )
            .setFooter({ text: 'Created by cozy', iconURL: 'https://i.imgur.com/AfFp7pu.png'})
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            message.channel.send({ embeds: [embed] });

            console.log(data.data.weekly.mode);
        } catch(error){
            message.channel.send('There was a problem fetching this player')
            throw error;
        }
    }
}