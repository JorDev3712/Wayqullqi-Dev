const { MessageFlags } = require('discord.js');

const AuthController = require('../../controllers/authController');

const askMenu = require('../ui/askButtons');

module.exports = {
    customId: 'onDeleteAccountButtonClick',
    async execute(interaction) {
        const [resultCode, userEntity] = await AuthController.checkUser(interaction);
        if (resultCode == 0){
            await interaction.reply({
                content: `🤖 ¿Estás seguro de continuar con la eliminación de tu cuenta?.`,
                components: [askMenu.create('onYesDeleteAccountClick', 'onNoDeleteAccountClick', userEntity.id)],
                flags: MessageFlags.Ephemeral
            });
        }
    },
};