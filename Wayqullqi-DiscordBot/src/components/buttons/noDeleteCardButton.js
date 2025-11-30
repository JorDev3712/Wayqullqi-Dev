const { MessageFlags } = require('discord.js');

const AuthController = require('../../controllers/authController');

module.exports = {
    customId: 'OnNoDeleteCardClick',
    async execute(interaction) {
        const [resultCode, userEntity] = await AuthController.checkUser(interaction);
        if (resultCode == 0){
            const messages = [
                "🤖 Puede estar tranquilo, todo en orden. Gracias por tu confianza.",
                "🤖 Su Virtual Card continúa activa y operativa. No se ha iniciado ningún proceso de eliminación.",
                "🤖 Todo está en orden. Su Virtual Card permanece intacta y sin cambios.",
                "🤖 Su Virtual Card sigue disponible. No existe ningún proceso de eliminación en curso.",
                "🤖 Descuida, no se inició un proceso de eliminación."
            ];
            await interaction.reply({
                content: `${messages[Math.floor(Math.random() * messages.length)]}`,
                flags: MessageFlags.Ephemeral
            });
        }
    },
};