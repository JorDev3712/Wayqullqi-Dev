const { MessageFlags } = require('discord.js');

// UI
const SpendModalForm = require('../ui/spendModalForm');

const SpendController = require('../../controllers/moneySpendController');

module.exports = {
    customId: 'OnCardMoneySpentClick',
    async execute(interaction, args) {
        const userDc = interaction.user;
        const [resultCode, card] = await SpendController.checkCardOne(args[0], args[1]);
        switch (resultCode) {
            case 0:
                const modal = SpendModalForm.create(card.id, card.user_id);
                await interaction.showModal(modal);
                break;
                
            case 1:
                await interaction.reply({
                    content: '❌ Ocurrió al intentar registrar un gasto',
                    flags: MessageFlags.Ephemeral
                });
                break;

            case 2:
                await interaction.reply({
                    content: 'No es posible registrar un gasto en este momento.',
                    flags: MessageFlags.Ephemeral
                });
                break;

                default:
                    break;
        }
    },
};