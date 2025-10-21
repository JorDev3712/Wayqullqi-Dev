const { MessageFlags, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const WayVirtualController = require('../../controllers/wayVirtualController');

module.exports = {
    customId: 'onWayVirtualShowButtonClick',
    async execute(interaction) {
        let buttons = [];
        const [resultCode, cards] = await WayVirtualController.checkCards(interaction);

        if (resultCode == 0){
          const builder = new ActionRowBuilder();
          for (let i = 0; i < cards.length; i++){
            let card = cards[i];
            buttons.push(
              new ButtonBuilder()
                .setCustomId(`OnCardClick:${card.id}:${card.user_id}`)
                .setLabel(`${card.description} #${i + 1} 💳`)
                .setStyle(ButtonStyle.Secondary)
            );
          }
          builder.addComponents(buttons);

          await interaction.editReply({
            content: `🤖 Actualmente estas son las WayVirtuals de tu cuenta.`,
            components: [builder],
            flags: MessageFlags.Ephemeral
          });
        }
  },
};