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
            const fortunesKeepSolo = 'br_rebirth_reverse_playlist_wz340/fortkeep_res_solo';
            const fortunesKeepDuos = 'br_rebirth_reverse_playlist_wz340/fortkeep_res_duo';
            const fortunesKeepTrios = 'br_rebirth_reverse_playlist_wz340/fortkeep_res_trio';
            const fortunesKeepQuad= 'br_rebirth_playlist_wz340/fortkeep_res_quad';


            const brModes = data.data.weekly.mode

                 Object.entries(brModes).filter(mode => {

                    let newArray = [];

                     if(mode[0] === fortunesKeepSolo){
                         newArray.push(mode);
                     };
                     if(mode[0] === fortunesKeepDuos){
                        newArray.push(mode)
                    };
                    if(mode[0] === fortunesKeepTrios){
                        newArray.push(mode)
                    };
                    if(mode[0] === fortunesKeepQuad){
                        newArray.push(mode)
                    };

                     
                    newArray.forEach((item) => {
                        let gameModeNameChange = ''

                        if(item[0] === fortunesKeepSolo){
                            gameModeNameChange = 'Fortunes Keep Solo'
                        }
                        if(item[0] === fortunesKeepDuos){
                            gameModeNameChange = 'Fortunes Keep Duos'
                        }
                        if(item[0] === fortunesKeepTrios){
                            gameModeNameChange = 'Fortunes Keep Trios'
                        }
                        if(item[0] === fortunesKeepQuad){
                            gameModeNameChange = 'Fortunes Keep Quads'
                        }
                       const embed = new Discord.MessageEmbed()
                       .setTitle(`Weekly Stats for ${gameModeNameChange}`)
                       .addField('Matches Played', `${item[1].properties.matchesPlayed}`, true)
                       .addField('KD', `${item[1].properties.kdRatio.toFixed(2)}`, true)
                       .addField('Kills', `${item[1].properties.kills}`, true)
                       .addField('Headshot Percantage', `${item[1].properties.headshotPercentage.toFixed(2)}`, true)
                       .addField('Headshots', `${item[1].properties.headshots}`, true)
                       message.channel.send({ embeds: [embed]})
                    })
                 });

        } catch (error){
            message.channel.send('You do not have any fortunes keep weekly stats at this time')
        }
    }
}