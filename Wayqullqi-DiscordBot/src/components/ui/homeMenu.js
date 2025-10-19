const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('onStartButtonClick')
        .setLabel('🚀​ Empezar')
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