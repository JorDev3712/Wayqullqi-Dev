const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

const { safeValueToString } = require('../../utils/util');

module.exports = {
    create(customId, title, card) {
        const modal = new ModalBuilder()
            .setCustomId(customId)
            .setTitle(title);
        
        const description = new TextInputBuilder()
            .setCustomId('CardNameInput')
            .setLabel('Descripción')
            .setStyle(TextInputStyle.Short)
            .setMinLength(4)
            .setMaxLength(20)
            .setRequired(true)
            .setValue(safeValueToString(card?.description ?? ''));

        const minSpend = new TextInputBuilder()
            .setCustomId('CardBalanceInput')
            .setLabel('Gasto mínimo')
            .setStyle(TextInputStyle.Short)
            .setMinLength(3)
            .setMaxLength(3)
            .setRequired(true)
            .setValue(safeValueToString(card?.balance ?? ''));

        const maxSpend = new TextInputBuilder()
            .setCustomId('CardMaxAmountInput')
            .setLabel('Gasto máximo')
            .setStyle(TextInputStyle.Short)
            .setMinLength(3)
            .setMaxLength(3)
            .setRequired(true)
            .setValue(safeValueToString(card?.max_amount ?? ''));

        const noticeDay = new TextInputBuilder()
            .setCustomId('CardNoticeDayInput')
            .setLabel('Notificaciones por día')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('12')
            .setMinLength(1)
            .setMaxLength(2)
            .setRequired(true)
            .setValue(safeValueToString(card?.notice_day ?? ''));

        const noticeEnable = new TextInputBuilder()
            .setCustomId('CardNoticeEnableInput')
            .setLabel('Permitir notificaciones')
            .setPlaceholder('Si/No')
            .setStyle(TextInputStyle.Short)
            .setMinLength(2)
            .setMaxLength(2)
            .setRequired(true)
            .setValue(card.enable_notice != undefined ? card.enable_notice == true ? 'Si' : 'No' : '');

        const row = new ActionRowBuilder().addComponents(description);
        const row2 = new ActionRowBuilder().addComponents(minSpend);
        const row3 = new ActionRowBuilder().addComponents(maxSpend);
        const row4 = new ActionRowBuilder().addComponents(noticeDay);
        const row5 = new ActionRowBuilder().addComponents(noticeEnable);

        modal.addComponents(row, row2, row3, row4, row5);

        return modal;
    },
    createEmpty(customId) {
        const modal = new ModalBuilder()
            .setCustomId(customId)
            .setTitle('🎫 Crea una nueva WayVirtual a tu cuenta');
        
        const description = new TextInputBuilder()
            .setCustomId('CardNameInput')
            .setLabel('Descripción')
            .setStyle(TextInputStyle.Short)
            .setMinLength(4)
            .setMaxLength(20)
            .setRequired(true);

        const minSpend = new TextInputBuilder()
            .setCustomId('CardBalanceInput')
            .setLabel('Gasto mínimo')
            .setStyle(TextInputStyle.Short)
            .setMinLength(3)
            .setMaxLength(3)
            .setRequired(true);

        const maxSpend = new TextInputBuilder()
            .setCustomId('CardMaxAmountInput')
            .setLabel('Gasto máximo')
            .setStyle(TextInputStyle.Short)
            .setMinLength(3)
            .setMaxLength(3)
            .setRequired(true);

        const noticeDay = new TextInputBuilder()
            .setCustomId('CardNoticeDayInput')
            .setLabel('Notificaciones por día')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('12')
            .setMinLength(1)
            .setMaxLength(2)
            .setRequired(true);

        const noticeEnable = new TextInputBuilder()
            .setCustomId('CardNoticeEnableInput')
            .setLabel('Permitir notificaciones')
            .setPlaceholder('Si/No')
            .setStyle(TextInputStyle.Short)
            .setMinLength(2)
            .setMaxLength(2)
            .setRequired(true);

        const row = new ActionRowBuilder().addComponents(description);
        const row2 = new ActionRowBuilder().addComponents(minSpend);
        const row3 = new ActionRowBuilder().addComponents(maxSpend);
        const row4 = new ActionRowBuilder().addComponents(noticeDay);
        const row5 = new ActionRowBuilder().addComponents(noticeEnable);

        modal.addComponents(row, row2, row3, row4, row5);

        return modal;
    }
};