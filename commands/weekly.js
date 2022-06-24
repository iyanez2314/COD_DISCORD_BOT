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
            .setColor('#20AD00')
            .setTitle('Weekly Stats')
            .addFields(
                {name: 'Caldera Duos KD', value: data.data.weekly.mode.br_brduos.properties.kdRatio.toFixed().toString(), inline: true},
                {name: 'Caldera Trios KD', value: data.data.weekly.mode.br_brtrios.properties.kdRatio.toFixed(2).toString(), inline: true},
                {name: 'Caldera Quads KD', value: data.data.weekly.mode.br_brquads.properties.kdRatio.toFixed(2).toString(), inline: true},
                {name: 'Resurgance Quads', value: data.data.weekly.mode.br_rebirth_rbrthquad.properties.kdRatio.toFixed(2).toString()},
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