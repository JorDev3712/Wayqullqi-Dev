const AuthController = require('../../controllers/authController');

module.exports = {
    customId: 'onYesDeleteAccountClick',
    async execute(interaction) {
        const [resultCode, result] = await AuthController.updateDeleteAccount(interaction);
        if (result === true){
            await interaction.editReply({
                content: '🤖​ Se inicio el proceso de eliminación de usuario, los datos de su cuenta serán borrados en 5 días.\n☑️​ En caso de cancelar el proceso, puede realizarlo en el plazo indicado anteriormente.\n😊​ Gracias por haber utilizado nuestro servicio.'
            });
        }
    },
};