const WayVirtualController = require('../../controllers/wayVirtualController');

module.exports = {
    customId: 'OnYesDeleteCardClick',
    async execute(interaction, args) {
        const [resultCode, result] = await WayVirtualController.updateDeleteCard(interaction, args[0]);
        if (resultCode == 0){
            await interaction.editReply({
                content: '🤖​ Se inicio el proceso de eliminación de su Virtual Card, los datos serán borrados en 5 días.\n☑️​ En caso de cancelar el proceso, puede realizarlo en el plazo indicado anteriormente.\n😊​ Gracias por haber confiado en nosotros.'
            });
        }
    },
};