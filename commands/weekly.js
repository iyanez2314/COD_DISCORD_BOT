require('dotenv').config();
const API = require("call-of-duty-api");

module.exports = {
    name: 'weekly',
    description: 'This will get information of the users fourtunes keep kd',
    async execute(message, args, Discord){
        if(!args[0]) return message.reply('Please enter the users gamer tag');

        try{
            API.login(process.env.WZ_TOKEN)
            let data = await API.Warzone.fullData(args[0], API.platforms.Activision);

        const weeklyMode = data.data.weekly.mode

         Object.entries(weeklyMode).forEach(item => {
             const embed = new Discord.MessageEmbed()
            .setTitle(`Weekly Stats for ${item[0]}`)
            .addField('Kills', `${item[1].properties.kills.toString()}`, true)
            .addField('KD', `${item[1].properties.kdRatio.toFixed(2).toString()}`, true)
            .addField('Matches Played', `${item[1].properties.matchesPlayed.toString()}`, true)
            .addField('Headshot Percantage', `${item[1].properties.headshotPercentage.toFixed(2).toString()}`, true)
            .addField('Headshots', `${item[1].properties.headshots.toString()}`, true)
            .setTimestamp()
            .setFooter({ text: 'Made by cozy'})
             message.channel.send({ embeds: [embed] });
         });

         
        } catch (error){
            message.channel.send('Something went wrong fetching this users information')
        }
    }
}