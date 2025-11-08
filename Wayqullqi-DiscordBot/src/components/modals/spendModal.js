const { MessageFlags } = require('discord.js');

const { checkOnlyLetters, checkOnlyNumber } = require('../../utils/util');

const SpendController = require('../../controllers/moneySpendController');

module.exports = {
    customId: 'OnSpendFormSubmit',
    async execute(interaction, args) {
        const form = interaction.fields;
        const description = form.getTextInputValue('SpendNameInput');
        const amount = form.getTextInputValue('SpendAmountInput');
        if (!checkOnlyLetters(description, 21)){
            await interaction.reply({
                content: 'En la descripción solo se permiten letras y hasta 21 caracteres.',
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

        const [resultCode, spend] = await SpendController.addSpend(interaction, args[0], args[1], description, Number(amount));

        switch (resultCode) {
            case 0:
                await interaction.editReply({
                    content: `✅ Se ha registrado el gasto correctamente.\n💰 Monto: ${spend.amount}`,
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