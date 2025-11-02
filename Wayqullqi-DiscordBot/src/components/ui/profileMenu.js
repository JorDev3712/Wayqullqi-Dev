const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('onWayVirtualShowButtonClick')
        .setLabel('🎟️ Way Virtuals')
        // .setEmoji('🎟️​')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('onProfileClick')
        .setLabel('🖥️ Perfil')
        // .setEmoji('🖥️')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('onDeleteAccountButtonClick')
        .setLabel('❌ Eliminar cuenta')
        // .setEmoji('❌')
        .setStyle(ButtonStyle.Danger)
);