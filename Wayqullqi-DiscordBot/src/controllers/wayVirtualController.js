const { MessageFlags } = require('discord.js');

const AuthService = require('../services/authService');
const WayVirtualService = require("../services/wayVirtualService");

const viteLog = require('../utils/logger').createContext('WayVirtualController');

async function checkCards(interaction){
    viteLog.debug('Invoked method checkCards()');
    try{
        const userDc = interaction.user;
        await interaction.reply({
            content: 'Verificando cards virtuals...',
            flags: MessageFlags.Ephemeral
        });

        const checkUser = await AuthService.getUserByDiscordId(userDc.id);
        if (!checkUser.user){
            viteLog.debug('Usuario con id {0} no se encuentra registrado.', userDc.id);
            await interaction.editReply({
                content: 'No se verificó una cuenta creada, es necesario ingresar por el comando /start.',
                flags: MessageFlags.Ephemeral
            });
            return [2, []];
        }

        const response = await WayVirtualService.getCards(checkUser.user.id);
        if (response.cards == null){
            viteLog.debug('Ocurrió un error al verificar los datos de la cuenta {0}.', userDc.id);
            await interaction.editReply({
                content: 'Ocurrió un error al verificar los datos de la cuenta.',
                flags: MessageFlags.Ephemeral
            });
            return [3, []];
        }

        viteLog.debug('Done');
        return [0, response.cards];

    } catch (error){
        console.log(error);
        await interaction.editReply({
            content: '❌ No pude verificar tus way virtual en este momento.',
            flags: MessageFlags.Ephemeral
        });
        return [1, []];
    }
}

async function checkCardOne(interaction, cardId, userId){
    viteLog.debug('Invoked method checkCardOne()');
    try{
        await interaction.reply({
            content: 'Obteniendo datos del servidor...',
            flags: MessageFlags.Ephemeral
        });

        const response = await WayVirtualService.getCardOne(cardId, userId);
        if (!response.card){
            viteLog.debug('Ocurrió un error al verificar los datos de la card en la cuenta {0}.', userId);
            await interaction.editReply({
                content: 'Ocurrió un error obtener los datos de tu Virtual Card.',
                flags: MessageFlags.Ephemeral
            });
            return [2, null];
        }

        viteLog.debug('Done');
        return [0, response.card];

    } catch (error){
        console.log(error);
        await interaction.editReply({
            content: '❌ No pude verificar tu Virtual Card en este momento.',
            flags: MessageFlags.Ephemeral
        });
        return [1, null];
    }
}

module.exports = {
    checkCards,
    checkCardOne,
};