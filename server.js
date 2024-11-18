const express = require('express');
const path = require('path');
// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '.')));

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    // res.setHeader('X-Frame-Options', 'ALLOW-FROM https://t.me/SurvialGameExportBot/SurvivalGame');

    next();
});



app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://t.me/SurvialGameExportBot/SurvivalGame");
    next();
});



app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '.', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
