const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.MC_HOST || 'JINGALALAHUHU_S1.aternos.me',
    port: parseInt(process.env.MC_PORT) || 46005,
    username: process.env.BOT_USERNAME || 'JingaGuard',
    auth: 'offline',
  });

  bot.once('spawn', () => {
    console.log('✅ Bot joined the server.');

    // Agar server pe /register ya /login chahiye ho
    bot.chat('/register 123456');
    setTimeout(() => {
      bot.chat('/login 123456');
    }, 3000);
  });

  bot.on('kicked', (reason) => {
    console.log('❌ Kicked:', reason);
  });

  bot.on('error', (err) => {
    console.log('⚠️ Error:', err);
  });

  bot.on('end', () => {
    console.log('🔁 Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });
}

createBot();
