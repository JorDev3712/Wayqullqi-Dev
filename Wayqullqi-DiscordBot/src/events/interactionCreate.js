const { MessageFlags } = require('discord.js');

const viteLog = require('../utils/logger').createContext('OnInteractionCreate');

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {

    // if (!interaction.isChatInputCommand()) return;

    if (interaction.isModalSubmit()){
      let args = [];

      let modal = client.modals.get(interaction.customId);
      if (!modal) {
        if (interaction.customId.includes(':')){
          args = interaction.customId.split(':');
          modal = client.modals.get(args[0]);
          if (!modal){
            viteLog.error("Modal id={0} no encontrado. #1", args[0]);
            await interaction.reply({
              content: "❌ Hubo un error al procesar el formulario 404.",
              flags: MessageFlags.Ephemeral
            });
            return;
          }
          // Elimina el primer elemento de args
          args.splice(0, 1);
        } else {
          viteLog.error("Modal id={0} no encontrado. #2", interaction.customId);
          await interaction.reply({
            content: "❌ Hubo un error al procesar el formulario 404.",
            flags: MessageFlags.Ephemeral
          });
          return;
        }
      }

      try{
        await modal.execute(interaction, args);
      } catch(error){
        viteLog.error("Modal id={0} => {1}", interaction.customId, error);
        await interaction.reply({
          content: "❌ Hubo un error al procesar el formulario.",
          flags: MessageFlags.Ephemeral
        });
      }
    }

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
      let args = [];

      let button = client.buttons.get(interaction.customId);
      if (!button) {
        if (interaction.customId.includes(':')){
          args = interaction.customId.split(':');
          button = client.buttons.get(args[0]);
          if (!button){
            viteLog.error("Button id={0} no encontrado. #1", args[0]);
            await interaction.reply({
              content: "❌ Hubo un error ejecutando este botón 404.",
              flags: MessageFlags.Ephemeral
            });
            return;
          }
          // Elimina el primer elemento de args
          args.splice(0, 1);
        } else {
          viteLog.error("Button id={0} no encontrado. #2", interaction.customId);
          await interaction.reply({
            content: "❌ Hubo un error ejecutando este botón 404.",
            flags: MessageFlags.Ephemeral
          });
          return;
        }
      }

      try{
        await button.execute(interaction, args);
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