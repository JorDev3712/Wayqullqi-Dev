const dailyModal = require('../ui/dashboardDailyModal');

module.exports = {
    customId: 'OnCardDashboardDailyClick',
    async execute(interaction, args) {
        const date = new Date();
        const builder = dailyModal.create(args[0], args[1], date.getFullYear(), date.getMonth() + 1, date.getDate());
        await interaction.showModal(builder);
    },
};