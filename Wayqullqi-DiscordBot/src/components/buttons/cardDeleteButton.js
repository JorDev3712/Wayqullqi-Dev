const { MessageFlags } = require('discord.js');

const WayVirtualController = require('../../controllers/wayVirtualController');

const askMenu = require('../ui/askButtons');

module.exports = {
    customId: 'OnCardDeleteClick',
    async execute(interaction, args) {
        // arg[0] : card.id, arg[1]: card.user_id
        const [resultCode, cardEntity] = await WayVirtualController.checkCardOne(interaction, args[0], args[1]);
        if (resultCode == 0){
            await interaction.editReply({
                content: `🤖 ¿Estás seguro de continuar con la eliminación de tu Virtual Card: ${cardEntity.description}`,
                components: [askMenu.create('OnYesDeleteCardClick', 'OnNoDeleteCardClick', cardEntity.id)],
                flags: MessageFlags.Ephemeral
            });
        }
    },
};