require('dotenv').config();
const API = require("call-of-duty-api");

module.exports = {
    name: 'rebirth',
    description: 'This will get information of the users rebirth kd',
    async execute(message, args, Discord){
        if(!args[0]) return message.reply('Please enter the users gamer tag');

        try{
            API.login(process.env.WZ_TOKEN)
            let output = await API.Warzone.fullData(args[0], API.platforms.Activision)
            let rebirthDuos = 'br_rebirth_rbrthduos';
            let rebirthTrios = 'br_rebirth_rbrthtrios';
            let rebirthQuads = 'br_rebirth_rbrthquad';

            const rebirthModes = output.data.weekly.mode

            Object.entries(rebirthModes).filter(mode => {
                let newArray = [];

                if(mode[0] === rebirthDuos){
                    newArray.push(mode)
                };
                if(mode[0] === rebirthTrios){
                    newArray.push(mode)
                };
                if(mode[0] === rebirthQuads){
                    newArray.push(mode)
                };

                newArray.forEach((item) => {
                    let gameModeNameChange = ''

                    if(item[0] === rebirthDuos){
                        gameModeNameChange = 'Rebirth Duos'
                    };
                    if(item[0] === rebirthTrios){
                        gameModeNameChange = 'Rebith Trios'
                    };
                    if(item[0] === rebirthQuads){
                        gameModeNameChange = 'Rebirth Quads'
                    };

                    let matchesPlayed = item[1].properties.matchesPlayed
                    let kdRatio = item[1].properties.kdRatio.toFixed(2)
                    let kills = item[1].properties.kills
                    let headshotPercentage = item[1].properties.headshotPercentage.toFixed(2)
                    let headshots = item[1].properties.headshots

                    const embed = new Discord.MessageEmbed()
                    .setColor('#eab676')
                    .setTitle(`${args[0]}`)
                    .setDescription(`Weekly Stats for ${gameModeNameChange}`)
                    .setThumbnail(message.author.avatarURL())
                    .addField('Matches Played',`${matchesPlayed}`,true)
                    .addField('KD',`${kdRatio}`,true)
                    .addField('Kills',`${kills}`,true)
                    .addField('Headshot Percentage',`${headshotPercentage}`,true)
                    .addField('Headshots',`${headshots}`, true)
                    .setTimestamp()
                    .setFooter({ text: 'Created By Cozy'})
                    message.channel.send({ embeds: [embed] });
                })
            })
        } catch (error){
            message.channel.send('Something went wrong fetching this users information')
        }
    }
}