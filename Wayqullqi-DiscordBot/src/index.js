const { Client, Collection, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

// Local imports
const logger = require('./utils/logger').createContext('APP');
const loaderButtons = require('./components')

// Inicializa el cliente
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Adds local logger to Client
client.viteLog = logger;

loaderButtons(client);

// Colección para comandos
client.commands = new Collection();

// Cargar comandos
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  logger.information('Command Name: {0}', command.data.name);
  client.commands.set(command.data.name, command);
}

// Cargar eventos
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// Login
client.login(process.env.DISCORD_TOKEN);
