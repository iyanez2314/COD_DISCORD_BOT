module.exports = {
    name: 'embed',
    description : 'This will send the user embed',
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#afdcec')
        .setTitle('User Gamertags')
        .addFields(
            {name: 'ACTI', value: 'something#3456'},
            {name: 'PSN', value: 'something#3456'},
            {name: 'BATTLE', value: 'something#3456'}
        )
        .setFooter({ text: 'Created by cozy', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
        .setThumbnail('https://i.imgur.com/AfFp7pu.png');

        message.channel.send({ embeds: [newEmbed] }); ;

    }
}