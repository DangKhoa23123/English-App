const express = require('express');
const app = express();

app.use(express.json());

// API test
app.get('/', (req, res) => {
    res.send('Hello backend Node.js');
});

// API login mẫu
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '123') {
        res.json({ message: 'Login success' });
    } else {
        res.json({ message: 'Sai tài khoản hoặc mật khẩu' });
    }
});

app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});