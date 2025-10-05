const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Display the main menu'),

  async execute(interaction) {
    const row1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('onProfileButtonClick')
        .setLabel('📂 Mi perfil')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('onSetupProfileButtonClick')
        .setLabel('⚙️ Configurar gestión de gastos')
        .setStyle(ButtonStyle.Secondary)
    );

    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('onAddMoneySpentButtonClick')
        .setLabel('➕ Agregar un gasto')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('onDeleteMoneySpentButtonClick')
        .setLabel('🗑️ Eliminar un gasto')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('onUpdateSpentButtonClick')
        .setLabel('✏️ Actualizar un gasto')
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      content: '📊 **Helper**',
      components: [row1, row2],
      flags: MessageFlags.Ephemeral
    });
  },
};
