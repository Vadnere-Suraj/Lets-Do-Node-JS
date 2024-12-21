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

client.login('MTMxNjc3MDQ2NDkwMjgwNzcwMw.Gb1uZc.dSxlD-8KKAl90R5F192DnQih-Vc_torampod_Y')