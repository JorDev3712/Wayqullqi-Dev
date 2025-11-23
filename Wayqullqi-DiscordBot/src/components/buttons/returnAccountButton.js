const AuthController = require('../../controllers/authController');

module.exports = {
    customId: 'OnReturnAccountButtonClick',
    async execute(interaction) {
        const [resultCode, result] = await AuthController.updateReturnAccount(interaction);
        if (result === true){
            await interaction.editReply({
                content: '🤖​ Ha quedado desactivado "el proceso de eliminación de usuario".\n​⭐​ Gracias por volver a utilizar nuestro servicio.'
            });
        }
    },
};