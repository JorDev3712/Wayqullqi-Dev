const { MessageFlags } = require('discord.js');

const AuthController = require('../../controllers/authController');

// ui
const profileMenu = require('../../components/ui/profileMenu');

module.exports = {
    customId: 'onStartButtonClick',
    async execute(interaction) {
        const [resultCode, userEntity] = await AuthController.checkOrCreateUser(interaction);
        if (resultCode == 0){
            await interaction.editReply({
                content: `Bienvenido ${userEntity.discordNickname}`,
                components: [profileMenu],
                flags: MessageFlags.Ephemeral
            });
        }
    },
};