const AuthService = require('../services/authService');
const { MessageFlags } = require('discord.js');

async function checkUser(interaction){
    console.log('[AuthController] Invoked method checkUser()');
    try{
        const userDc = interaction.user;
        // username, globalName, avatar, id, banner, accentColor

        const { code, message, user } = await AuthService.getUserByDiscordId(userDc.id);
        if (!user){
            await interaction.reply({
                content: 'Iniciando la creación de cuenta y perfil...',
                flags: MessageFlags.Ephemeral
            });

            const { code, message, user } = await AuthService.createUserByDiscord(userDc.id, userDc.username);
            if (code != 200){
                await interaction.reply({
                    content: 'Ocurrió un error al crear la cuenta...',
                    flags: MessageFlags.Ephemeral
                });
                return 2;
            }

            await interaction.reply({
                content: 'La cuenta y perfil fueron creados.',
                flags: MessageFlags.Ephemeral
            });
        }

        return 0;
    } catch (error){
        console.log(error);
        await interaction.reply({
            content: '❌ No pude verificar tu cuenta en este momento.',
            flags: MessageFlags.Ephemeral
        });
        return 1;
    }
}

module.exports = {
    checkUser,
};