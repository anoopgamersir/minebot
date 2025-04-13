const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { Vec3 } = require('vec3');

// Bot ke login details
const bot = mineflayer.createBot({
  host: 'JINGALALAHUHU_S1.aternos.me', // Server IP
  port: 46005,                        // Server Port
  username: 'JingaGuard1',            // Bot Username
  version: false                      // Auto detect Minecraft version
});

const PASSWORD = '123456'; // Set any password here

bot.loadPlugin(pathfinder);

bot.on('spawn', () => {
  console.log('✅ Bot spawn ho gaya!');

  // Register/Login commands
  setTimeout(() => {
    bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
    bot.chat(`/login ${PASSWORD}`);
    console.log('🔐 Register/Login command bhej diya.');
  }, 5000);

  // Set up movement plugin
  const defaultMove = new Movements(bot);

  // Random movement to avoid AFK kick
  setInterval(() => {
    const randomX = Math.floor(Math.random() * 5) - 2;
    const randomZ = Math.floor(Math.random() * 5) - 2;
    const pos = bot.entity.position.offset(randomX, 0, randomZ);

    bot.pathfinder.setMovements(defaultMove);
    bot.pathfinder.setGoal(new goals.GoalBlock(pos.x, pos.y, pos.z));
  }, 10000); // Every 10 seconds

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
