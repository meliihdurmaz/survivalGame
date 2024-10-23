const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS ayarları
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

// app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
    app.use(express.static(path.join(__dirname, '.')));
    res.sendFile(path.join(__dirname, '.', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
