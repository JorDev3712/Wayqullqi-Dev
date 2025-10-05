const { MessageFlags } = require('discord.js');

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {

    // if (!interaction.isChatInputCommand()) return;

    if (interaction.isCommand()){
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        client.viteLog.error("[OnInteractionCreate] Command id={0} => {1}", interaction.customId, error);
        await interaction.reply({
          content: "❌ Hubo un error ejecutando este comando.",
          flags: MessageFlags.Ephemeral
        });
      }
    }

    if (interaction.isButton()){
      const button = client.buttons.get(interaction.customId);
      if (!button) {
        client.viteLog.error("[OnInteractionCreate] Button id={0} no encontrado.", interaction.customId);
        await interaction.reply({
          content: "❌ Hubo un error ejecutando este botón 404.",
          flags: MessageFlags.Ephemeral
        });
        return;
      }

      try{
        await button.execute(interaction, client);
      } catch(error){
        client.viteLog.error("[OnInteractionCreate] Button id={0} => {1}", interaction.customId, error);
        await interaction.reply({
          content: "❌ Hubo un error ejecutando este botón.",
          flags: MessageFlags.Ephemeral
        });
      }
    }
  },
};