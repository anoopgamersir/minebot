const mineflayer = require('mineflayer');
const autoAuth = require('mineflayer-auto-auth');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'JINGALALAHUHU_S1.aternos.me', // 🔁 Replace with your server IP
    port: 46005,                         // 🔁 Replace with your server port
    username: 'JingaGuard',             // 🔁 Replace with your bot name
    version: '1.20.4',                  // 🔁 Replace with your Minecraft version
  });

  // Auto login plugin
  bot.loadPlugin(autoAuth.plugin);

  // Auto login config
  bot.once('inject_allowed', () => {
    bot.autoAuth = {
      password: '123456', // 🔁 Your login password (if using login plugin)
      logging: true,
    };
  });

  // Chat events
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message === 'hello') {
      bot.chat(`Hi ${username}! I am online 24/7 🤖`);
    }
  });

  // Logging and reconnect logic
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
