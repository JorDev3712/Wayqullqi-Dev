const { 
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require('discord.js');

const { safeValueToString } = require('../../utils/util');

module.exports = {
  createButtons(card) {
    const builder = new ActionRowBuilder();
    const cardIds = `${card.id}:${card.user_id}`;
    builder.addComponents(
        new ButtonBuilder()
            .setCustomId(`OnCardConfigClick:${cardIds}`)
            .setLabel('⚙️ Configurar')
            // .setEmoji('⚙️')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId(`OnCardDashboardClick:${cardIds}`)
            .setLabel('💰 Movimientos')
            // .setEmoji('💰​')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId(`OnCardDeleteClick:${cardIds}`)
            .setLabel("❌ Eliminar")
            // .setEmoji('❌')
            .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
            .setCustomId(`OnCardMoneySpentClick:${cardIds}`)
            .setLabel('➕ Agregar gasto rápido')
            // .setEmoji('➕​​')
            .setStyle(ButtonStyle.Secondary),
    );
    // const builder2 = new ActionRowBuilder();
            // builder2.addComponents(
            //     new ButtonBuilder()
            //         .setCustomId(`OnCardMoneySpentClick:${cardIds}`)
            //         .setLabel('Agregar gasto')
            //         .setEmoji('➕​​')
            //         .setStyle(ButtonStyle.Success)
            //     ,
            //     new ButtonBuilder()
            //         .setCustomId(`OnCardDashboardClick:${cardIds}`)
            //         .setLabel('Movimientos')
            //         .setEmoji('💰​')
            //         .setStyle(ButtonStyle.Primary)
            //     ,
            //     new ButtonBuilder()
            //         .setCustomId(`OnCardDeleteClick:${cardIds}`)
            //         .setLabel("Eliminar")
            //         .setEmoji('❌')
            //         .setStyle(ButtonStyle.Danger)
            // );
    return builder;
  },

  createEmbed(card, iconBotUrl) {
    return new EmbedBuilder()
        .setColor(0xf1c40f)
        .setTitle(`Virtual Card: ${card.description}`)
        .setDescription(new Date(card.createdAt).toDateString())
        .addFields(
            { name: 'Gasto mínimo', value: safeValueToString(card.balance), inline: true },
            { name: 'Gasto máximo', value: safeValueToString(card.max_amount), inline: true },
            { name: 'Notificaciones por día', value: safeValueToString(card.notice_day), inline: false },
            { name: 'Notificaciones por hora', value: safeValueToString(card.notice_hour), inline: true },
            { name: 'Permitir envio de notificación', value: safeValueToString(card.enable_notice), inline: true },
            // {
                //   name: '📅 Fecha de creación',
                //   value: `<t:${Math.floor(card.createdAt / 1000)}:F>`,
                //   inline: false
            // }
        )
        .setThumbnail('https://images.icon-icons.com/550/PNG/512/business-color_badge_icon-icons.com_53477.png')
        .setFooter({
            text: 'Wayqullqi Bot',
            iconURL: iconBotUrl,
        })
        .setTimestamp();
  }
};