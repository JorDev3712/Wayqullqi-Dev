const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
    create(cardId, userId) {
        const modal = new ModalBuilder()
            .setCustomId(`OnSpendFormSubmit:${cardId}:${userId}`)
            .setTitle('💸 Registrar un nuevo gasto');
        
        const description = new TextInputBuilder()
            .setCustomId('SpendNameInput')
            .setLabel('Descripción')
            .setStyle(TextInputStyle.Short)
            .setMinLength(4)
            .setMaxLength(21)
            .setRequired(true);

        const monto = new TextInputBuilder()
            .setCustomId('SpendAmountInput')
            .setLabel('Monto')
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(4)
            .setRequired(true);

        const firstRow = new ActionRowBuilder().addComponents(description);
        const secondRow = new ActionRowBuilder().addComponents(monto);

        modal.addComponents(firstRow, secondRow);

        return modal;
    }
};