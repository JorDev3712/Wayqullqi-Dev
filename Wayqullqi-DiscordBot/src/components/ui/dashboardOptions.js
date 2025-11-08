const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

module.exports = {
    create(cardId, userId) {
        const cardIds = `${cardId}:${userId}`;
        const builder = new ActionRowBuilder();
        builder.addComponents(
            new ButtonBuilder()
                .setCustomId(`OnCardDashboardDailyClick:${cardIds}`)
                .setLabel('Daily')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`OnCardDashboardWeeklyClick:${cardIds}`)
                .setLabel('Weekly')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`OnCardDashboardMonthClick:${cardIds}`)
                .setLabel('Monthly')
                .setStyle(ButtonStyle.Primary),
        );
        return builder;
    }
};