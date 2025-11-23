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

        if (user.deleted == true){
            await interaction.reply({
                content: '🤖​ Cuenta con un proceso activo de eliminación de cuenta.',
                flags: MessageFlags.Ephemeral
            });
            return [3, null];
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

async function updateDeleteAccount(interaction){
    viteLog.debug('Invoked method updateDeleteAccount()');
    try{
        const userDc = interaction.user;

        await interaction.reply({
            content: 'Iniciando proceso de eliminación de cuenta...',
            flags: MessageFlags.Ephemeral
        });

        const response = await AuthService.putDeleteAccount({
            body: {
                discordId: userDc.id 
            }
        });

        if (!response.data){
            viteLog.debug('Usuario con id {0} no se encuentra registrado.', userDc.id);
            await interaction.editReply({
                content: '👀​ Ups, es necesario tener una cuenta para eliminarla.',
                flags: MessageFlags.Ephemeral
            });
            return [2, false];
        }

        if (response.data.active == true){
            await interaction.editReply({
                content: '🤖​ Ya cuenta con un proceso activo de eliminación de cuenta.',
                flags: MessageFlags.Ephemeral
            });
            return [3, false];
        }

        if (response.data.result == false){
            await interaction.editReply({
                content: '🤖​ Ups, hubo un error al realizar la petición al servidor. Por favor vuelve a intentar en otro momento.',
                flags: MessageFlags.Ephemeral
            });
            return [4, response.data.result];
        }

        return [0, response.data.result];
    } catch (error){
        await interaction.editReply({
            content: '❌ No tuve respuesta del servidor...Por favor vuelve a intentar en otro momento.',
            flags: MessageFlags.Ephemeral
        });
        return [1, false];
    }
}

module.exports = {
    checkOrCreateUser,
    checkUser,
    updateDeleteAccount
};