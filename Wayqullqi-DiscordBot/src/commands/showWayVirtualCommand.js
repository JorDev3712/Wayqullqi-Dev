const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wayvirtuals')
    .setDescription('Mostrar Way Virtuals de su cuenta.'),

  async execute(interaction) {
    return await interaction.client.buttons.get('onWayVirtualShowButtonClick').execute(interaction);
  },
};
