const { MessageFlags } = require('discord.js');

const AuthService = require('../services/authService');
const WayVirtualService = require("../services/wayVirtualService");
const MoneySpentService = require("../services/moneySpendService");

const viteLog = require('../utils/logger').createContext('WayVirtualController');

async function checkSpendings(interaction, cardId, userId){
    viteLog.debug('checkSpendings() method invoked');
    try{
        const userDc = interaction.user;
        await interaction.reply({
            content: 'Verificando movimientos...',
            flags: MessageFlags.Ephemeral
        });

        const checkUser = await AuthService.getUser(userId);
        if (!checkUser.user){
            viteLog.debug('Usuario con id {0} no se encuentra registrado.', userDc.id);
            await interaction.editReply({
                content: 'No se verificó una cuenta creada, es necesario ingresar por el comando /start.',
                flags: MessageFlags.Ephemeral
            });
            return [2, []];
        }

        const response = await MoneySpentService.getSpendings(cardId, userId)
        if (response.spends == null){
            viteLog.debug('Ocurrió un error al verificar los datos de la cuenta {0}.', userId);
            await interaction.editReply({
                content: 'Ocurrió un error al verificar los gatos de la cuenta.',
                flags: MessageFlags.Ephemeral
            });
            return [3, []];
        }

        viteLog.debug('Done');
        return [0, response.spends];

    } catch (error){
        console.log(error);
        await interaction.editReply({
            content: '❌ No pude verificar tus gatos en este momento.',
            flags: MessageFlags.Ephemeral
        });
        return [1, []];
    }
}

async function checkCardOne(cardId, userId){
    viteLog.debug('checkCardOne() method invoked');
    try{
        const response = await WayVirtualService.getCardOne(cardId, userId);
        if (!response.card){
            viteLog.debug('Ocurrió un error al verificar los datos de la card en la cuenta {0} - Server code: {1}.', userId, response.code);
            return [2, null];
        }

        viteLog.debug('Done');
        return [0, response.card];

    } catch (error){
        console.log(error);
        return [1, null];
    }
}

async function addSpend(interaction, cardId, userId, name, amount){
    viteLog.debug('addSpend() method invoked');
    try{
        await interaction.reply({
            content: 'Procesando datos al servidor...',
            flags: MessageFlags.Ephemeral
        });

        const response = await MoneySpentService.postCreate(cardId, userId, name, amount);
        if (!response.spend){
            viteLog.debug('Ocurrió un error al procesar los datos con el servidor en la cuenta - Server code: {1}.', userId, response.code);
            await interaction.editReply({
                content: 'Ocurrió un error al procesar los datos con el servidor.',
                flags: MessageFlags.Ephemeral
            });
            return [2, null];
        }

        viteLog.debug('Done');
        return [0, response.spend];

    } catch (error){
        console.log(error);
        await interaction.editReply({
            content: '❌ No pude procesar tu datos en este momento.',
            flags: MessageFlags.Ephemeral
        });
        return [1, null];
    }
}

module.exports = {
    checkSpendings,
    checkCardOne,
    addSpend,
};