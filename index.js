const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const autoAuth = require('mineflayer-auto-auth');

function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.MC_HOST || 'JINGALALAHUHU_S1.aternos.me',
    port: parseInt(process.env.MC_PORT) || 46005,
    username: process.env.BOT_USERNAME || 'JingaGuard',
    version: false,
    auth: 'offline',
    hideErrors: false,
  });

  bot.loadPlugin(pathfinder);
  bot.loadPlugin(autoAuth);

  bot.once('spawn', () => {
    console.log('✅ Bot spawn ho gaya!');
  });

  bot.on('kicked', (reason) => {
    console.log('🚫 Kicked:', reason);
  });

  bot.on('error', (err) => {
    console.log('❌ Bot Error:', err);
  });

  bot.on('end', () => {
    console.log('🔁 Disconnected! Reconnecting in 5 sec...');
    setTimeout(createBot, 5000);
  });

  bot.on('messagestr', (message) => {
    console.log('📩 Server Message:', message);
  });
}

createBot();
