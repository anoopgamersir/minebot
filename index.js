const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'JINGALALAHUHU_S2.aternos.me', // Replace with your server IP
    port: 42580,                         // Replace with your server port
    username: 'JingaGuard',              // Replace with your bot's username
    version: '1.20.4',                   // Replace with your server's Minecraft version
  });

  bot.once('spawn', () => {
    console.log('✅ Bot has joined the server.');

    // Send /register and /login commands with a delay to ensure the server is ready
    setTimeout(() => {
      bot.chat('/register 123456');
      bot.chat('/login 123456');
    }, 3000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase() === 'hello') {
      bot.chat(`Hi ${username}! I am your bot 🤖`);
    }
  });

  bot.on('kicked', (reason) => {
    console.log('❌ Bot was kicked from the server:', reason);
  });

  bot.on('error', (err) => {
    console.log('⚠️ An error occurred:', err);
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });
}

createBot();
