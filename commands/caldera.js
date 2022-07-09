require('dotenv').config();
const API = require('call-of-duty-api');

module.exports = {
    name: 'caldera',
    description: 'This command will get the users information for caldera',
    async execute(message, args, Discord){
        if(!args[0]) return message.reply('Please enter the users gamer tag');
        

        try{
            API.login(process.env.WZ_TOKEN);
            let output = await API.Warzone.fullData(args[0], API.platforms.Activision)
            let calderaSolos = 'br_brsolo';
            let calderDuos = 'br_brduos';
            let calderaTrios = 'br_brtrios';
            let calderQuads = 'br_brquads';

            const calderaModes = output.data.weekly.mode;

            Object.entries(calderaModes).filter( mode => {
                let newArray = [];

                if(mode[0] === calderaSolos){
                    newArray.push(mode)
                };

                if(mode[0] === calderDuos){
                    newArray.push(mode);
                };
                if(mode[0] === calderaTrios){
                    newArray.push(mode);
                };
                if(mode[0] === calderQuads){
                    newArray.push(mode);
                };

                newArray.forEach((item) => {
                    let gameModeNameChange = ''

                    if(item[0] === calderaSolos){
                        gameModeNameChange = 'Caldera Solos'
                    }

                    if(item[0] === calderDuos){
                        gameModeNameChange = 'Caldera Duos'
                    };

                    if(item[0] === calderaTrios){
                        gameModeNameChange = 'Caldera Trios'
                    };

                    if(item[0] === calderQuads){
                        gameModeNameChange = 'Calder Quads'
                    }

                    let matchesPlayed = item[1].properties.matchesPlayed
                    let kdRatio = item[1].properties.kdRatio.toFixed(2)
                    let kills = item[1].properties.kills
                    let headshotPercentage =  item[1].properties.headshotPercentage.toFixed(2)
                    let headshots = item[1].properties.headshots
                    
                    const embed = new Discord.MessageEmbed()
                    .setColor('#eab676')
                    .setTitle(`${args[0]}`)
                    .setDescription(`Weekly stats for ${gameModeNameChange}`)
                    .setThumbnail(message.author.avatarURL())
                    .addField('Matches Played', `${matchesPlayed}`, true)
                    .addField('KD', `${kdRatio}`, true)
                    .addField('Kills', `${kills}`, true)
                    .addField('Headshot Percentage', `${headshotPercentage}`, true)
                    .addField('Headshots', `${headshots}`, true)
                    .setFooter({ text: 'Created By Cozy'})
                    .setTimestamp()
                    message.channel.send({ embeds: [embed]})
                })
            });

        } catch(error){
            message.channel.send('There was an error fetching this users information')
        }
    }
}