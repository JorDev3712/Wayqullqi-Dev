const { 
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle 
} = require('discord.js');

module.exports = {
  create(tag1, tag2, id){
        return new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId(`${tag1}:${id}`)
            .setLabel('✔️​​ SI')
            .setStyle(ButtonStyle.Danger),
          new ButtonBuilder()
            .setCustomId(`${tag2}:${id}`)
            .setLabel('❌​ NO')
            .setStyle(ButtonStyle.Primary),
    );
  }
}