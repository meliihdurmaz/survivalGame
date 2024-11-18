const express = require('express');
const path = require('path');
// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '.')));

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('X-Frame-Options', 'ALLOWALL');  // Iframe için izin
    next();
});


app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '.', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
