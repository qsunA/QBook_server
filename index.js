const express = require('express');
const logger = require('morgan'); // 로그 기록을 남기는 모듈
const expressSession = require('express-session');
const dotenv = require('dotenv');

const db = require('./models');
const userApiRouter = require('./routes/user');
const bookApiRouter = require('./routes/book');

dotenv.config();
const app = express();
db.sequelize.sync();

// 로그를 어떻게 남길지 여러 포맷이 있음. dev는 색상이 입혀진 축약된 로그를 남김 
app.use(logger('dev'));
app.use('/',express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(expressSession({
    resave: false,
    saveUninitialized : false, // 세션이 저장되기 전에 uninit
    secret : process.env.COOKIE_SECRET, // 쿠키를 임의로 변조하는 것을 방지 하기 위한 값. 이 값을 통해 세션을 암호화 하여 저장함 
    cookie : {
        httpOnly : true,
        secure : false,
    },
    name : 'qsunbook'
}));

// 라우터 api 연결 
app.use('/api/user',userApiRouter);
app.use('/api/book',bookApiRouter);

app.listen(3001,()=>{
    console.log('server is running on http://localhost:3001');
});