const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('onWayVirtualShowButtonClick')
        .setLabel('💳 Way Virtuals')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('onProfileClick')
        .setLabel('🖥️ Perfil')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('onDeleteAccountButtonClick')
        .setLabel('❌ Eliminar cuenta')
        .setStyle(ButtonStyle.Danger)
);