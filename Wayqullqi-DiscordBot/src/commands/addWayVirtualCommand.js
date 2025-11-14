const { SlashCommandBuilder, MessageFlags } = require('discord.js');

// ui
const cardModal = require('../components/ui/cardModalForm');

const AuthController = require('../controllers/authController');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addwayvirtual')
    .setDescription('Añade una nueva WayVirtual a tu cuenta.'),

  async execute(interaction) {
    const [resulCode, user] = await AuthController.checkUser(interaction);
    if (resulCode == 0){
      const modal = await cardModal.create(`OnCreateWayVirtualSubmit:${user.id}`);
      await interaction.showModal(modal);
      // await interaction.reply({
      //   content: '🤖​ Por favor completa el formulario para continuar.',
      //   flags: MessageFlags.Ephemeral
      // });
    }
  },
};
