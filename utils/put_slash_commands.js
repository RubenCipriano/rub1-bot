const { REST, Routes } = require('discord.js');

module.exports = putSlashCommands = (client) => {
    const clientCommands = client.commands
    const commands = clientCommands.map(command => command.data.toJSON())
    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(process.env.TOKEN);

    // and deploy your commands!
    (async () => {
        try {
            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID), { body: commands },
            );

            console.log(`[SUCCESS] Loaded ${data.length} slash commands.`);
        } catch (error) {
            console.error('[ERROR]', error);
        }
    })()
}