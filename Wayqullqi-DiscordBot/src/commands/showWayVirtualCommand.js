const { SlashCommandBuilder, MessageFlags } = require('discord.js');

const virtualMenu = require('../components/ui/wayVirtualMenu');

const WayVirtualController = require('../controllers/wayVirtualController');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wayvirtuals')
    .setDescription('Mostrar Way Virtuals de su cuenta.'),

  async execute(interaction) {
    const [resultCode, cards] = await WayVirtualController.checkCards(interaction);

    if (resultCode == 0) {
      const builder = virtualMenu.create(cards);

      await interaction.editReply({
        content: `🤖 Actualmente estas son las WayVirtuals de tu cuenta.`,
        components: [builder],
        flags: MessageFlags.Ephemeral
      });
    }
  },
};
