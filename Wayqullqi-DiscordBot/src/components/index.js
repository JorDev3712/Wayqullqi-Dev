const fs = require('fs');
const path = require('path');

// Loads and Creates action for the buttons
module.exports = (client) => {
  client.buttons = new Map();

  const buttonsPath = path.join(__dirname, 'buttons');
  const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

  for (const file of buttonFiles) {
    const button = require(path.join(buttonsPath, file));
    client.buttons.set(button.customId, button);
  }
};