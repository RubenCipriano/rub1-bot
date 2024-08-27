const {Client, GatewayIntentBits } = require('discord.js')


module.exports = bot = new Client({
    intents: [8]
})