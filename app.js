const express = require('express');
const app = express();
const path = require('path');

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
