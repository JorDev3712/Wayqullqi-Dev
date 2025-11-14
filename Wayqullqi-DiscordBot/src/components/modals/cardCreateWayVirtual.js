const { MessageFlags } = require('discord.js');

const { checkOnlyLetters, checkDescriptionLetters, checkOnlyNumber } = require('../../utils/util');

const WayVirtualController = require('../../controllers/wayVirtualController');

module.exports = {
    customId: 'OnCreateWayVirtualSubmit',
    async execute(interaction, args) {
        const form = interaction.fields;
        const descriptionInput = form.getTextInputValue('CardNameInput');
        const minSpendInput = form.getTextInputValue('CardBalanceInput');
        const maxSpendInput = form.getTextInputValue('CardMaxAmountInput');
        const noticeDayInput = form.getTextInputValue('CardNoticeDayInput');
        const noticeEnableInput = form.getTextInputValue('CardNoticeEnableInput');

        if (!checkDescriptionLetters(descriptionInput, 20)) {
            await interaction.reply({
                content: 'En "Descripción" solo se permiten letras, guiones, espacios, puntos y hasta 20 caracteres.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        if (!checkOnlyNumber(minSpendInput, 3)) {
            await interaction.reply({
                content: 'En "Gasto mínimo" solo se permiten números y hasta 3 digitos.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        if (!checkOnlyNumber(maxSpendInput, 3)) {
            await interaction.reply({
                content: 'En "Gasto máximo" solo se permiten números y hasta 3 digitos.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        if (!checkOnlyNumber(noticeDayInput, 2)) {
            await interaction.reply({
                content: 'En "Notificaciones por día" solo se permite números y hasta 2 digitos.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        if (!checkOnlyLetters(noticeEnableInput, 2)) {
            await interaction.reply({
                content: 'En "Permitir notificaciones" solo se permite letras: Si/No',
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        const [resultCode, card] = await WayVirtualController.create(interaction, args[0], descriptionInput, Number(minSpendInput), Number(maxSpendInput), Number(noticeDayInput), noticeEnableInput.toLowerCase() === "si");
        if (resultCode == 0){
            await interaction.editReply({
                content: `🤖​ Se ha creado una Way Virtual "${card.description}", en tu cuenta correctamente.`,
                flags: MessageFlags.Ephemeral
            });
        }
    },
};