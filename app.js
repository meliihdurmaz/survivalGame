const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Cross-Origin Isolation başlıkları ekleyin
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});

// Tüm statik dosyalara Cross-Origin Isolation başlıkları ekleyin
app.use(express.static(path.join(__dirname, ".")));

// Serve the index file
app.get("/", (req, res) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.sendFile(path.join(__dirname, ".", "index.html"));
});

// Sunucuyu başlatın
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
