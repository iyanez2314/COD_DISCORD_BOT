module.exports ={
    name: 'list',
    description: 'This will give the user the list of commands and examples that the bot has',
    execute(client, message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#32a852')
        .setTitle('List of commands that cozy bot has')
        .setDescription('New commands will be added')
        .addFields(
            {name: 'Lifetime stats', value: '!lifetime <YOUR ACTIVISION TAG GOES HERE>'},
            {name: 'Weekly Stats', value: '!weekly <YOUR ACTIVISION TAG GOES HERE'},
        )
        .setFooter({ text: 'Created by cozy', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
        message.channel.send({ embeds: [newEmbed]});
    }
}