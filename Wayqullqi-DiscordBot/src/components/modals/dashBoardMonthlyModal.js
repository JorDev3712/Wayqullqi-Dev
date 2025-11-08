const { MessageFlags, EmbedBuilder } = require('discord.js');

const { buildTable, checkNumber, getMonthDateString } = require('../../utils/util');

const SpendController = require('../../controllers/moneySpendController');

module.exports = {
    customId: 'OnDashboardMonthlySubmit',
    async execute(interaction, args) {
        const form = interaction.fields;
        const yearInput = form.getTextInputValue('DashboardYearInput');
        const monthInput = form.getTextInputValue('DashboardMonthInput');

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

        const [resulCode, spends] = await SpendController.checkMonthlySpendings(interaction, args[0], args[1], year, month);
        if (resulCode == 0){
            if (spends.length < 1){
                await interaction.editReply({
                    content: `🤖 No hay movimientos registrados en ${getMonthDateString('es-PE', year, month, 1)}.`,
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            const embed = new EmbedBuilder()
                .setColor(0xf1c40f)
                .setTitle('🗓️​ Detalle Mensual')

            let total = 0;
            for (const spend of spends) {
                total = total + Number(spend.amount);
            }

            embed.setDescription(buildTable(['Descripción', 'Monto', 'Fecha'], spends.map(x => [x.name, Number(x.amount), new Date(x.createdAt).toDateString()])));

            embed.setFooter({
                text: `Total Gastado: S/${total}`,
                iconURL: interaction.client.user.displayAvatarURL(),
            });

            await interaction.editReply({
                content: `🤖 Estos fueron tus movimientos en ${getMonthDateString('es-PE', year, month, 1)}.`,
                embeds: [embed],
                flags: MessageFlags.Ephemeral
            });
        }
    },
};