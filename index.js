const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'JINGALALAHUHU_S1.aternos.me', // IP without spaces
  port: 46005,
  username: 'JingaGuard1', // Bot username
  version: false           // Auto detect Minecraft version
});

const PASSWORD = '123456'; // Set any password here

bot.on('spawn', () => {
  console.log('✅ Bot spawn ho gaya!');

  // Send register/login after few seconds
  setTimeout(() => {
    bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
    bot.chat(`/login ${PASSWORD}`);
    console.log('🔐 Register/Login command bhej diya.');
  }, 5000);

  // Keep alive message every 1 min
  setInterval(() => {
    bot.chat('JingaGuard1 is still online 😎');
  }, 60000);
});

bot.on('error', err => {
  console.log('❌ Error:', err);
});

bot.on('end', () => {
  console.log('🔁 Disconnected! Reconnecting in 5 sec...');
  setTimeout(() => {
    process.exit(); // Railway auto restarts the bot
  }, 5000);
});
