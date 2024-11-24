const express = require('express');
const app = express();
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();


// .env dosyasından token'ı alıyoruz
const token = process.env.TELEGRAM_BOT_TOKEN;

// Telegram Bot'unuzu başlatıyoruz
const bot = new TelegramBot(token, {polling: true});

// Kullanıcıdan gelen mesajları dinliyoruz
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Gelen mesajı kontrol edip cevap veriyoruz
  if (text.toLowerCase() === 'merhaba') {
    bot.sendMessage(chatId, 'Merhaba! Yardımcı olabilir miyim?');
  } else {
    bot.sendMessage(chatId, 'Mesajınız alındı!');
  }
});



const PORT = process.env.PORT || 3000;

// Cross-Origin Isolation başlıkları ekleyin
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

// Tüm statik dosyalara Cross-Origin Isolation başlıkları ekleyin
app.use(express.static(path.join(__dirname, ".")));


// Sunucuyu başlatın
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
