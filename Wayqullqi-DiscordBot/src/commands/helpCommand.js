const { SlashCommandBuilder, MessageFlags } = require('discord.js');

// ui
const homeMenu = require('../components/ui/homeMenu');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Display the principal menu'),

  async execute(interaction) {
    await interaction.reply({
      content: '📊 **Guide**',
      components: [homeMenu],
      flags: MessageFlags.Ephemeral
    });
  },
};
