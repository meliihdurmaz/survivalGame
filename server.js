const express = require('express');
const path = require('path');
const cors = require('cors');
const redis = require('redis');


const client = redis.createClient();

client.connect().then(() => {
    console.log('Redis bağlantısı kuruldu');
}).catch((err) => {
    console.error('Redis bağlantısı başarısız:', err);
});



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

const { v4: uuidv4 } = require('uuid');  // UUID oluşturmak için

app.use((req, res, next) => {
    const requestId = uuidv4();  // Her istek için benzersiz bir ID oluştur
    const requestInfo = {
        method: req.method,
        url: req.url,
        timestamp: new Date().toISOString()
    };

    client.set(requestId, JSON.stringify(requestInfo), 'EX', 60 * 60);  // 1 saat sonra otomatik silinsin
    next();
});


app.get('/', async (req, res) => {
    app.use(express.static(path.join(__dirname, '.')));
    res.sendFile(path.join(__dirname, '.', 'index.html'))
});

app.get('/logs', async (req, res) => {
    console.log("0");
    client.keys('*', (err, keys) => {
        if (err) return res.status(500).send('Bir hata oluştu');
        
        const logs = [];
        let completed = 0;
        console.log("1");
        keys.forEach((key) => {
            client.get(key, (err, value) => {
                console.log("2");
                if (err) return res.status(500).send('Bir hata oluştu');
                logs.push(JSON.parse(value));
                completed++;

                if (completed === keys.length) {
                    res.json(logs);
                }
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
