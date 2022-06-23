require('dotenv').config();
const API = require("call-of-duty-api");
const { Warzone, platforms } = require("call-of-duty-api");

module.exports = {
    name: 'daily',
    description: 'This will show the user the daily match history',
    async execute(client, message, args, Discord){
        if(!args[0]) return message.channel.send('Please enter a players gamer tag');

        try {
            API.login(process.env.WZ_TOKEN);
            let data = await API.Warzone.breakdown(args[0], API.platforms.Activision)

            console.log(data);
        } catch(error){
            message.channel.send('There was a problem fetching this player')
            throw error;
        }
    }
}