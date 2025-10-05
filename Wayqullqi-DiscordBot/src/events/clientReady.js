module.exports = {
  name: "clientReady",
  once: true,
  execute(client) {
    client.viteLog.information("✅ Bot conectado como {0}", client.user.tag);
  },
};