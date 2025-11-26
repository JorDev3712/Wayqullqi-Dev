const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
    create(cardId, userId) {
        const modal = new ModalBuilder()
            .setCustomId(`OnSpendDataFormSubmit:${cardId}:${userId}`)
            .setTitle('💸 Registrar un gasto detallado');
        
        const description = new TextInputBuilder()
            .setCustomId('SpendNameInput')
            .setLabel('Descripción')
            .setStyle(TextInputStyle.Short)
            .setMinLength(4)
            .setMaxLength(30)
            .setRequired(true);

        const amount = new TextInputBuilder()
            .setCustomId('SpendAmountInput')
            .setLabel('Monto')
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(4)
            .setRequired(true);

        // const yearInput = new TextInputBuilder()
        //     .setCustomId('SpendYearInput')
        //     .setLabel('Año')
        //     .setStyle(TextInputStyle.Short)
        //     .setMinLength(4)
        //     .setMaxLength(4)
        //     .setRequired(true)
        //     .setPlaceholder('2025');

        const monthInput = new TextInputBuilder()
            .setCustomId('SpendMonthInput')
            .setLabel('Mes')
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(2)
            .setRequired(true)
            .setPlaceholder('09');

        const dayInput = new TextInputBuilder()
            .setCustomId('SpendDayInput')
            .setLabel('Dia')
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(2)
            .setRequired(true)
            .setPlaceholder('09');

        const timeInput = new TextInputBuilder()
            .setCustomId('SpendTimeInput')
            .setLabel('Hora')
            .setStyle(TextInputStyle.Short)
            .setMinLength(3)
            .setMaxLength(5)
            .setPlaceholder('09:10')
            .setRequired(false);

        const firstRow = new ActionRowBuilder().addComponents(description);
        const secondRow = new ActionRowBuilder().addComponents(amount);
        // const row3 = new ActionRowBuilder().addComponents(yearInput);
        const row4 = new ActionRowBuilder().addComponents(monthInput);
        const row5 = new ActionRowBuilder().addComponents(dayInput);
        const row6 = new ActionRowBuilder().addComponents(timeInput);

        modal.addComponents(firstRow, secondRow/*, row3¨*/, row4, row5, row6);

        return modal;
    }
};