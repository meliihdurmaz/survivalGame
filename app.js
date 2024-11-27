const express = require('express');
const app = express();
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const helmet = require('helmet');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
// app.use((req, res, next) => {
//     res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//     res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//     res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
//     res.setHeader('Permissions-Policy', 'sharedArrayBuffer=(self)');
//     next();
//   });
  
  

app.use(
    express.static(path.join(__dirname, "."))
);


// Sunucuyu başlatın
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
