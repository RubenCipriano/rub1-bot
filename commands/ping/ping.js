const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const createEmbededMessage = require('../../utils/create_embed_messages');
const discordSpecialText = '`';

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Ping measures the round-trip time for messages sent'),
    async execute(client, interaction) {

        const embededMessage = createEmbededMessage(interaction, this.data,
            { name: 'Latency', value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true },
            { name: 'API Latency', value: `${Math.round(client.ws.ping)}ms`, inline: true },
        )

        await interaction.reply(
            { 
                embeds: [embededMessage], 
                ephemeral: true 
            }
        );
    }
}