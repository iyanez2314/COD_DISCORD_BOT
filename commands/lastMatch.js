require('dotenv').config()
const API = require('call-of-duty-api');

module.exports = {
    name: 'lastmatch',
    description: 'This command will allow the user to get their recent matches.',
    async execute(message, args, Discord){
        if(!args[0]) return message.reply('Please enter the users gamer tag');
        
        try{
            API.login(process.env.WZ_TOKEN)
            let output = await API.Warzone.combatHistory(args[0], API.platforms.Activision);

            const lastMatchStats = output.data.matches[0]
            let lastMatchMap = lastMatchStats.map
            let lastMatchMode = lastMatchStats.mode 
            let lastMatchPlacement = lastMatchStats.playerStats.teamPlacement
            let lastMatchKills = lastMatchStats.playerStats.kills 
            let lastMatchKd = lastMatchStats.playerStats.kdRatio.toFixed(2)
            let lastMatchHeadshots = lastMatchStats.playerStats.headshots
            let lastMatchDeaths = lastMatchStats.playerStats.deaths 
            let lastMatchGulagDeaths = lastMatchStats.playerStats.gulagDeaths
            let lastMatchDamageDone = lastMatchStats.playerStats.damageDone 
            let lastMatchDamageTaken = lastMatchStats.playerStats.damageTaken

            const embed = new Discord.MessageEmbed()
            .setColor('#eab676')
            .setTitle(`${args[0]}`)
            .setDescription('Last Match Played')
            .setThumbnail(message.author.avatarURL())
            .addField('Placement', `${lastMatchPlacement}`, true)
            .addField('Kills', `${lastMatchKills}`, true)
            .addField('KD', `${lastMatchKd}`, true)
            .addField('Headshots', `${lastMatchHeadshots}`, true)
            .addField('Deaths', `${lastMatchDeaths}`, true)
            .addField('Gulag Deaths', `${lastMatchGulagDeaths}`, true)
            .addField('Damage Done', `${lastMatchDamageDone}`, true)
            .addField('Damage Taken', `${lastMatchDamageTaken}`, true)
            .setTimestamp()
            .setFooter({ text: 'Made By Cozy' })
            message.channel.send({ embeds: [embed] })
        }catch(error){
            console.log(error)
            message.reply('There was a problem fetching this users information');
        }

    }
}