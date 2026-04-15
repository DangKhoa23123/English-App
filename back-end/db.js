const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/testdb');
        console.log('Kết nối MongoDB thành công');
    } catch (error) {
        console.log('Lỗi kết nối:', error);
    }
};

module.exports = connectDB;