const { MessageFlags } = require('discord.js');

const viteLog = require('../utils/logger').createContext('OnInteractionCreate');

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {

    // if (!interaction.isChatInputCommand()) return;

    if (interaction.isCommand()){
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        viteLog.error("Command id={0} no encontrado", interaction.commandName,);
        await interaction.reply({
          content: "❌ Hubo un error ejecutando este botón 404.",
          flags: MessageFlags.Ephemeral
        });
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        viteLog.error("Command id={0} => {1}", interaction.commandName, error);
        await interaction.reply({
          content: "❌ Hubo un error ejecutando este comando.",
          flags: MessageFlags.Ephemeral
        });
      }
      return;
    }

    if (interaction.isButton()){
      const button = client.buttons.get(interaction.customId);
      if (!button) {
        viteLog.error("Button id={0} no encontrado.", interaction.customId);
        await interaction.reply({
          content: "❌ Hubo un error ejecutando este botón 404.",
          flags: MessageFlags.Ephemeral
        });
        return;
      }

      try{
        await button.execute(interaction);
      } catch(error){
        viteLog.error("Button id={0} => {1}", interaction.customId, error);
        await interaction.reply({
          content: "❌ Hubo un error ejecutando este botón.",
          flags: MessageFlags.Ephemeral
        });
      }
    }
  },
};