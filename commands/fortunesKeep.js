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


        /*
        What game modes that I have for fortunes keep
        solos
        duos
        quads
        I need trios
         */

        /*
        If the user does not have some of the game modes that I am looking for I will need to let the user know that there is no stats for those modes right now.
        But there is stats for the ones that they do have.
        */

        console.log('this is the data', data.data.weekly.mode)

        const weeklyMode = data.data.weekly.mode

        const weeklyModeEntries = Object.entries(weeklyMode)

        console.log('Weekly mode entries', weeklyModeEntries[0])

        // weeklyMode.forEach(element => {
        //     const embed = new Discord.MessageEmbed()
        //     .
        // });


        // console.log(data.data.weekly.mode['br_rebirth_reverse_playlist_wz340/fortkeep_res_duos'])
       
            // if(data.data.weekly.mode['br_rebirth_reverse_playlist_wz340/fortkeep_res_duos'] === undefined){
            //     message.channel.send('There is no data for fortunes keep duos at this time')
            // } else {
            //     const embed = 
            // }

              // Fortunes Keep Solo stats
            //   let fkSoloKd = data.data.weekly.mode['br_rebirth_reverse_playlist_wz340/fortkeep_res_solo'].properties.kdRatio.toFixed(2).toString();
            //   let fkSoloKills = data.data.weekly.mode['br_rebirth_reverse_playlist_wz340/fortkeep_res_solo'].properties.kills.toString();
            //   let fkSoloHeadshot = data.data.weekly.mode['br_rebirth_reverse_playlist_wz340/fortkeep_res_solo'].properties.headshots.toString();
            //   let fkSoloHeadshotPercentage = data.data.weekly.mode['br_rebirth_reverse_playlist_wz340/fortkeep_res_solo'].properties.headshotPercentage.toFixed(2).toString();

                // Fortunes Keep Duo stats
            // let fkKeepDuosKd = data.data.weekly.mode['br_rebirth_playlist_wz340/fortkeep_res_duos'].properties.kdRatio.toFixed(2).toString();
            // let fkKeepKills = data.data.weekly.mode['br_rebirth_playlist_wz340/fortkeep_res_duos'].properties.kills.toString();
            // let fkHeadshots = data.data.weekly.mode['br_rebirth_playlist_wz340/fortkeep_res_duos'].properties.headshots.toString();
            // let fkKeepHeadshotPercentage = data.data.weekly.mode['br_rebirth_playlist_wz340/fortkeep_res_duos'].properties.headshotPercentage.toFixed(2).toString();


            //Fortunes Keep Quads 


            // const embed = new Discord.MessageEmbed()
            // .setColor('#0099ff')
            // .setTitle('Fortunes Keep Weekly Stats')
            // .addFields(
            //     {name: "fortunes Keep Solo Kd", value: `${fkSoloKd}`},
            //     {name: "fortunes Keep Solo Kills", value: `${fkSoloKills}`},
            //     {name: "fortunes Keep Solo Headshots", value: `${fkSoloHeadshot}`},
            //     {name: "fortunes Keep Solo Headshot Percentage", value: `${fkSoloHeadshotPercentage}`},
            //     { name: '\u200B', value: '\u200B' },
            //     {name: "Fourtunes Keep Duos Kd", value: `${fkKeepDuosKd}` },
            //     {name: "Fourtunes Keep Kills", value: `${fkKeepKills}`},
            //     {name: "Fourtunes Keep Headshots", value: `${fkHeadshots}`},
            //     {name: "Fourtunes Keep Headshot %", value: `${fkKeepHeadshotPercentage}`},
            //     { name: '\u200B', value: '\u200B' },
            //     {name: "Fourtunes Keep Duos Kd", value: `${fkKeepDuosKd}` },
            //     {name: "Fourtunes Keep Duos Kd", value: `${fkKeepDuosKd}` },
            //     {name: "Fourtunes Keep Duos Kd", value: `${fkKeepDuosKd}` },
            //     {name: "Fourtunes Keep Duos Kd", value: `${fkKeepDuosKd}` },
            // )
            // .setFooter({ text: 'Created by cozy'})
            // console.log(data.data.weekly.mode)
            // message.channel.send({ embeds: [embed] });
        } catch (error){
            console.log(error)
            // message.channel.send('Something went wrong fetching this users information')
        }
    }
}