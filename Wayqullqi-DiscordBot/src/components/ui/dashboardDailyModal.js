const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

const { safeValueToString } = require('../../utils/util');

module.exports = {
    create(cardId, userId, year, month, day) {
        const modal = new ModalBuilder()
            .setCustomId(`OnDashboardDailySubmit:${cardId}:${userId}`)
            .setTitle('📅​ Filtrar movimientos por día');
        
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

        const dayInput = new TextInputBuilder()
            .setCustomId('DashboardDayInput')
            .setLabel('Día')
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(2)
            .setValue(safeValueToString(day))
            .setRequired(true);

        const firstRow = new ActionRowBuilder().addComponents(yearInput);
        const secondRow = new ActionRowBuilder().addComponents(monthInput);
        const thirdRow = new ActionRowBuilder().addComponents(dayInput);

        modal.addComponents(firstRow, secondRow, thirdRow);

        return modal;
    }
};