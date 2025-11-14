const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

module.exports = {
    create(cards) {
      let buttons = [];
      const builder = new ActionRowBuilder();
      for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        buttons.push(
          new ButtonBuilder()
          .setCustomId(`OnCardClick:${card.id}:${card.user_id}`)
          .setLabel(`${card.description} #${i + 1} 🎫`)
          // .setEmoji('​🎫')
          .setStyle(ButtonStyle.Secondary)
        );
      }
      builder.addComponents(buttons);
      return builder;
    }
};