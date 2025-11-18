const { MessageFlags } = require('discord.js');

const AuthController = require('../../controllers/authController');

module.exports = {
    customId: 'onNoDeleteAccountClick',
    async execute(interaction) {
        const [resultCode, userEntity] = await AuthController.checkUser(interaction);
        if (resultCode == 0){
            const messages = [
                "🤖 Su cuenta se encuentra completamente activa. No se está realizando ningún proceso de eliminación.",
                "🤖 Puede estar tranquilo: su cuenta no está siendo eliminada en este momento.",
                "🤖 Confirmamos que no existe ninguna acción de borrado sobre su cuenta.",
                "🤖 Su cuenta continúa activa y operativa. No se ha iniciado ningún proceso de eliminación.",
                "🤖 Todo está en orden. Su cuenta permanece intacta y sin cambios.",
                "🤖 Su cuenta sigue disponible. No existe ningún proceso de eliminación en curso.",
                "🤖 Podemos confirmar que su cuenta no está siendo eliminada.",
                "🤖 Su cuenta permanece activa. No se está llevando a cabo ninguna eliminación.",
                "🤖 Descuida, no hay procesos activos que afecten la continuidad de su cuenta.",
                "🤖 Su cuenta está segura y no está siendo eliminada de ninguna manera."
            ];
            await interaction.reply({
                content: `${messages[Math.floor(Math.random() * messages.length)]}`,
                flags: MessageFlags.Ephemeral
            });
        }
    },
};