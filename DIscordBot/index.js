const { Client, GatewayIntentBits } =  require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.on('messageCreate', message => {

    if (message.author.bot) {
        return
    }

    if (message.content.startsWith('create')) {
        const url = message.content.split('create') [1];

        console.log(url)
        message.reply('Genrating short id for : ' + url)
        return
    }

    console.log(message.content)
    message.reply('Hello from BOT')
})


client.on('interactionCreate', interaction => {
    // console.log(interaction)
    interaction.reply('PONG !!!')

})

client.login('')
