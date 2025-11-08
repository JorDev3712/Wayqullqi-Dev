const { MessageFlags, EmbedBuilder } = require('discord.js');

const { safeValueToString, buildTable, checkNumber, createDateString } = require('../../utils/util');

const SpendController = require('../../controllers/moneySpendController');

module.exports = {
    customId: 'OnDashboardDailySubmit',
    async execute(interaction, args) {
        const form = interaction.fields;
        const yearInput = form.getTextInputValue('DashboardYearInput');
        const monthInput = form.getTextInputValue('DashboardMonthInput');
        const dayInput = form.getTextInputValue('DashboardDayInput');

        if (!checkNumber(yearInput, 4)){
            await interaction.reply({
                content: 'En el año solo se permiten números.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        const year = Number(yearInput);
        if (year < 2025) {
            await interaction.reply({
                content: 'No se encuentran registros antes del 2025.',
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
                content: 'En el día solo se permiten números.',
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        if (!checkNumber(dayInput, 2)){
            await interaction.reply({
                content: 'En el monto solo se permiten números y hasta 4 digitos.',
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

        const [resulCode, spends] = await SpendController.checkDailySpendings(interaction, args[0], args[1], year, month, day);
        if (resulCode == 0){
            if (spends.length < 1){
                await interaction.editReply({
                    content: `🤖 No se encontró movimientos registrados del ${createDateString('es-PE', year, month, day)}`,
                    flags: MessageFlags.Ephemeral
                });
                return;
            }
            // .setDescription('📊 ')

            const embed = new EmbedBuilder()
                .setColor(0xf1c40f)
                .setTitle('Resumen diario')

            let total = 0;
            for (const spend of spends) {
                total = total + Number(spend.amount);
            }

            embed.setDescription(buildTable(['Descripción', 'Monto'], spends.map(x => [x.name, Number(x.amount)])));

            embed.setFooter({
                text: `Total de Gasto: S/${total}`,
                iconURL: interaction.client.user.displayAvatarURL(),
            });

            await interaction.editReply({
                content: `🤖 Estos son tus movimientos del ${createDateString('es-PE', year, month, day)}`,
                embeds: [embed],
                flags: MessageFlags.Ephemeral
            });
        }
    },
};