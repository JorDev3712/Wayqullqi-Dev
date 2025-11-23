const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Home'),

  async execute(interaction) {
    return await interaction.client.buttons.get('onStartButtonClick').execute(interaction);
  },
};
