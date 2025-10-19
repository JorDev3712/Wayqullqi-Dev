const { MessageFlags } = require('discord.js');

const AuthController = require('../../controllers/authController');

// ui
const profileMenu = require('../../components/ui/profileMenu');

module.exports = {
    customId: 'onStartButtonClick',
    async execute(interaction) {
        const [resultCode, userEntity] = await AuthController.checkUser(interaction);
        if (resultCode == 0){
            await interaction.editReply({
                content: `Bienvenido ${userEntity.discordUser}`,
                components: [profileMenu],
                flags: MessageFlags.Ephemeral
            });
        }
        // else {
        //     await interaction.followUp({
        //         content: '❌ No pude verificar tu cuenta en este momento.',
        //         flags: MessageFlags.Ephemeral
        //     });
        // }
    },
};