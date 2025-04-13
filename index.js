const mineflayer = require('mineflayer');
const mc = require('minecraft-protocol');
const Vec3 = require('vec3');

const SERVER_HOST = 'JINGALALAHUHU_S1.aternos.me';
const SERVER_PORT = 46005;
const USERNAME = 'jingabot';
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
      console.log('🔐 Login command bhej diya.');
    }, 5000);

    // Chat message har minute
    setInterval(() => {
      bot.chat('😎 JingaGuard1 is still online!');
    }, 60000);

    // Random movement har 20-30 seconds me
    setInterval(() => {
      const random = Math.floor(Math.random() * 4);
      switch (random) {
        case 0: bot.setControlState('forward', true); break;
        case 1: bot.setControlState('back', true); break;
        case 2: bot.setControlState('left', true); break;
        case 3: bot.setControlState('right', true); break;
      }

      // Movement 2 sec ke baad band
      setTimeout(() => {
        bot.clearControlStates();
      }, 2000);
    }, 25000);
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

// ❗Yeh line missing thi pehle
checkServerAndReconnect();
