const { ActionRowBuilder, EmbedBuilder } = require('discord.js');

const { safeValueToString } = require('../../utils/util');

module.exports = {
    create(interaction, user, userEntity){
        return new EmbedBuilder()
                .setColor(0xf1c40f)
                .setTitle(`Perfil de la cuenta`)
                .setDescription(new Date(userEntity.createdAt).toDateString())
                .addFields(
                    { name: 'Id', value: safeValueToString(userEntity.clientId), inline: true },
                    { name: 'Usuario', value: safeValueToString(userEntity.discordUser), inline: false },
                    { name: 'Apodo', value: safeValueToString(userEntity.discordNickname), inline: false },
                    { name: 'Estado', value: userEntity.deleted ? "Proceso de eliminación." : "Activo", inline: true },
                )
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setFooter({
                    text: 'Wayqullqi Bot',
                    iconURL: interaction.client.user.displayAvatarURL(),
                })
                .setTimestamp();
    }
};