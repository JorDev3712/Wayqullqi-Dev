const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

const { safeValueToString } = require('../../utils/util');

module.exports = {
    create(cardId, userId, year, month) {
        const modal = new ModalBuilder()
            .setCustomId(`OnDashboardMonthlySubmit:${cardId}:${userId}`)
            .setTitle('📅​ Filtrar movimientos por mes');
        
        const yearInput = new TextInputBuilder()
            .setCustomId('DashboardYearInput')
            .setLabel('Año')
            .setStyle(TextInputStyle.Short)
            .setMinLength(4)
            .setMaxLength(4)
            .setValue(safeValueToString(year))
            .setRequired(true);

        const monthInput = new TextInputBuilder()
            .setCustomId('DashboardMonthInput')
            .setLabel('Mes')
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(2)
            .setValue(safeValueToString(month))
            .setRequired(true);

        const firstRow = new ActionRowBuilder().addComponents(yearInput);
        const secondRow = new ActionRowBuilder().addComponents(monthInput);

        modal.addComponents(firstRow, secondRow);

        return modal;
    }
};