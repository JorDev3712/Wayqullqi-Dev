const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Display the main menu'),

  async execute(interaction) {
    const builder1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('onStartedButtonClick')
        .setLabel('💸 Empezar')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('onTermsButtonClick')
        .setLabel('⚖️ Terminos y condiciones')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('onPolicyButtonClick')
        .setLabel('⚔️ Politica')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({
      content: '📊 **Guide**',
      components: [builder1],
      flags: MessageFlags.Ephemeral
    });
  },
};
