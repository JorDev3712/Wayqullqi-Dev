const monthlyModal = require('../ui/dashboardMonthlyModal');

module.exports = {
    customId: 'OnCardDashboardMonthClick',
    async execute(interaction, args) {
        const date = new Date();
        const builder = monthlyModal.create(args[0], args[1], date.getFullYear(), date.getMonth() + 1);
        await interaction.showModal(builder);
    },
}; 