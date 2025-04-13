const mineflayer = require('mineflayer');
const mc = require('minecraft-protocol');
const SERVER_HOST = 'JINGALALAHUHU_S1.aternos.me';
const SERVER_PORT = 46005;
const USERNAME = 'serverbot3270';
const PASSWORD = '123456';

function startBot() {
  const bot = mineflayer.createBot({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: USERNAME,
    version: false
  });

  bot.on('spawn', () => {
    console.log('✅ Bot spawn ho gaya!');
    setTimeout(() => {
      bot.chat(`/login ${PASSWORD}`);
    }, 5000);

    setInterval(() => {
      bot.chat('JingaGuard1 is still online 😎');
    }, 60000);
  });

  bot.on('error', (err) => {
    console.log('❌ Error:', err);
  });

  bot.on('end', () => {
    console.log('🔁 Disconnected! Reconnecting in 15 sec...');
    setTimeout(() => checkServerAndReconnect(), 15000);
  });
}

function checkServerAndReconnect() {
  mc.ping({ host: SERVER_HOST, port: SERVER_PORT }, (err, res) => {
    if (err) {
      console.log('🕒 Server offline ya start nahi hua... Wait kar rahe hain.');
      setTimeout(() => checkServerAndReconnect(), 15000);
    } else {
      console.log('🟢 Server online mil gaya! Bot connect ho raha hai...');
      startBot();
    }
  });
}

checkServerAndReconnect();
