const { MessageFlags } = require('discord.js');

// ui
const cardModal = require('../ui/cardModalForm');

const SpendController = require('../../controllers/moneySpendController');

module.exports = {
    customId: 'OnCardConfigClick',
    async execute(interaction, args) {
        const [resultCode, card] = await SpendController.checkCardOne(args[0], args[1]);
        switch (resultCode) {
            case 0:
                const modal = cardModal.create(`OnUpdateWayVirtualSubmit:${card.id}:${card.user_id}`, '🎫 Configurar Way Virtual', card);
                await interaction.showModal(modal);
                break;
                
            case 1:
                await interaction.reply({
                    content: '❌ Ocurrió al configurar su Way Virtual.',
                    flags: MessageFlags.Ephemeral
                });
                break;

            case 2:
                await interaction.reply({
                    content: 'No es posible configurar su Way Virtual este momento.',
                    flags: MessageFlags.Ephemeral
                });
                break;

                default:
                    break;
        }
    },
};