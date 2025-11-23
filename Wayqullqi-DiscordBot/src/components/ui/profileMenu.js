const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  create(isAccountDeleted){
    const builder = new ActionRowBuilder();
    builder.addComponents(new ButtonBuilder()
        .setCustomId('onWayVirtualShowButtonClick')
        .setLabel('🎟️ Way Virtuals')
        // .setEmoji('🎟️​')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('onProfileClick')
        .setLabel('🖥️ Perfil')
        // .setEmoji('🖥️')
        .setStyle(ButtonStyle.Success)
    );

    if (!isAccountDeleted){
      builder.addComponents(
        new ButtonBuilder()
          .setCustomId('onDeleteAccountButtonClick')
          .setLabel('❌ Eliminar cuenta')
          // .setEmoji('❌')
          .setStyle(ButtonStyle.Danger)
      );
    }else {
      builder.addComponents(
        new ButtonBuilder()
          .setCustomId('OnReturnAccountButtonClick')
          .setLabel('🔙​ Cancelar proceso de eliminación')
          // .setEmoji('🔙')
          .setStyle(ButtonStyle.Secondary)
      );
    }
    return builder;
  }
};