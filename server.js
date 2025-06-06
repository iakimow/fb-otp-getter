const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Эндпоинт для получения OTP
app.get('/otp/:token', async (req, res) => {
    const token = req.params.token;

    try {
        const response = await fetch(`https://2fa.fb.tools/api/otp/${token}`); 
        const data = await response.json();

        if (data.ok) {
            res.json({ success: true, otp: data.data.otp });
        } else {
            res.status(400).json({ success: false, error: 'Ошибка API' });
        }
    } catch (err) {
        console.error('Ошибка при получении OTP:', err.message);
        res.status(500).json({ success: false, error: 'Внутренняя ошибка сервера' });
    }
});

// Проверочный эндпоинт
app.get('/', (req, res) => {
    res.send('OTP Proxy Server работает!');
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});