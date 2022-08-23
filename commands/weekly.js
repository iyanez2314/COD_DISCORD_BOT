require('dotenv').config();
const API = require("call-of-duty-api");
const modes = require('../Game-Modes/gamemodes');

module.exports = {
    name: 'weekly',
    description: 'This will get information of the users fourtunes keep kd',
    async execute(message, args, Discord){
        if(!args[0]) return message.reply('Please enter the users gamer tag');

        try{
            API.login(process.env.WZ_TOKEN)
            let data = await API.Warzone.fullData(args[0], API.platforms.Activision);

            const weeklyMode = data.data.weekly.mode;

            console.log(weeklyMode)
            
            let gameModeNameChange = ''

            modes.forEach((mode) => {
                for(let gameMode in mode){
                    if(weeklyMode === gameMode){
                        gameModeNameChange += mode[gameMode]
                    }
                }
            })


         Object.entries(weeklyMode).forEach(item => {
             let mode = ''

             if(item[0] === 'br_all'){
                mode = 'All BR Modes'
            }
            // Caldera Mode Name Change
            if(item[0] === 'br_brsolo'){
                mode = ' Caldera Solos'
            }

            if(item[0] === 'br_brduos'){
                mode = 'Caldera Duos'
            }

            if(item[0] === 'br_brtrios'){
                mode = 'Caldera Trios'
            }

            if(item[0] === 'br_brquads'){
                mode = 'Caldera Quads'
            }
            // ------------ End To Caldera Modes 

            // Rebirth Game Mode Name Change 
            if(item[0] === 'br_rebirth_rbrthsolos'){
                mode = 'Rebirth Solos'
            }

            if(item[0] === 'br_rebirth_rbrthduos'){
                mode = 'Rebirth Duos'
            }

            if(item[0] === 'br_rebirth_rbrthtrios'){
                mode = 'Rebirth Trios'
            }

            if(item[0] === 'br_rebirth_rbrthquad'){
                mode = 'Rebirth Quads'
            }
            // ----------------- End to rebirth modes

            // Fortunes keep game mode name change
            if(item[0] === 'br_rebirth_reverse_playlist_wz340/fortkeep_res_solo'){
                mode = 'Fortunes Keep Solo'
            }

            if(item[0] === 'br_rebirth_reverse_playlist_wz340/fortkeep_res_duo'){
                mode = 'Fortunes Keep Duo'
            }
            if(item[0] === 'br_rebirth_reverse_playlist_wz340/fortkeep_res_trio'){
                mode = 'Fortunes Keep trio'
            }

            if(item[0] === 'br_rebirth_playlist_wz340/fortkeep_res_quad'){
                mode = 'Fortunes Keep Quads'
            }
            // -------------------- End to fortunes keep modes

            // -- Titanium Trials 
            if(item[0] === "br_tdbd_playlist_wz345/cal_titanium_quads"){
                mode = 'Titanium Trials Duos'
            }
               if(item[0] === "br_tdbd_playlist_wz345/cal_titanium_duos"){
                   mode = 'Titanium Trials Quads'
            }
            // End to titanium trials

            if(item[0] === 'br_gold_war_playlist_wz340/gld_pldr'){
                mode += 'Golden Plunder'
            }

             const embed = new Discord.MessageEmbed()
             .setColor('#eab676')
            .setTitle(`${args[0]}`)
            .setDescription(`Weekly Stats for ${mode}`)
            .setThumbnail(message.author.avatarURL())
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
            console.log(error)
            message.channel.send('Something went wrong fetching this users information')
        }
    }
}