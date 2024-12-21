const { REST, Routes } =  require('discord.js') ;


const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
  ];


  const rest = new REST({ version: '10' }).setToken('MTMxNjc3MDQ2NDkwMjgwNzcwMw.Gb1uZc.dSxlD-8KKAl90R5F192DnQih-Vc_torampod_Y');

(async() => {
try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands('1316770464902807703'), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}})();