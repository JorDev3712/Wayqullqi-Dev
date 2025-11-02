const { MessageFlags, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const WayVirtualController = require('../../controllers/wayVirtualController');

module.exports = {
    customId: 'OnCardClick',
    async execute(interaction, args) {
        const user = interaction.user;
        const [resultCode, card] = await WayVirtualController.checkCardOne(interaction, args[0], args[1]);
        if (resultCode == 0){
            const cardIds = `${args[0]}:${args[1]}`;
            const builder = new ActionRowBuilder();
            builder.addComponents(
                new ButtonBuilder()
                    .setCustomId(`OnCardConfigClick:${cardIds}`)
                    .setLabel('⚙️ Configurar')
                    // .setEmoji('⚙️')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`OnCardDashboardClick:${cardIds}`)
                    .setLabel('💰 Movimientos')
                    // .setEmoji('💰​')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId(`OnCardDeleteClick:${cardIds}`)
                    .setLabel("❌ Eliminar")
                    // .setEmoji('❌')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId(`OnCardMoneySpentClick:${cardIds}`)
                    .setLabel('➕ Agregar gasto')
                    // .setEmoji('➕​​')
                    .setStyle(ButtonStyle.Secondary),
            );

            await interaction.editReply({
                content: 'Cargando datos del servidor...',
                flags: MessageFlags.Ephemeral
            });

            // const builder2 = new ActionRowBuilder();
            // builder2.addComponents(
            //     new ButtonBuilder()
            //         .setCustomId(`OnCardMoneySpentClick:${cardIds}`)
            //         .setLabel('Agregar gasto')
            //         .setEmoji('➕​​')
            //         .setStyle(ButtonStyle.Success)
            //     ,
            //     new ButtonBuilder()
            //         .setCustomId(`OnCardDashboardClick:${cardIds}`)
            //         .setLabel('Movimientos')
            //         .setEmoji('💰​')
            //         .setStyle(ButtonStyle.Primary)
            //     ,
            //     new ButtonBuilder()
            //         .setCustomId(`OnCardDeleteClick:${cardIds}`)
            //         .setLabel("Eliminar")
            //         .setEmoji('❌')
            //         .setStyle(ButtonStyle.Danger)
            // );

            const embed = new EmbedBuilder()
                .setColor(0xf1c40f)
                .setTitle(`Card: ${card.description}`)
                .setDescription('Detalle de su Virtual Card')
                .addFields(
                    { name: 'Límite Gasto', value: String(card.balance), inline: true },
                    { name: 'Máximo Gasto', value: String(card.max_amount), inline: true },
                    { name: 'Notificaciones por día', value: String(card.notice_day), inline: true },
                    { name: 'Notificaciones por hora', value: String(card.notice_hour), inline: true },
                    { name: 'Permitir envio de notificación', value: String(card.enable_notice), inline: true },
                    // {
                    //   name: '📅 Fecha de creación',
                    //   value: `<t:${Math.floor(card.createdAt / 1000)}:F>`,
                    //   inline: false
                    // }
                )
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setFooter({
                    text: 'Wayqullqi Bot',
                    iconURL: interaction.client.user.displayAvatarURL(),
                })
                .setTimestamp();

            await interaction.editReply({
                content: `🤖 Información obtenida satisfactoriamente.`,
                embeds: [embed],
                components: [builder],
                flags: MessageFlags.Ephemeral
            });
        }
    },
};