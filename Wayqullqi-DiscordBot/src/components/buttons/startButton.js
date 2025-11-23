const { MessageFlags } = require('discord.js');

const AuthController = require('../../controllers/authController');

// ui
const profileMenu = require('../../components/ui/profileMenu');

module.exports = {
    customId: 'onStartButtonClick',
    async execute(interaction) {
        const [resultCode, userEntity] = await AuthController.checkOrCreateUser(interaction);
        if (resultCode == 0){
            let welcome = userEntity.deleted == true ? `🔔🤖​ ${userEntity.discordNickname}, tienes una eliminación pendiente. Puedes cancelarla si fue un error.` : `👋 Bienvenido ${userEntity.discordNickname}`;

            await interaction.editReply({
                content: welcome,
                components: [profileMenu.create(userEntity.deleted)],
                flags: MessageFlags.Ephemeral
            });
        }
    },
};