const { MessageFlags } = require('discord.js');

const AuthController = require('../../controllers/authController');

// ui
const embed = require('../ui/profileEmbed');

module.exports = {
    customId: 'onProfileClick',
    async execute(interaction) {
        const [resultCode, userEntity] = await AuthController.checkUser(interaction);
        if (resultCode == 0){
            await interaction.reply({
                content: `🤖 Información de la cuenta obtenida satisfactoriamente.`,
                embeds: [embed.create(interaction.client.user.displayAvatarURL(), interaction.user, userEntity)],
                flags: MessageFlags.Ephemeral
            });
        }
    },
};