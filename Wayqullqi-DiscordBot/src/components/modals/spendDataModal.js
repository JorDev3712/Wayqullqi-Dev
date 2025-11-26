const { MessageFlags } = require('discord.js');

const { checkOnlyLetters, checkNumber, checkOnlyNumber, checkHourFormat, getDateString } = require('../../utils/util');

const SpendController = require('../../controllers/moneySpendController');

module.exports = {
    customId: 'OnSpendDataFormSubmit',
    async execute(interaction, args) {
        const form = interaction.fields;
        const description = form.getTextInputValue('SpendNameInput');
        const amount = form.getTextInputValue('SpendAmountInput');
        const monthInput = form.getTextInputValue('SpendMonthInput');
        const dayInput = form.getTextInputValue('SpendDayInput');
        const timeInput = form.getTextInputValue('SpendTimeInput');
        if (!checkOnlyLetters(description, 30)){
            await interaction.reply({
                content: 'En la descripción solo se permiten letras y hasta 30 caracteres.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        if (!checkOnlyNumber(amount, 4)){
            await interaction.reply({
                content: 'En el monto solo se permiten números y hasta 4 digitos.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        if (!checkNumber(monthInput, 2)) {
            await interaction.reply({
                content: 'En el mes solo se permiten números.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        const month = Number(monthInput);
        if (month < 1 || month > 12) {
            await interaction.reply({
                content: 'Por favor, escribe un número del mes válido.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        if (!checkNumber(dayInput, 2)){
            await interaction.reply({
                content: 'En el día solo se permiten números.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        const day = Number(dayInput);
        if (day < 1 || day > 31) {
            await interaction.reply({
                content: 'Por favor, escribe un número de día válido.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        // 
        let timeSplit = [];
        if (timeInput === "") {
            const now = new Date();
            timeSplit[0] = now.getHours().toString();
            timeSplit[1] = now.getMinutes().toString();
        } else {
            if (!checkHourFormat(timeInput, 5)) {
                await interaction.reply({
                    content: 'Por favor, ingresa una hora válida.',
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            timeSplit = timeInput.split(':');
        }
        
        const [resultCode, spend] = await SpendController.addSpendData(interaction, args[0], args[1], description, Number(amount), Number(month), Number(day), Number(timeSplit[0]), Number(timeSplit[1]));

        switch (resultCode) {
            case 0:
                const [code, card] = await SpendController.checkCardOne(spend.card_id, spend.user_id);

                await interaction.editReply({
                    content: "``` *** Detalle del Gasto ***\n" + 
                              "📝​ Descripción: " + description + "\n" +
                              "💰 Monto: " + spend.amount + "\n" +
                              "🎫 Way Virtual: " + (card?.description ?? 'unknown') + "\n" +
                              "📆 Fecha: " + getDateString('es-PE', new Date(spend.createdAt)) + "```\n" +
                              "✅ Se guardó correctamente.",
                    flags: MessageFlags.Ephemeral
                });
                break;
                
            // case 1:
            //     await interaction.reply({
            //         content: '❌ Ocurrió al intentar registrar un gasto',
            //         flags: MessageFlags.Ephemeral
            //     });
            //     break;

            // case 2:
            //     await interaction.reply({
            //         content: 'No es posible registrar un gasto en este momento.',
            //         flags: MessageFlags.Ephemeral
            //     });
            //     break;

            //     default:
            //         break;
        }

        
    },
};