const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Muestra el perfil de la cuenta.'),

  async execute(interaction) {
    return await interaction.client.buttons.get('onProfileClick').execute(interaction);
  },
};
