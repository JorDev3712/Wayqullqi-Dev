const { MessageFlags } = require('discord.js');

const AuthService = require('../services/authService');
const WayVirtualService = require("../services/wayVirtualService");

const viteLog = require('../utils/logger').createContext('WayVirtualController');

async function checkCards(interaction){
    viteLog.debug('checkCards() method invoked');
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

        if (checkUser.user.deleted == true){
            await interaction.editReply({
                content: '🤖​ Cuenta con un proceso activo de eliminación de cuenta.',
                flags: MessageFlags.Ephemeral
            });
            return [4, []];
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
    viteLog.debug('checkCardOne() method invoked');
    try{
        await interaction.reply({
            content: 'Obteniendo datos del servidor...',
            flags: MessageFlags.Ephemeral
        });

        const response = await WayVirtualService.getCardOne(cardId, userId);
        if (!response.card){
            viteLog.debug('Ocurrió un error al verificar los datos de la card en la cuenta {0} - Server code: {1}.', userId, response.code);
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

async function create(interaction, userId, name, minSpend, maxSpend, noticeDay, noticeEnable){
    viteLog.debug('create() method invoked');
    try{
        await interaction.reply({
            content: 'Procesando datos al servidor...',
            flags: MessageFlags.Ephemeral
        });

        const response = await WayVirtualService.postCreate({ 
            userId, 
            body: { 
                description: name,
                balance: minSpend,
                maxAmount: maxSpend,
                noticeDay,
                // To do
                noticeHour: 1,
                enable: noticeEnable
             }
        });
        if (!response.card){
            viteLog.debug('Ocurrió un error al procesar los datos con el servidor en la cuenta - Server code: {1}.', userId, response.code);
            await interaction.editReply({
                content: 'Ocurrió un error al procesar los datos con el servidor.',
                flags: MessageFlags.Ephemeral
            });
            return [2, null];
        }

        viteLog.debug('Done');
        return [0, response.card];

    } catch (error){
        console.log(error);
        await interaction.editReply({
            content: '❌ No pude procesar tu datos en este momento.',
            flags: MessageFlags.Ephemeral
        });
        return [1, null];
    }
}

async function update(interaction, cardId, userId, name, minSpend, maxSpend, noticeDay, noticeEnable){
    viteLog.debug('create() method invoked');
    try{
        await interaction.reply({
            content: 'Procesando datos al servidor...',
            flags: MessageFlags.Ephemeral
        });

        const response = await WayVirtualService.putUpdateCard({ 
            userId, 
            body: { 
                cardId,
                description: name,
                balance: minSpend,
                maxAmount: maxSpend,
                noticeDay,
                // To do
                noticeHour: 1,
                enable: noticeEnable
             }
        });
        if (!response.card){
            viteLog.debug('Ocurrió un error al procesar los datos con el servidor en la cuenta - Server code: {1}.', userId, response.code);
            await interaction.editReply({
                content: 'Ocurrió un error al procesar los datos con el servidor.',
                flags: MessageFlags.Ephemeral
            });
            return [2, null];
        }

        viteLog.debug('Done');
        return [0, response.card];

    } catch (error){
        console.log(error);
        await interaction.editReply({
            content: '❌ No pude procesar tu datos en este momento.',
            flags: MessageFlags.Ephemeral
        });
        return [1, null];
    }
}

async function updateDeleteCard(interaction, cardId){
    viteLog.debug('Invoked method updateDeleteCard()');
    try{
        const userDc = interaction.user;

        await interaction.reply({
            content: 'Solicitando petición al servidor...',
            flags: MessageFlags.Ephemeral
        });

        const response = await WayVirtualService.putUpdateDeleteCard({
            url: '/card/update_delete_card',
            body: {
                cardId,
                discordId: userDc.id
            }
        });

        if (!response.data){
            viteLog.debug('Card id {0} no se encuentra en la base de datos.', cardId);
            await interaction.editReply({
                content: '👀​ Ups, ocurrió un error al realizar la petición.',
                flags: MessageFlags.Ephemeral
            });
            return [2, false];
        }

        if (response.data.active == true){
            await interaction.editReply({
                content: '🤖​ Ya cuenta con un proceso activo de eliminación.',
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
    checkCards,
    checkCardOne,
    create,
    update,
    updateDeleteCard
};