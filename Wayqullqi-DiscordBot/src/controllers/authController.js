const { MessageFlags } = require('discord.js');

const AuthService = require('../services/authService');

const viteLog = require('../utils/logger').createContext('AuthController');

async function checkOrCreateUser(interaction){
    viteLog.debug('Invoked method checkOrCreateUser()');
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

            const { code, message, user } = await AuthService.createUserByDiscord(userDc.id, userDc.globalName, userDc.username);
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

async function checkUser(interaction){
    viteLog.debug('Invoked method checkUser()');
    try{
        const userDc = interaction.user;
        const { code, message, user } = await AuthService.getUserByDiscordId(userDc.id);
        if (!user){
            viteLog.debug('Usuario con id {0} no se encuentra registrado.', userDc.id);
            await interaction.reply({
                content: 'No se verificó una cuenta creada, es necesario ingresar por el comando /start.',
                flags: MessageFlags.Ephemeral
            });
            return [2, null];
        }

        return [0, user];
    } catch (error){
        await interaction.reply({
            content: '❌ No pude verificar tus datos en estos momentos.',
            flags: MessageFlags.Ephemeral
        });
        return [1, null];
    }
}

module.exports = {
    checkOrCreateUser,
    checkUser
};