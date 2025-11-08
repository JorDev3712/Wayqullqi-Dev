const weeklyModal = require('../ui/dashboardWeeklyModal');

module.exports = {
    customId: 'OnCardDashboardWeeklyClick',
    async execute(interaction, args) {
        const date = new Date();
        const builder = weeklyModal.create(args[0], args[1], date.getFullYear(), date.getMonth() + 1);
        await interaction.showModal(builder);
    },
}; 