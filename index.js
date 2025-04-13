const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'JINGALALAHUHU_S1.aternos.me',
  port: 46005,
  username: 'JingaGuard1',
  version: false
});

const PASSWORD = '123456'; // Set any password here

// Bot spawn hone ke baad
bot.on('spawn', () => {
  console.log('✅ Bot spawn ho gaya!');

  // 5 seconds ke baad register/login command bhejna
  setTimeout(() => {
    bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
    bot.chat(`/login ${PASSWORD}`);
    console.log('🔐 Register/Login command bhej diya.');
  }, 5000);

  // 1 minute mein keep-alive message bhejna
  setInterval(() => {
    bot.chat('JingaGuard1 is still online 😎');
  }, 60000);
});

// Agar bot error throw kare, toh usko handle karna
bot.on('error', err => {
  console.log('❌ Error:', err);
  // Agar ECONNRESET error aaye, reconnect karne ka try karo
  if (err.code === 'ECONNRESET') {
    console.log('🌐 Connection reset, reconnecting...');
    setTimeout(() => {
      bot.end();
    }, 5000);
  }
});

// Agar bot disconnect ho jaye, toh reconnect karne ki koshish karna
bot.on('end', () => {
  console.log('🔁 Disconnected! Reconnecting in 5 sec...');
  setTimeout(() => {
    // Bot ko automatically restart karne ke liye process.exit() call kiya
    process.exit(); // Railway app ya deploy platform ko auto restart karne ka trigger milega
  }, 5000);
});
