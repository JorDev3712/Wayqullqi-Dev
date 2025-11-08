const { MessageFlags } = require('discord.js');

const options = require('../ui/dashboardOptions');

module.exports = {
    customId: 'OnCardDashboardClick',
    async execute(interaction, args) {
        const builder = options.create(args[0], args[1]);
        await interaction.reply({
            content: '🤖 Por favor, selecciona uno de estas opciones para mostrar tus movimientos.',
            components: [builder],
            flags: MessageFlags.Ephemeral
        });
    },
};