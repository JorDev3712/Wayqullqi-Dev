const { MessageFlags } = require('discord.js');

const cardMenu = require('../ui/cardMenu');

const WayVirtualController = require('../../controllers/wayVirtualController');

module.exports = {
    customId: 'OnCardClick',
    async execute(interaction, args) {
        const [resultCode, card] = await WayVirtualController.checkCardOne(interaction, args[0], args[1]);
        if (resultCode == 0){
            await interaction.editReply({
                content: `🤖 Información obtenida satisfactoriamente.`,
                embeds: [cardMenu.createEmbed(card, interaction.client.user.displayAvatarURL())],
                components: [cardMenu.createButtons(card)],
                flags: MessageFlags.Ephemeral
            });
        }
    },
};