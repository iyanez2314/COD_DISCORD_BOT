module.exports ={
    name: 'clear',
    description: 'This command will clear messages from chat depending on how many you specify',
    async execute(message, args){
        if(!args[0]) return message.channel.send('Please specify how many messages you would like to delete');
        if(isNaN(args[0])) return message.channel.send('Please enter a number');

        if(args[0] > 100) return message.channel.send('Please enter a number less than 100');
        if(args[0] < 1) return message.channel.send('You must delete atleast 1 message')

        await message.channel.messages.fetch({limit: ++args[0]}).then(messages => {
            message.channel.bulkDelete(messages)
        })
    }
}
