const AuthService = require('../services/authService');
const { MessageFlags } = require('discord.js');

const viteLog = require('../utils/logger').createContext('AuthController');

async function checkUser(interaction){
    viteLog.debug('Invoked method checkUser()');
    try{
        const userDc = interaction.user;
        // username, globalName, avatar, id, banner, accentColor

        await interaction.reply({
            content: 'Verificando si existe una cuenta...',
            flags: MessageFlags.Ephemeral
        });

        const { code, message, user } = await AuthService.getUserByDiscordId(userDc.id);
        if (!user){
            await interaction.editReply({
                content: 'Iniciando la creación de cuenta y perfil...',
                flags: MessageFlags.Ephemeral
            });

            const { code, message, user } = await AuthService.createUserByDiscord(userDc.id, userDc.username);
            if (code != 200){
                await interaction.editReply({
                    content: 'Ocurrió un error al crear la cuenta...',
                    flags: MessageFlags.Ephemeral
                });
                return [2, null];
            }

            await interaction.editReply({
                content: 'La cuenta y perfil fueron creados.',
                flags: MessageFlags.Ephemeral
            });
        }

        return [0, user];
    } catch (error){
        await interaction.editReply({
            content: '❌ No pude verificar tu cuenta en este momento.',
            flags: MessageFlags.Ephemeral
        });
        return [1, null];
    }
}

module.exports = {
    checkUser,
};