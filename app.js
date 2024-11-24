const express = require('express');
const app = express();
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const helmet = require('helmet');

require('dotenv').config();

const PORT = process.env.PORT || 3000;


// .env dosyasından token'ı alıyoruz
const token = process.env.TELEGRAM_BOT_TOKEN;

// Telegram Bot'unuzu başlatıyoruz
const bot = new TelegramBot(token, { polling: true });








// app.use(helmet());

// Helmet ile başlıkları yönetmek
// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             defaultSrc: ["'self'"],
//             scriptSrc: ["'self'", "'unsafe-inline'"],
//             frameAncestors: ["'self'", "https://survivalgame.onrender.com", "https://web.telegram.org"]
//         }
//     },
//     crossOriginEmbedderPolicy: true, // "require-corp" için Helmet
//     crossOriginOpenerPolicy: { policy: "same-origin" }, // COOP için Helmet
// }));


app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Permissions-Policy", "shared-array-buffer=(self)");
    next();
  });
  

// Tüm statik dosyalara Cross-Origin Isolation başlıkları ekleyin
// app.use(express.static(path.join(__dirname, ".")));

app.use(
    express.static(path.join(__dirname, "."))
);

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const telegramId = msg.from.id;
    const telegramUsername = msg.from.username;
    // const email = `${telegramId}@survivalgame.io`
    const buttonLogin = {
        text: "Giriş Yap",
        web_app: {
            url: `https://survivalgame.onrender.com`,
        },
    };
    const keyboard = [[buttonLogin]];
    await bot.sendMessage(
        chatId,
        "Merhaba! Aşağıdaki butona tıklayarak survival game oyununu başlayabilirsiniz.",
        {
            reply_markup: {
                inline_keyboard: keyboard,
            },
        }
    );
});

// Sunucuyu başlatın
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
