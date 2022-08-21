require('dotenv').config();
const API = require("call-of-duty-api");


module.exports ={
    name:'titaniumTrials',
    description: 'Titanium trials stats',
    async execute(message, args, Discord){
        if(!args[0]) return message.reply('Please Provide the gamer tag! Example: Iamabot#345678')

        try{
            API.login(process.env.WZ_TOKEN)
            let data = await API.Warzone.fullData(args[0], API.platforms.Activision)
           const titaniumTrialsQuads = 'br_tdbd_playlist_wz345/cal_titanium_quads';
           const titaniumTrialsDuos = 'br_tdbd_playlist_wz345/cal_titanium_duos';
           const brModes = data.data.weekly.mode

           

           Object.entries(brModes).filter(mode => {

            let newArray = [];

            if(mode[0] === titaniumTrialsQuads){
                newArray.push(mode);
            }
            if(mode[0] === titaniumTrialsDuos){
                newArray.push(mode)
            }


            newArray.forEach((item) => {

                let gameModeNameChange = ''
                   if(item[0] === titaniumTrialsDuos){
                    gameModeNameChange = 'Titanium Trials Duos'
                   }
                   if(item[0] === titaniumTrialsQuads){
                       gameModeNameChange = 'Titanium Trials Quads'
                   }
    
                   const embed = new Discord.MessageEmbed()
                   .setColor('#eab676')
                   .setTitle(`${args[0]}`)
                   .setDescription(`Weekly Stats for ${gameModeNameChange}`)
                   .setThumbnail(message.author.avatarURL())
                   .addField('Matches Played', `${item[1].properties.matchesPlayed}`, true)
                   .addField('KD', `${item[1].properties.kdRatio.toFixed(2)}`, true)
                   .addField('Kills', `${item[1].properties.kills}`, true)
                   .addField('Headshot Percentage', `${item[1].properties.headshotPercentage.toFixed(2)}`, true)
                   .addField('Headshots', `${item[1].properties.headshots}`, true)
                   .setTimestamp()
                   .setFooter({ text: 'Made By Cozy'})
                   message.channel.send({ embeds: [embed]})
               })
           });
        } catch (error){
            console.log(error)
        }
    } 
}