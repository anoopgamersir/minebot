const mineflayer = require('mineflayer');
const autoAuth = require('mineflayer-auto-auth');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'JINGALALAHUHU_S1.aternos.me', // Replace with your server IP
    port: 46005,                         // Replace with your server port
    username: 'JingaGuard',             // Bot name
    version: '1.20.4',                  // Your Minecraft version
  });

  bot.loadPlugin(autoAuth.plugin);

  bot.once('inject_allowed', () => {
    bot.autoAuth = {
      password: '123456', // Login password if using /login plugin
      logging: true
    };
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message === 'hello') {
      bot.chat(`Hi ${username}! I am your bot 🤖`);
    }
  });

  bot.on('error', (err) => {
    console.log('⚠️ Error:', err);
    bot.end();
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 10s...');
    setTimeout(createBot, 10000);
  });
}

createBot();
