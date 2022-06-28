require('dotenv').config();
const API = require("call-of-duty-api");

module.exports = {
    name: 'rebirth',
    description: 'This will get information of the users rebirth kd',
    async execute(message, args, Discord){
        if(!args[0]) return message.reply('Please enter the users gamer tag');

        try{
            API.login(process.env.WZ_TOKEN)
            let data = await API.Warzone.fullData(args[0], API.platforms.Activision)

            let rebirthTriosKills = data.data.weekly.mode.br_rebirth_rbrthtrios.properties.kills.toString();
            let rebirthTriosKd = data.data.weekly.mode.br_rebirth_rbrthtrios.properties.kdRatio.toFixed(2).toString();
            let rebirthTriosHeadshotPercentage = data.data.weekly.mode.br_rebirth_rbrthtrios.properties.headshotPercentage.toFixed(2).toString();


            const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Rebirth Stats Weekly Stats')
            .addFields(
                {name: "Rebirth Trios Kills", value: `${rebirthTriosKills}` },
                {name: 'Rebirth Trios Kd', value: `${rebirthTriosKd}`},
                {name: 'Rebirth trios Headshot %', value: `${rebirthTriosHeadshotPercentage}`}
            )
            .setFooter({ text: 'Created by cozy'})
            console.log(data.data.weekly.mode)
            message.channel.send({ embeds: [embed] });
        } catch (error){
            console.log(error)
            message.channel.send('Something went wrong fetching this users information')
        }
    }
}