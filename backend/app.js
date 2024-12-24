const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require('./middleware/auth.js');
const Product = require('./shop-project/src/page/Product');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// 서버 실행
app.listen(8050, () => {
  console.log('http://localhost:8050 에서 서버 실행중');
});

// 정적 파일 서빙 (React 앱 배포)
app.use(express.static(path.join(__dirname, '/shop-project/dist')));

// 기본 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'shop-project/dist/index.html'));
});

// React 앱에서 처리되지 않은 라우트를 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'shop-project/dist/index.html'));
});

// 로그인 엔드포인트
app.post('/Login', async (req, res) => {
  try {
    const { id, password } = req.body;

    // 데이터베이스에서 사용자 조회
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    // 로그인 성공
    return res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 관리자 페이지 엔드포인트
app.post('/admin', auth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json({ success: true, message: 'Product created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});
