const dotenv = require('dotenv')
const { Collection, Events, ActivityType } = require('discord.js');
const configCommands = require('./utils/read_commands')
const putSlashCommands = require('./utils/put_slash_commands')
const client = require('./utils/create_bot');

dotenv.config()

bot.commands = new Collection()

configCommands(client);

putSlashCommands(client);

client.on('ready', async () => {
	client.user.setPresence({
		activities: [{ 
			name: `Working on ${client.guilds.cache.size} servers`, 
			type: ActivityType.Custom
		}], 
		status: 'dnd' 
	})
    console.log('[ONLINE] Bot Ready');
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return console.warn(`[WARN] No command matching ${interaction.commandName} was found`);

    try {
        await command.execute(client, interaction);

    } catch (error) {
		console.error('[ERROR]', error);

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(process.env.TOKEN)