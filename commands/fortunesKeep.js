require('dotenv').config();
const API = require("call-of-duty-api");

module.exports = {
    name: 'fortunesKeep',
    description: 'This will get information of the users fourtunes keep kd',
    async execute(message, args, Discord){
        if(!args[0]) return message.reply('Please enter the users gamer tag');

        try{
            API.login(process.env.WZ_TOKEN)
            let data = await API.Warzone.fullData(args[0], API.platforms.Activision)

            let fkKeepDuosKd = data.data.weekly.mode['br_rebirth_playlist_wz340/fortkeep_res_duos'].properties.kdRatio.toFixed(2).toString();
            let fkKeepKills = data.data.weekly.mode['br_rebirth_playlist_wz340/fortkeep_res_duos'].properties.kills.toString();
            let fkHeadshots = data.data.weekly.mode['br_rebirth_playlist_wz340/fortkeep_res_duos'].properties.headshots.toString();
            let ftKeepHeadshotPercentage = data.data.weekly.mode['br_rebirth_playlist_wz340/fortkeep_res_duos'].properties.headshotPercentage.toFixed(2).toString();


            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Fortunes Keep Weekly Stats')
            .addFields(
                {name: "Fourtunes Keep Duos Kd", value: `${fkKeepDuosKd}` },
                {name: "Fourtunes Keep Kills", value: `${fkKeepKills}`},
                {name: "Fourtunes Keep Headshots", value: `${fkHeadshots}`},
                {name: "Fourtunes Keep Headshot %", value: `${ftKeepHeadshotPercentage}`}
            )
            .setFooter({ text: 'Created by cozy'})
            // console.log(data.data.weekly.mode)
            message.channel.send({ embeds: [embed] });
        } catch (error){
            console.log(error)
            message.channel.send('Something went wrong fetching this users information')
        }
    }
}