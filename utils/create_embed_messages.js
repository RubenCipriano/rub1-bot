const { EmbedBuilder } = require('discord.js');
const discordSpecialText = '`';

module.exports = createMessage = (interaction, data, ...fields) => {
    fields.forEach(field => {
        field.value = `${discordSpecialText} ${field.value} ${discordSpecialText}`
    })

    const embededMessage = new EmbedBuilder()
        .setTitle(data.name.toUpperCase())
        .setDescription(discordSpecialText + data.description + discordSpecialText)
        .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.avatarURL() })
        .setThumbnail(interaction.user.avatarURL())
        .setFields(...fields)

    return embededMessage;
}